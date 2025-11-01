import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { BookingModel } from "./models/booking.model";
import { firebaseConstants } from "@/constants/Firestore";
import { db } from "@/networking/firebase";

export async function createBookingDocument(data: BookingModel) {
  try {
    if (!data.bookingId) {
      throw new Error("bookingId is missing in data");
    }

    const docRef = doc(
      db,
      firebaseConstants.collections.bookings,
      data.bookingId
    );

    await setDoc(docRef, data);

    console.log("Booking Document Created:", data.bookingId);
    return docRef;
  } catch (error) {
    console.error("Error creating Booking document:", error);
  }
}

export async function fetchBookingDocs(renterID: string) {
  const docQuery = query(
    collection(db, firebaseConstants.collections.bookings),
    where("renterId", "==", renterID)
  );
  const querySnapshot = await getDocs(docQuery);
  const bookings = querySnapshot.docs.map((doc) => ({
    id: doc.id, // include Firestore doc id
    ...(doc.data() as BookingModel),
  }));
  console.log("Renter Bookings: ", bookings);
  return bookings;
}

export async function fetchOwnerVehicleBookings(ownerID: string) {
  const docQuery = query(
    collection(db, firebaseConstants.collections.bookings),
    where("vehicleOwnerId", "==", ownerID)
  );
  const querySnapshot = await getDocs(docQuery);
  const bookings = querySnapshot.docs.map((doc) => ({
    id: doc.id, // include Firestore doc id
    ...(doc.data() as BookingModel),
  }));
  console.log("Owner Vehicles Bookings: ", bookings);
  return bookings;
}

// ✅ Fetch All Bookings (for Admin)
export async function fetchAllBookings() {
  try {
    const querySnapshot = await getDocs(
      collection(db, firebaseConstants.collections.bookings)
    );

    const bookings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as BookingModel),
    }));

    console.log("All Bookings:", bookings);
    return bookings;
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return [];
  }
}
