export interface UserModel {
  id: string;
  userType: string;
  fullName: string;
  email: string;
  city: string;
  phoneNumber: string;
  walletBalance?: number;
}
