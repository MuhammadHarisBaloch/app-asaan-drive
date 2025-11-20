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
import { getUserDocument } from "../user"; // ✅ User data fetch karne ke liye

// ✅ NEW: Email notification helper (private function)
async function sendEmailNotification(notification: NotificationModel) {
  try {
    console.log("📧 Fetching user data for:", notification.userId);

    // ✅ DYNAMIC: User ka email fetch karein Firestore se
    const userData = await getUserDocument(notification.userId);

    if (!userData?.email) {
      console.log("❌ User email not found for userId:", notification.userId);
      return;
    }

    console.log("📧 Preparing email for:", userData.email);

    // ✅ DYNAMIC: Email send karein user ke actual email par
    const emailResponse = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: userData.email, // ✅ Dynamic user email
        subject: `🔔 ${notification.title} - AsaanDrive`, // ✅ Dynamic title
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e53e3e; border-radius: 8px;">
            <div style="background: #e53e3e; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center;">
              <h2 style="margin: 0;">AsaanDrive</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Notification</p>
            </div>
            <div style="padding: 20px;">
              <h3 style="color: #333; margin-bottom: 10px;">${
                notification.title
              }</h3>
              <p style="color: #666; line-height: 1.6; font-size: 14px;">${
                notification.message
              }</p>
              <div style="background: #f7fafc; padding: 12px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #e53e3e;">
                <p style="margin: 0; color: #666; font-size: 12px;">
                  <strong>Notification Type:</strong> ${notification.type}<br>
                  <strong>Sent:</strong> ${new Date().toLocaleString()}
                </p>
              </div>
            </div>
            <div style="text-align: center; padding: 15px; background: #f7fafc; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; color: #666; font-size: 12px;">
                This is an automated notification from AsaanDrive.
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (emailResponse.ok) {
      console.log("✅ Email sent to:", userData.email);
    } else {
      console.log("⚠️ Email failed for:", userData.email);
    }
  } catch (error) {
    console.log(
      "⚠️ Email notification failed (in-app notification still works)"
    );
  }
}

// ✅ EXISTING sendNotification FUNCTION - EMAIL INTEGRATED
export async function sendNotification(notification: NotificationModel) {
  try {
    console.log("🔔 Sending notification to userId:", notification.userId);

    // 1. In-app notification (EXACTLY SAME AS BEFORE)
    const notificationsRef = collection(
      db,
      firebaseConstants.collections.notifications
    );

    const notificationData = {
      userId: notification.userId,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      isRead: false,
      createdAt: serverTimestamp(),
    };

    await addDoc(notificationsRef, notificationData);
    console.log("📱 In-app notification sent:", notification.title);

    // 2. Email notification (NEW - AUTOMATIC & DYNAMIC)
    // Background mein send karein - wait nahi karein
    sendEmailNotification(notification).catch((error) => {
      console.log("⚠️ Background email failed:", error);
    });
  } catch (error) {
    console.error("❌ Error sending notification:", error);
    throw error;
  }
}

// ✅ EXISTING FUNCTIONS - BILKUL SAME RAHEGI

export async function createNotification(notification: NotificationModel) {
  const notificationsRef = collection(
    db,
    firebaseConstants.collections.notifications
  );
  await addDoc(notificationsRef, {
    ...notification,
    isRead: false,
    createdAt: serverTimestamp(),
  });
}

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

export async function markNotificationAsRead(notificationId: string) {
  const ref = doc(
    db,
    firebaseConstants.collections.notifications,
    notificationId
  );
  await updateDoc(ref, { isRead: true });
}

export async function markAllNotificationsAsRead(userId: string) {
  try {
    const notificationsRef = collection(
      db,
      firebaseConstants.collections.notifications
    );
    const q = query(notificationsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const promises = snapshot.docs.map((docItem) =>
      updateDoc(
        doc(db, firebaseConstants.collections.notifications, docItem.id),
        {
          isRead: true,
        }
      )
    );

    await Promise.all(promises);
    console.log(`✅ All notifications for user ${userId} marked as read`);
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
  }
}

export async function deleteNotification(notificationId: string) {
  const ref = doc(
    db,
    firebaseConstants.collections.notifications,
    notificationId
  );
  await deleteDoc(ref);
}
