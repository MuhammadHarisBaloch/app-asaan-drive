import { Timestamp } from "firebase/firestore";

export interface NotificationModel {
  id?: string; //
  userId: string;
  title: string;
  message: string;
  type: string; // e.g. 'booking', 'payment', 'system'
  isRead?: boolean;
  createdAt?: Timestamp;
}
