import { Timestamp } from "firebase/firestore";
export interface UserDocumentModel {
  id?: string;
  userId: string;
  userRole: "owner" | "renter";
  relatedId?: string | null;
  purpose: "user_verification" | "renter_booking" | "vehicle_documents";
  files: { [key: string]: string };
  status: "pending" | "approved" | "declined";
  uploadedAt: Timestamp;
  rejectedReason?: string;
  verifiedBy?: string;
  verifiedAt?: Timestamp;
}
