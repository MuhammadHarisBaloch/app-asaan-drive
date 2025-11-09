export interface UserModel {
  docId?: string;
  id: string;
  userType: string;
  fullName: string;
  email: string;
  city: string;
  phoneNumber: string;
  walletBalance?: number;
  status?: "Active" | "Blocked";
  createdAt?: any;
  joined?: string;
  activity?: string;
  availableBalance?: number;
  totalEarnings?: number;

  // 🔽 New fields
  documents?: {
    cnicFront?: string;
    cnicBack?: string;
    licenseFront?: string;
    licenseBack?: string;
  };
  documentStatus?: "Not Uploaded" | "Pending" | "Verified" | "Rejected";
  documentRemarks?: string; // optional reason if rejected
}
