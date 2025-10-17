// src/features/document/index.ts
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { DocumentModel } from "./models";
import { firebaseConstants } from "@/constants/Firestore";
import { db } from "@/networking/firebase";
import StorageService from "../storage";
import { sendNotification } from "../notification";

export const createUserDocUpload = async (data: DocumentModel) => {
  try {
    const docRef = await addDoc(
      collection(db, firebaseConstants.collections.documents),
      {
        ...data,
        createdAt: serverTimestamp(),
      }
    );
    return docRef.id;
  } catch (error) {
    console.error("Error saving user document record:", error);
    throw error;
  }
};

export const handleUserDocumentUpload = async (
  fileUrl: string,
  userId: string,
  documentType: DocumentModel["documentType"]
) => {
  try {
    const docData: DocumentModel = {
      userId,
      documentType,
      fileUrl,
      status: "Pending",
      uploadedAt: new Date().toISOString(),
    };

    const docId = await createUserDocUpload(docData);
    return docId;
  } catch (error) {
    console.error("Document Firestore record creation failed:", error);
    throw error;
  }
};

export const uploadUserDocuments = async (
  userId: string,
  files: Record<string, File>
) => {
  try {
    const uploadedDocs: Record<string, string> = {};

    // 🔁 Loop through each selected document file
    for (const [key, file] of Object.entries(files)) {
      // 1️⃣ Upload file to Appwrite
      const fileId = await StorageService.shared.uploadFile(file);
      const fileUrl = await StorageService.shared.downloadFile(fileId);

      // 2️⃣ Save each document record in Firestore
      await handleUserDocumentUpload(fileUrl, userId, key as any);

      // 3️⃣ Keep URL reference for user record
      uploadedDocs[key] = fileUrl;
    }

    // 4️⃣ Update user Firestore record with document URLs + status
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      documents: uploadedDocs,
      documentStatus: "Pending",
    });

    return uploadedDocs;
  } catch (error) {
    console.error("Upload user documents failed:", error);
    throw error;
  }
};

/**
 * Get list of users that have documentStatus == "Pending"
 * (admin UI will call this to show pending users)
 */
export async function getPendingUsers() {
  const usersRef = collection(db, firebaseConstants.collections.users);
  const q = query(usersRef, where("documentStatus", "==", "Pending"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

/**
 * Approve all pending document records for a user,
 * update user documentStatus, and send notification.
 */
export async function approveUserDocuments(userId: string, reviewerId: string) {
  // 1) Update documents collection: all docs for userId with status "Pending"
  const docsRef = collection(db, firebaseConstants.collections.documents);
  const q = query(
    docsRef,
    where("userId", "==", userId),
    where("status", "==", "Pending")
  );
  const snap = await getDocs(q);

  const updatePromises = snap.docs.map((docSnap) =>
    updateDoc(doc(db, firebaseConstants.collections.documents, docSnap.id), {
      status: "Verified",
      reviewedAt: serverTimestamp(),
      reviewerId,
      remarks: "",
    })
  );

  await Promise.all(updatePromises);

  // 2) Update user documentStatus
  const userRef = doc(db, firebaseConstants.collections.users, userId);
  await updateDoc(userRef, {
    documentStatus: "Verified",
    documentRemarks: "",
    // optionally set isVerified: true
    isVerified: true,
  });

  // 3) Send notification
  await sendNotification({
    userId,
    title: "Documents Approved",
    message:
      "Your documents have been verified and your account is now verified.",
    type: "document_approved",
  });
}

/**
 * Reject all pending document records for a user with a reason,
 * update user doc, and send a notification.
 */
export async function rejectUserDocuments(
  userId: string,
  reviewerId: string,
  reason: string
) {
  // update documents to Rejected
  const docsRef = collection(db, firebaseConstants.collections.documents);
  const q = query(
    docsRef,
    where("userId", "==", userId),
    where("status", "==", "Pending")
  );
  const snap = await getDocs(q);

  const updatePromises = snap.docs.map((docSnap) =>
    updateDoc(doc(db, firebaseConstants.collections.documents, docSnap.id), {
      status: "Rejected",
      reviewedAt: serverTimestamp(),
      reviewerId,
      remarks: reason,
    })
  );

  await Promise.all(updatePromises);

  // update user record
  const userRef = doc(db, firebaseConstants.collections.users, userId);
  await updateDoc(userRef, {
    documentStatus: "Rejected",
    documentRemarks: reason,
    isVerified: false,
  });

  // send notification
  await sendNotification({
    userId,
    title: "Documents Rejected",
    message: `Your documents were rejected by admin. Reason: ${reason}`,
    type: "document_rejected",
  });
}
// ✅ getAllUsers.ts
export async function getAllUsers() {
  const usersRef = collection(db, firebaseConstants.collections.users);
  const snap = await getDocs(usersRef);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}
