import { db } from "@/networking/firebase";
import { firebaseConstants } from "@/constants/Firestore";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { NotificationModel } from "./models";

// Create Notification
export async function createNotification(notification: NotificationModel) {
  const notificationsRef = collection(
    db,
    firebaseConstants.collections.notifications
  );

  await addDoc(notificationsRef, {
    ...notification,
    isRead: false, // always start as unread
    createdAt: serverTimestamp(), // Firestore timestamp
  });
}

// Fetch Notifications by userId
export async function getUserNotifications(
  userId: string
): Promise<(NotificationModel & { id: string })[]> {
  const q = query(
    collection(db, firebaseConstants.collections.notifications),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as NotificationModel),
  }));
}

// Mark single notification as read
export async function markNotificationAsRead(notificationId: string) {
  const ref = doc(
    db,
    firebaseConstants.collections.notifications,
    notificationId
  );
  await updateDoc(ref, { isRead: true });
}

// Mark all notifications as read for a user (database-safe)
export async function markAllNotificationsAsRead(userId: string) {
  try {
    const notificationsRef = collection(
      db,
      firebaseConstants.collections.notifications
    );

    // Get all notifications for this user (ignore current isRead value)
    const q = query(notificationsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const promises = snapshot.docs.map((docItem) =>
      updateDoc(
        doc(db, firebaseConstants.collections.notifications, docItem.id),
        { isRead: true }
      )
    );

    await Promise.all(promises);
    console.log(`All notifications for user ${userId} marked as read`);
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
  }
}

// Delete Notification (optional)
export async function deleteNotification(notificationId: string) {
  const ref = doc(
    db,
    firebaseConstants.collections.notifications,
    notificationId
  );
  await deleteDoc(ref);
}

// Send Notification
export async function sendNotification(notification: NotificationModel) {
  try {
    const notificationsRef = collection(
      db,
      firebaseConstants.collections.notifications
    );

    await addDoc(notificationsRef, {
      ...notification,
      isRead: false, // always start unread
      createdAt: serverTimestamp(),
    });

    console.log("Notification sent:", notification.title);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}
