import { firebaseConstants } from "@/constants/Firestore";
import { sendNotification } from "@/features/notification";
import { db } from "@/networking/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

// ✅ PAYMENT WATCHER - Real-time listener for payment status changes
function setupPaymentWatcher(bookingId: string) {
  console.log(
    "👀 [PaymentWatcher] Setting up listener for booking:",
    bookingId
  );

  const ref = doc(db, firebaseConstants.collections.bookings, bookingId);
  const unsubscribe = onSnapshot(ref, async (snap) => {
    if (!snap.exists()) return;

    const data = snap.data();
    const bookingStatus = data.status;
    const paymentStatus = data.payment?.status;

    console.log("💰 [PaymentWatcher] Status:", {
      bookingStatus,
      paymentStatus,
    });

    // ✅ Payment release when booking is completed
    if (bookingStatus === "completed" && paymentStatus === "hold") {
      console.log("🎯 [PaymentWatcher] Releasing payment...");

      try {
        await updateDoc(ref, {
          "payment.status": "released",
          "payment.updatedAt": new Date(),
        });
        console.log("✅ [PaymentWatcher] Payment released successfully!");

        // Notify owner
        if (data.vehicleOwnerId) {
          await sendNotification({
            userId: data.vehicleOwnerId,
            title: "Payment Released",
            message: `Payment for "${data.vehicleName}" has been released to your account.`,
            type: "payment",
          });
        }
      } catch (error) {
        console.error("❌ [PaymentWatcher] Payment release failed:", error);
      }
    }

    // ✅ Payment refund when booking is cancelled (ANY CANCELLATION)
    if (bookingStatus === "cancelled" && paymentStatus === "hold") {
      console.log("🎯 [PaymentWatcher] Refunding payment...");

      try {
        await updateDoc(ref, {
          "payment.status": "refunded",
          "payment.updatedAt": new Date(),
        });
        console.log("✅ [PaymentWatcher] Payment refunded successfully!");

        // Notify renter
        if (data.renterId) {
          await sendNotification({
            userId: data.renterId,
            title: "Payment Refunded",
            message: `Payment for "${data.vehicleName}" has been refunded to your account.`,
            type: "payment",
          });
        }
      } catch (error) {
        console.error("❌ [PaymentWatcher] Payment refund failed:", error);
      }
    }
  });

  return unsubscribe;
}

// ✅ ACTIVE PAYMENT WATCHERS TRACKING
const activeWatchers = new Map<string, () => void>();

