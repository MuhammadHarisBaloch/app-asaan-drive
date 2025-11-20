import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/networking/firebase";

export interface OTPData {
  email: string;
  otp: string;
  expiresAt: any; // Firestore timestamp
  attempts: number;
}

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOTP = async (email: string, otp: string): Promise<void> => {
  // ✅ CORRECT: Firestore compatible timestamp use karein
  const expiresAt = new Date(Date.now() + 1 * 60 * 1000); // 1 minute from now

  const otpData: OTPData = {
    email,
    otp,
    expiresAt: expiresAt, // Regular JavaScript Date object
    attempts: 0,
  };

  console.log("📝 Storing OTP for:", email);
  console.log("⏰ OTP expires at:", expiresAt);
  console.log("🔢 OTP code:", otp);

  const otpRef = doc(db, "otps", email);
  await setDoc(otpRef, otpData);
};

export const verifyOTP = async (
  email: string,
  userOTP: string
): Promise<{ success: boolean; message: string }> => {
  try {
    console.log("🔍 Verifying OTP for:", email);
    console.log("📨 User entered OTP:", userOTP);

    const otpRef = doc(db, "otps", email);
    const otpSnap = await getDoc(otpRef);

    if (!otpSnap.exists()) {
      console.log("❌ OTP not found in database");
      return { success: false, message: "OTP expired or not found" };
    }

    const otpData = otpSnap.data() as OTPData;
    console.log("📋 OTP data from Firestore:", otpData);

    // ✅ CORRECT: Date comparison
    const now = new Date();
    const expiresAt = otpData.expiresAt.toDate
      ? otpData.expiresAt.toDate()
      : new Date(otpData.expiresAt);

    console.log("🕒 Current time:", now);
    console.log("⏰ OTP expires at:", expiresAt);
    console.log(
      "⏱️ Time difference (ms):",
      expiresAt.getTime() - now.getTime()
    );

    // Check expiry
    if (now > expiresAt) {
      console.log("❌ OTP expired");
      await deleteDoc(otpRef);
      return { success: false, message: "OTP expired" };
    }

    // Check attempts
    if (otpData.attempts >= 3) {
      console.log("❌ Too many attempts:", otpData.attempts);
      await deleteDoc(otpRef);
      return {
        success: false,
        message: "Too many attempts. Please request new OTP",
      };
    }

    // Verify OTP
    console.log("🔢 Comparing OTPs - Stored:", otpData.otp, "User:", userOTP);
    if (otpData.otp !== userOTP) {
      console.log("❌ OTP mismatch");
      await setDoc(
        otpRef,
        { ...otpData, attempts: otpData.attempts + 1 },
        { merge: true }
      );
      return { success: false, message: "Invalid OTP" };
    }

    // OTP verified
    console.log("✅ OTP verified successfully");
    await deleteDoc(otpRef);
    return { success: true, message: "OTP verified successfully" };
  } catch (error) {
    console.error("❌ OTP verification error:", error);
    return { success: false, message: "Server error" };
  }
};

// ... rest of the functions remain same
export const resendOTP = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const newOTP = generateOTP();
    await storeOTP(email, newOTP);
    await sendOTPEmail(email, newOTP);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    return { success: false, message: "Failed to resend OTP" };
  }
};

export const sendOTPEmail = async (
  email: string,
  otp: string
): Promise<void> => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "🔐 Your OTP Code - AsaanDrive",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e53e3e; border-radius: 8px;">
            <div style="background: #e53e3e; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
              <h2 style="margin: 0;">AsaanDrive</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Email Verification</p>
            </div>
            <div style="padding: 25px;">
              <h3 style="color: #333; margin-bottom: 15px;">Verify Your Email Address</h3>
              <p style="color: #666; line-height: 1.6;">Use the following OTP code to complete your registration:</p>
              
              <div style="background: #f7fafc; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 2px dashed #e53e3e;">
                <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #e53e3e;">
                  ${otp}
                </div>
              </div>
              
              <p style="color: #666; font-size: 14px;">
                <strong>Important:</strong> 
                <ul>
                  <li>This OTP is valid for 1 minute only</li>
                  <li>Do not share this code with anyone</li>
                  <li>If you didn't request this, please ignore this email</li>
                </ul>
              </p>
            </div>
            <div style="text-align: center; padding: 15px; background: #f7fafc; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; color: #666; font-size: 12px;">
                This is an automated email from AsaanDrive.
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) throw new Error("Failed to send OTP email");
    console.log("✅ OTP email sent to:", email);
  } catch (error) {
    console.error("❌ OTP email failed:", error);
    throw error;
  }
};
