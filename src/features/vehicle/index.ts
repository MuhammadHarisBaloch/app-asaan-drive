import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { VehicleModel } from "./models/vehicle.model";
import { db } from "@/networking/firebase";
import { firebaseConstants } from "@/constants/Firestore";
import { sendNotification } from "../notification";

export async function createVehicleDocument(data: VehicleModel) {
  try {
    const docRef = await addDoc(
      collection(db, firebaseConstants.collections.vehicles),
      {
        ...data,
        status: "pending", // 👈 always set pending when owner creates
      }
    );
    console.log("Vehicle Document Created:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating vehicle document:", error);
    return null;
  }
}

export async function listOwnerVehicleDocs(ownerID: string) {
  const docQuery = query(
    collection(db, firebaseConstants.collections.vehicles),
    where("ownerID", "==", ownerID)
  );
  const querySnapshot = await getDocs(docQuery);

  const vehicles = querySnapshot.docs.map((doc) => ({
    id: doc.id, // 👈 include Firestore document ID
    ...doc.data(),
  })) as VehicleModel[];

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
// ✅ Approve Vehicle
export async function approveVehicle(vehicleId: string) {
  const vehicleRef = doc(db, firebaseConstants.collections.vehicles, vehicleId);
  await updateDoc(vehicleRef, { status: "available" });

  // 🔔 Send notification to owner
  const vehicleSnap = await (
    await import("firebase/firestore")
  ).getDoc(vehicleRef);
  const vehicle = vehicleSnap.data() as VehicleModel;
  if (vehicle?.ownerID) {
    await sendNotification({
      userId: vehicle.ownerID,
      title: "Vehicle Approved",
      message: `Congratulations! Your vehicle "${vehicle.vehicleModel}" has been approved by the admin.`,
      type: "vehicle_approved",
    });
  }
}

// ✅ Reject Vehicle (with reason)
export async function rejectVehicle(vehicleId: string, reason: string) {
  const vehicleRef = doc(db, firebaseConstants.collections.vehicles, vehicleId);
  await updateDoc(vehicleRef, { status: "inactive" });

  // 🔔 Send notification to owner
  const vehicleSnap = await (
    await import("firebase/firestore")
  ).getDoc(vehicleRef);
  const vehicle = vehicleSnap.data() as VehicleModel;
  if (vehicle?.ownerID) {
    await sendNotification({
      userId: vehicle.ownerID,
      title: "Vehicle Rejected",
      message: `Your vehicle "${vehicle.vehicleModel}" was rejected. Reason: ${reason}`,
      type: "vehicle_rejected",
    });
  }
}

// ✅ Delete Vehicle (with reason)
export async function deleteVehicle(vehicleId: string, reason?: string) {
  try {
    const vehicleRef = doc(
      db,
      firebaseConstants.collections.vehicles,
      vehicleId
    );
    console.log("deleteVehicle debug values:", {
      vehicleId,
      collection: firebaseConstants.collections.vehicles,
      db,
    });
    // Fetch vehicle data
    const vehicleSnap = await (
      await import("firebase/firestore")
    ).getDoc(vehicleRef);
    if (!vehicleSnap.exists()) {
      console.warn("Vehicle not found:", vehicleId);
      return;
    }

    const vehicle = vehicleSnap.data() as VehicleModel;

    // Delete document from Firestore
    await deleteDoc(vehicleRef);

    // ✅ Only send notification if both ownerID and vehicleModel exist
    if (vehicle?.ownerID && vehicle?.vehicleModel) {
      console.log("Skipping sendNotification for now", vehicle.ownerID);
      await sendNotification({
        userId: vehicle.ownerID,
        title: "Vehicle Deleted",
        message:
          reason && reason.trim() !== ""
            ? `Your vehicle "${vehicle.vehicleModel}" was deleted by admin. Reason: ${reason}`
            : `Your vehicle "${vehicle.vehicleModel}" was deleted by admin.`,
        type: "vehicle_deleted",
      });
    } else {
      console.warn(
        "Missing ownerID or vehicleModel in deleted vehicle:",
        vehicle
      );
    }
  } catch (error) {
    console.error("🔥 deleteVehicle error:", error);
    throw error; // rethrow so your modal can show error notification
  }
}

// ✅ Activate Vehicle
export async function activateVehicle(vehicleId: string) {
  const vehicleRef = doc(db, firebaseConstants.collections.vehicles, vehicleId);

  // Update status to 'available'
  await updateDoc(vehicleRef, { status: "available" });

  // 🔔 Send notification to owner
  const vehicleSnap = await (
    await import("firebase/firestore")
  ).getDoc(vehicleRef);
  const vehicle = vehicleSnap.data() as VehicleModel;
  if (vehicle?.ownerID) {
    await sendNotification({
      userId: vehicle.ownerID,
      title: "Vehicle Activated",
      message: `Your vehicle "${vehicle.vehicleModel}" has been activated by the admin.`,
      type: "vehicle_activated",
    });
  }
}

// ✅ Deactivate Vehicle
export async function deactivateVehicle(vehicleId: string) {
  const vehicleRef = doc(db, firebaseConstants.collections.vehicles, vehicleId);

  // Update status to 'inactive'
  await updateDoc(vehicleRef, { status: "inactive" });

  // 🔔 Send notification to owner
  const vehicleSnap = await (
    await import("firebase/firestore")
  ).getDoc(vehicleRef);
  const vehicle = vehicleSnap.data() as VehicleModel;
  if (vehicle?.ownerID) {
    await sendNotification({
      userId: vehicle.ownerID,
      title: "Vehicle Deactivated",
      message: `Your vehicle "${vehicle.vehicleModel}" has been deactivated by the admin.`,
      type: "vehicle_deactivated",
    });
  }
}

export async function listAvailableVehicles() {
  const q = query(
    collection(db, firebaseConstants.collections.vehicles),
    where("status", "in", ["available", "active", "inactive", "booked"])
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as any),
  })) as VehicleModel[];
}
