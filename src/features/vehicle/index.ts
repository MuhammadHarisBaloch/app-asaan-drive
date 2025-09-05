import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { VehicleModel } from "./models/vehicle.model";
import { db } from "@/networking/firebase";
import { firebaseConstants } from "@/constants/Firestore";
import Vehicle from "../../app/app/renter/vehicle/page";

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

export async function listOwnerVehicleDocs(ownerID: string) {
  const docQuery = query(
    collection(db, firebaseConstants.collections.vehicles),
    where("ownerID", "==", ownerID)
  );
  const querySnapshot = await getDocs(docQuery);
  const vehicles = querySnapshot.docs.map((doc) => doc.data() as VehicleModel);
  console.log("Owner Vehicles: ", vehicles);
  return vehicles;
}
