import { collection, doc, setDoc } from "firebase/firestore";
import { firebaseConstants } from "../../constants/Firestore";
import { db } from "../../networking/firebase";
import { UserModel } from "./models/user.model";

export async function createUserDocument(user: UserModel) {
  console.log("Creating user document for:", user);
  try {
    const docRef = await setDoc(
      doc(collection(db, firebaseConstants.collections.users), user.id),
      user
    );
    console.log("User document created with ID:", docRef);
    return docRef;
  } catch (error) {
    console.error("Error creating user document:", error);
  }
}
