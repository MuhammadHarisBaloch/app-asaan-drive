import { auth } from "@/networking/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

export async function signupUser(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials.user;
  } catch {
    return null;
  }
}

export async function signinUser(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials.user;
  } catch {
    return null;
  }
}

export async function signoutUser() {
  await signOut(auth);
}