export async function autoUpdateBookingStatus() {
  // ⛔ Prevent execution during server-side rendering and build
  if (typeof window === "undefined") {
    console.log("🚫 Auto-update skipped (server environment)");
    return;
  }

  // ⛔ Additional check - only run in browser environment
  if (!db) {
    console.log("🚫 Auto-update skipped (Firestore not available)");
    return;
  }

  try {
    console.log("🔧 Auto-updating booking statuses...");
    const bookingsRef = collection(db, firebaseConstants.collections.bookings);
    const snapshot = await getDocs(bookingsRef);
    const now = new Date();

    // Get local time in consistent format for comparison
    const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    const currentTimeISO = localNow.toISOString().slice(11, 16); // HH:mm format

    console.log(`🕒 Current time: ${localNow.toISOString()}`);

    let updatedCount = 0;
    let errorCount = 0;

    for (const bookingDoc of snapshot.docs) {
      try {
        const booking = bookingDoc.data();
        const bookingId = bookingDoc.id;

        const pickUpDate = booking.pickUpDate;
        const pickUpTime = booking.pickUpTime;
        const returnDate = booking.returnDate;
        const returnTime = booking.returnTime || booking.pickUpTime;
        const status = booking.status;
        const paymentStatus = booking.payment?.status;

        // ✅ Skip if essential fields missing
        if (!pickUpDate || !pickUpTime || !returnDate) {
          console.log(
            `⏭️ Booking ${bookingId} skipped (missing date/time fields)`
          );
          continue;
        }

        // 🧩 Create date objects with proper timezone handling
        const startDateTime = new Date(`${pickUpDate}T${pickUpTime}:00`);
        const endDateTime = new Date(`${returnDate}T${returnTime}:00`);

        // Convert to local time for accurate comparison
        const localStart = new Date(
          startDateTime.getTime() - startDateTime.getTimezoneOffset() * 60000
        );
        const localEnd = new Date(
          endDateTime.getTime() - endDateTime.getTimezoneOffset() * 60000
        );

        console.log(`📋 Booking ${bookingId}:`);
        console.log(`   Status: ${status}`);
        console.log(`   Payment Status: ${paymentStatus}`);
        console.log(`   Start: ${localStart.toISOString()}`);
        console.log(`   End: ${localEnd.toISOString()}`);
        console.log(`   Now: ${localNow.toISOString()}`);

        // ✅ SETUP PAYMENT WATCHER FOR ALL BOOKINGS WITH HOLD PAYMENTS
        // (confirmed, active, pending - koi bhi status jahan payment hold hai)
        if (
          (status === "confirmed" ||
            status === "active" ||
            status === "pending") &&
          paymentStatus === "hold" &&
          !activeWatchers.has(bookingId)
        ) {
          console.log(
            `🔍 Setting up payment watcher for booking: ${bookingId}`
          );
          const unsubscribe = setupPaymentWatcher(bookingId);
          activeWatchers.set(bookingId, unsubscribe);
        }

        // ✅ CLEANUP WATCHER FOR COMPLETED/CANCELLED BOOKINGS
        if (
          (status === "completed" || status === "cancelled") &&
          activeWatchers.has(bookingId)
        ) {
          console.log(
            `🧹 Cleaning up payment watcher for booking: ${bookingId}`
          );
          const unsubscribe = activeWatchers.get(bookingId);
          if (unsubscribe) unsubscribe();
          activeWatchers.delete(bookingId);
        }

        // ✅ IMMEDIATE PAYMENT REFUND FOR CANCELLED BOOKINGS
        // Agar booking cancelled hai aur payment abhi bhi hold hai, toh immediately refund karo
        if (status === "cancelled" && paymentStatus === "hold") {
          console.log(
            `🎯 [Immediate Refund] Processing refund for cancelled booking: ${bookingId}`
          );

          try {
            await updateDoc(
              doc(db, firebaseConstants.collections.bookings, bookingId),
              {
                "payment.status": "refunded",
                "payment.updatedAt": new Date(),
              }
            );
            console.log(
              `✅ [Immediate Refund] Payment refunded for: ${bookingId}`
            );
            updatedCount++;

            // Notify renter
            if (booking.renterId) {
              await sendNotification({
                userId: booking.renterId,
                title: "Payment Refunded",
                message: `Payment for "${booking.vehicleName}" has been refunded to your account.`,
                type: "payment",
              });
              console.log(`🔔 Notification sent to renter for refund`);
            }

            // Notify owner about cancellation
            if (booking.vehicleOwnerId) {
              await sendNotification({
                userId: booking.vehicleOwnerId,
                title: "Booking Cancelled",
                message: `Booking for your "${booking.vehicleName}" has been cancelled. Payment refunded to renter.`,
                type: "booking",
              });
            }
          } catch (error) {
            console.error(
              `❌ [Immediate Refund] Failed for ${bookingId}:`,
              error
            );
          }
        }

        // 🔄 ORIGINAL STATUS UPDATE FLOW
        // 🚗 1️⃣ Confirmed → Active
        if (
          status === "confirmed" &&
          localNow >= localStart &&
          localNow < localEnd
        ) {
          await updateDoc(
            doc(db, firebaseConstants.collections.bookings, bookingId),
            { status: "active" }
          );
          console.log(`✅ Booking ${bookingId} marked as ACTIVE`);
          updatedCount++;

          // Notify renter
          if (booking.renterId) {
            await sendNotification({
              userId: booking.renterId,
              title: "Booking Started",
              message: `Your booking for "${booking.vehicleName}" has started. Enjoy your ride!`,
              type: "booking",
            });
          }

          // Notify owner
          if (booking.vehicleOwnerId) {
            await sendNotification({
              userId: booking.vehicleOwnerId,
              title: "Booking Started",
              message: `Booking for your "${booking.vehicleName}" has started. The vehicle is now in use.`,
              type: "booking",
            });
          }
        }

        // 🏁 2️⃣ Active → Completed
        else if (status === "active" && localNow >= localEnd) {
          await updateDoc(
            doc(db, firebaseConstants.collections.bookings, bookingId),
            { status: "completed" }
          );
          console.log(`🏁 Booking ${bookingId} marked as COMPLETED`);
          updatedCount++;

          // Vehicle status wapas available karna
          const vehicleId = booking.vehicleId;
          if (vehicleId) {
            const vehicleRef = doc(
              db,
              firebaseConstants.collections.vehicles,
              vehicleId
            );
            await updateDoc(vehicleRef, { status: "available" });
            console.log(`🔄 Vehicle ${vehicleId} status updated to AVAILABLE`);
          }

          // Notify renter
          if (booking.renterId) {
            await sendNotification({
              userId: booking.renterId,
              title: "Booking Completed",
              message: `Your booking for "${booking.vehicleName}" is now completed. Thank you for using AsaanDrive!`,
              type: "booking",
            });
          }

          // Notify owner
          if (booking.vehicleOwnerId) {
            await sendNotification({
              userId: booking.vehicleOwnerId,
              title: "Booking Completed",
              message: `Booking for your "${booking.vehicleName}" is now completed. The vehicle is available for new bookings.`,
              type: "booking",
            });
          }
        }
      } catch (docError) {
        errorCount++;
        console.error(
          `❌ Error processing booking ${bookingDoc.id}:`,
          docError
        );
      }
    }

    console.log(
      `📊 Auto-update completed: ${updatedCount} updated, ${errorCount} errors`
    );
    console.log(`👀 Active payment watchers: ${activeWatchers.size}`);
  } catch (error) {
    console.error("💥 Error auto-updating booking statuses:", error);
  }
}

// ✅ CLEANUP FUNCTION - Saare watchers band karne ke liye
export function cleanupAllPaymentWatchers() {
  console.log(`🧹 Cleaning up all payment watchers: ${activeWatchers.size}`);
  activeWatchers.forEach((unsubscribe, bookingId) => {
    unsubscribe();
    console.log(`✅ Cleaned up watcher for: ${bookingId}`);
  });
  activeWatchers.clear();
}
