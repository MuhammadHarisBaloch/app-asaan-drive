import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { VehicleModel } from "./models/vehicle.model";
import { db } from "@/networking/firebase";
import { firebaseConstants } from "@/constants/Firestore";

export async function createVehicleDocument(data: VehicleModel) {
  try {
    const docRef = await addDoc(
      collection(db, firebaseConstants.collections.vehicles),
      data
    );
    console.log("Vehicle Document Created:", docRef.id);
    return docRef.id; // Return the new document ID (truthy value)
  } catch (error) {
    console.error("Error creating vehicle document:", error); //  Proper logging
    return null; // Return null to indicate failure
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

export async function listAllVehicleDocs() {
  const docQuery = query(
    collection(db, firebaseConstants.collections.vehicles)
  );
  const querySnapshot = await getDocs(docQuery);
  const vehicles = querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as VehicleModel)
  );
  return vehicles;
}