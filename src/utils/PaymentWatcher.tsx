"use client";
import { useEffect, useRef } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/networking/firebase";
import { firebaseConstants } from "@/constants/Firestore";

interface PaymentAutoHandlerProps {
  bookingId: string;
}

export default function PaymentAutoHandler({
  bookingId,
}: PaymentAutoHandlerProps) {
  const previousBookingStatus = useRef<string | null>(null);
  const previousPaymentStatus = useRef<string | null>(null);

  useEffect(() => {
    if (!bookingId) return;
    console.log("👀 Watching booking:", bookingId);

    const ref = doc(db, "bookings", bookingId);
    const unsubscribe = onSnapshot(ref, async (snap) => {
      if (!snap.exists()) {
        console.warn("⚠️ No booking found for id:", bookingId);
        return;
      }

      const data = snap.data();
      console.log("📄 Booking snapshot:", data);

      const bookingStatus = data.status;
      const paymentStatus = data.payment?.status;

      // 👇 Detect booking status change (completed / cancelled)
      if (bookingStatus && previousBookingStatus.current !== bookingStatus) {
        console.log(
          `🔁 Booking status changed: ${previousBookingStatus.current} → ${bookingStatus}`
        );
        previousBookingStatus.current = bookingStatus;

        // ✅ NEW FLOW IMPLEMENTATION
        if (bookingStatus === "completed") {
          console.log(
            `✅ [Release Payment] Booking ${bookingId} marked completed. Releasing payment to owner.`
          );

          await updateDoc(
            doc(db, firebaseConstants.collections.bookings, bookingId),
            {
              "payment.status": "released", // 🔥 Payment released to owner
            }
          );
          console.log(`💰 Payment released for booking: ${bookingId}`);
        } else if (bookingStatus === "cancelled") {
          console.log(
            `💸 [Refund Payment] Booking ${bookingId} cancelled. Processing refund.`
          );

          await updateDoc(
            doc(db, firebaseConstants.collections.bookings, bookingId),
            {
              "payment.status": "refunded", // 🔥 Payment refunded to renter
            }
          );
          console.log(`🔄 Payment refunded for booking: ${bookingId}`);
        } else if (bookingStatus === "confirmed") {
          console.log(
            `ℹ️ Booking ${bookingId} confirmed. Payment remains on hold.`
          );
          // Payment status remains "hold" - no change needed
        } else if (bookingStatus === "pending") {
          console.log(`⏳ Booking ${bookingId} pending. Payment on hold.`);
          // Payment status remains "hold" - no change needed
        }

        // 🔥 IMPORTANT: When owner accepts booking (pending → confirmed), payment status remains "hold"
        // This is handled automatically since we don't change payment status here
      }

      // 👇 Detect payment status change (hold → refunded / released)
      if (paymentStatus && previousPaymentStatus.current !== paymentStatus) {
        console.log(
          `💳 Payment status changed: ${previousPaymentStatus.current} → ${paymentStatus}`
        );
        previousPaymentStatus.current = paymentStatus;
      }
    });

    return () => unsubscribe();
  }, [bookingId]);

  return null;
}
