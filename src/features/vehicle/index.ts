import { addDoc, collection } from "firebase/firestore";
import { VehicleModel } from "./models/vehicle.model";
import { db } from "@/networking/firebase";
import { firebaseConstants } from "@/constants/Firestore";

export async function createVehicleDocument(data: VehicleModel) {
  try {
    const docRef = await addDoc(
      collection(db, firebaseConstants.collections.vehicles),
      data
    );
    console.log("Vehicle Document Created ", docRef);
    return docRef;
  } catch (error) {
    console.log("Error creating vehicle document"), error;
  }
}
