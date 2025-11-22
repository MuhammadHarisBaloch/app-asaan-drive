"use client";
import { useEffect, useRef } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/networking/firebase";

export default function PaymentAutoHandler({
  bookingId,
}: {
  bookingId: string;
}) {
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (!bookingId) return;

    console.log("🚀 [PaymentAutoHandler] Starting for booking:", bookingId);

    const ref = doc(db, "bookings", bookingId);
    const unsubscribe = onSnapshot(ref, async (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();
      const bookingStatus = data.status;
      const paymentStatus = data.payment?.status;

      console.log("📊 Current State:", {
        bookingStatus,
        paymentStatus,
        hasProcessed: hasProcessed.current,
      });

      // ✅ Simple logic: Agar completed hai aur payment hold hai, toh update karo
      if (
        bookingStatus === "completed" &&
        paymentStatus === "hold" &&
        !hasProcessed.current
      ) {
        console.log(
          "🎯 [PaymentAutoHandler] Conditions met! Updating payment..."
        );

        hasProcessed.current = true; // Ek baar hi process karo

        try {
          await updateDoc(ref, {
            "payment.status": "released",
            "payment.updatedAt": new Date(),
          });
          console.log("✅ [PaymentAutoHandler] SUCCESS: Payment released!");
        } catch (error) {
          console.error("❌ [PaymentAutoHandler] ERROR:", error);
          hasProcessed.current = false; // Retry allow karo
        }
      }
    });

    return () => unsubscribe();
  }, [bookingId]);

  return null;
}