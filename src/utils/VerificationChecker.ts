// utils/verificationCheck.ts
import { UserModel } from "@/features/user/models/user.model";

export const shouldBlockUserAccess = (userData: UserModel | null): boolean => {
  if (!userData) return false;

  return (
    userData.documentStatus !== "Verified" || userData.status === "Blocked"
  );
};

export const getVerificationMessage = (userData: UserModel): string => {
  switch (userData.documentStatus) {
    case "Not Uploaded":
      return "Please upload your documents to verify your account.";
    case "Pending":
      return "Your documents are under review. Please wait for verification.";
    case "Rejected":
      return userData.documentRemarks
        ? `Document verification failed: ${userData.documentRemarks}`
        : "Your documents were rejected. Please update and try again.";
    case "Verified":
      return "Your account is fully verified.";
    default:
      return "Account verification required.";
  }
};
