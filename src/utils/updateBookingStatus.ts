import { firebaseConstants } from "@/constants/Firestore";
import { sendNotification } from "@/features/notification";
import { db } from "@/networking/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export async function autoUpdateBookingStatus() {
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
        const returnTime = booking.returnTime || booking.pickUpTime; // Fallback to pickUpTime
        const status = booking.status;

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
        console.log(`   Start: ${localStart.toISOString()}`);
        console.log(`   End: ${localEnd.toISOString()}`);
        console.log(`   Now: ${localNow.toISOString()}`);

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

          // 🔔 Notify renter that booking has started
          if (booking.renterId) {
            await sendNotification({
              userId: booking.renterId,
              title: "Booking Started",
              message: `Your booking for "${booking.vehicleName}" has started.`,
              type: "booking",
            });
            console.log(`🔔 Notification sent to renter for booking start`);
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

          // 🔹 Vehicle status wapas available karna
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

          // 🔔 Notify renter that booking is completed
          if (booking.renterId) {
            await sendNotification({
              userId: booking.renterId,
              title: "Booking Completed",
              message: `Your booking for "${booking.vehicleName}" is now completed.`,
              type: "booking",
            });
            console.log(
              `🔔 Notification sent to renter for booking completion`
            );
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
  } catch (error) {
    console.error("💥 Error auto-updating booking statuses:", error);
  }
}
