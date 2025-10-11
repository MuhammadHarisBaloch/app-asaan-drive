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
    // create docRef using user.id as document ID
    const docRef = doc(db, firebaseConstants.collections.users, user.id);

    // Prepare data — include serverTimestamp + a client fallback 'joined'
    const dataToSave = {
      ...user,
      createdAt: serverTimestamp(), // server timestamp (placeholder)
      status: user.status ?? "Active",
      joined: user.joined ?? new Date().toISOString(), // client fallback for immediate UI
    };

    // set/merge document
    await setDoc(docRef, dataToSave, { merge: true });

    // optionally write docId inside document (useful for later)
    await updateDoc(docRef, { docId: docRef.id }).catch(() => {
      /* ignore if fails (e.g., permissions) */
    });

    // Re-fetch the document so we get the resolved server timestamp (if resolved)
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
