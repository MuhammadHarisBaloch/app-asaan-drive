import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseConstants } from "../../constants/Firestore";
import { db } from "../../networking/firebase";
import { UserModel } from "./models/user.model";

export async function createUserDocument(user: UserModel): Promise<{
  docRef: DocumentReference<DocumentData>;
  data?: DocumentData;
} | null> {
  try {
    const docRef = doc(db, firebaseConstants.collections.users, user.id);

    // Prepare data — include default doc verification fields
    const dataToSave = {
      ...user,
      createdAt: serverTimestamp(),
      status: user.status ?? "Active",
      joined: user.joined ?? new Date().toISOString(),

      // 🆕 Default document verification structure
      documentStatus: user.documentStatus ?? "Not Uploaded",
      documentRemarks: user.documentRemarks ?? "",
      documents: user.documents ?? {
        cnicFront: "",
        cnicBack: "",
        licenseFront: "",
        licenseBack: "",
      },
    };

    // set/merge document
    await setDoc(docRef, dataToSave, { merge: true });

    // optionally store docId
    await updateDoc(docRef, { docId: docRef.id }).catch(() => {});

    // Re-fetch to include server timestamp
    const snap = await getDoc(docRef);
    return { docRef, data: snap.exists() ? snap.data() : undefined };
  } catch (error) {
    console.error("Error creating user document:", error);
    return null;
  }
}


export async function getUserDocument(
  userID?: string
): Promise<UserModel | null> {
  if (!userID) return null;
  const docRef = doc(db, firebaseConstants.collections.users, userID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserModel;
  } else {
    return null;
  }
}
