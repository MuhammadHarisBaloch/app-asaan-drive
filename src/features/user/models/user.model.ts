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
  joined?: string; // <--- add this
  activity?: string;
}
  