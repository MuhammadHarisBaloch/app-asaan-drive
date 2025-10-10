import { firebaseConstants } from "@/constants/Firestore";
import { sendNotification } from "@/features/notification";
import { db } from "@/networking/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export async function autoUpdateBookingStatus() {
  try {
    console.log("Fetching all bookings...");
    const bookingsRef = collection(db, "bookings");
    const snapshot = await getDocs(bookingsRef);
    const now = new Date();

    for (const bookingDoc of snapshot.docs) {
      const booking = bookingDoc.data();
      const bookingId = bookingDoc.id;

      const pickUpDate = booking.pickUpDate;
      const pickUpTime = booking.pickUpTime;
      const returnDate = booking.returnDate;
      const returnTime = booking.returnTime || booking.pickUpTime;
      const status = booking.status;

      // ✅ Skip if essential fields missing
      if (!pickUpDate || !pickUpTime || !returnDate) {
        console.log(`Booking ${bookingId} skipped (missing date/time fields)`);
        continue;
      }

      // 🧩 Combine pickUpDate + pickUpTime into a Date object
      const startDateTime = new Date(`${pickUpDate}T${pickUpTime}:00`);
      const endDateTime = new Date(`${returnDate}T${returnTime}:00`);

      console.log(
        `Booking ${bookingId}: ${status} | Start=${startDateTime} | End=${endDateTime}`
      );

      // 🚗 1️⃣ Confirmed → Active
      if (status === "confirmed" && now >= startDateTime && now < endDateTime) {
        await updateDoc(
          doc(db, firebaseConstants.collections.bookings, bookingId),
          { status: "active" }
        );
        console.log(`✅ Booking ${bookingId} marked as ACTIVE`);

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
      if (status === "active" && now >= endDateTime) {
        await updateDoc(
          doc(db, firebaseConstants.collections.bookings, bookingId),
          { status: "completed" }
        );
        console.log(`🏁 Booking ${bookingId} marked as COMPLETED`);

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
          console.log(`🔔 Notification sent to renter for booking completion`);
        }
      }
    }
  } catch (error) {
    console.error("Error auto-updating booking statuses:", error);
  }
}
