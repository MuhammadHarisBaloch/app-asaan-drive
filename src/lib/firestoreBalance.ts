import { db } from "@/networking/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

/**
 * 🔹 Increase available balance when booking payment is released
 */
export async function updateAvailableBalanceOnRelease(
  ownerId: string,
  releasedAmount: number
) {
  try {
    const userRef = doc(db, "users", ownerId);
    await updateDoc(userRef, {
      availableBalance: increment(releasedAmount),
      totalEarnings: increment(releasedAmount), // optional (for stats)
    });
  } catch (error) {
    console.error("Error updating available balance:", error);
  }
}

/**
 * 🔹 Decrease available balance when user withdraws money
 */
export async function deductAvailableBalance(
  ownerId: string,
  withdrawAmount: number
) {
  try {
    const userRef = doc(db, "users", ownerId);
    await updateDoc(userRef, {
      availableBalance: increment(-withdrawAmount),
    });
  } catch (error) {
    console.error("Error deducting available balance:", error);
  }
}
