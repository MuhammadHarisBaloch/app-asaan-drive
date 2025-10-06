import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { BookingModel } from "./models/booking.model";
import { firebaseConstants } from "@/constants/Firestore";
import { db } from "@/networking/firebase";

export async function createBookingDocument(data: BookingModel) {
  try {
    const docRef = await addDoc(
      collection(db, firebaseConstants.collections.bookings),
      data
    );
    console.log("Booking Document Created ", docRef);
    return docRef;
  } catch (error) {
    console.log("Error creating Booking document"), error;
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
