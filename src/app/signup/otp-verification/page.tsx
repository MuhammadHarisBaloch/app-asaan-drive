"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Text,
  TextInput,
  Button,
  Stack,
  Group,
  Alert,
  Paper,
} from "@mantine/core";
import { IconMail, IconClock, IconRefresh } from "@tabler/icons-react";
import { verifyOTP, resendOTP } from "@/lib/otp-service";
import { signupUser } from "@/features/auth";
import { createUserDocument } from "@/features/user";
import VehicleBackgroundOverlay from "@/components/VehicleBackgroundOverlay";

interface SignupData {
  email: string;
  password: string;
  fullName: string;
  userType: string;
  number: string;
  city: string;
}

export default function OTPVerification() {
  const router = useRouter();
  const [signupData, setSignupData] = useState<SignupData | null>(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Get signup data from session storage
  useEffect(() => {
    const storedData = sessionStorage.getItem("signupData");
    if (storedData) {
      setSignupData(JSON.parse(storedData));
    } else {
      setError("Session expired. Please start over.");
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleVerifyOTP = async () => {
    if (!signupData) {
      setError("No signup data found");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Verify OTP
      const verification = await verifyOTP(signupData.email, otp);

      if (!verification.success) {
        setError(verification.message);
        setLoading(false);
        return;
      }

      // OTP verified - Create Firebase account
      const userCred = await signupUser(signupData.email, signupData.password);

      if (!userCred) {
        setError("Failed to create Firebase account");
        setLoading(false);
        return;
      }

      // Create user document
      await createUserDocument({
        id: userCred.uid,
        email: signupData.email,
        fullName: signupData.fullName,
        userType: signupData.userType,
        city: signupData.city,
        phoneNumber: signupData.number,
        availableBalance: 0,
        isEmailVerified: true,
        documentStatus: "Not Uploaded",
        documents: {
          cnicFront: "",
          cnicBack: "",
          licenseFront: "",
          licenseBack: "",
        },
      });

      setSuccess("Account created successfully! Redirecting...");

      // Clear session storage
      sessionStorage.removeItem("signupData");

      // Redirect to appropriate dashboard
      setTimeout(() => {
        router.push(`/app/${signupData.userType}`);
      }, 2000);
    } catch (error: any) {
      console.error("Signup error:", error);
      setError(error.message || "Failed to create account");
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!signupData) return;

    setResendLoading(true);
    setError("");

    try {
      const result = await resendOTP(signupData.email);

      if (result.success) {
        setSuccess("New OTP sent to your email");
        setTimeLeft(60);
        setCanResend(false);
        setOtp("");
        inputRef.current?.focus();
      } else {
        setError(result.message);
      }
    } catch (error: any) {
      setError("Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  if (!signupData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Alert color="red" title="Error">
          Invalid registration data. Please start over.
        </Alert>
      </div>
    );
  }

  return (
    <VehicleBackgroundOverlay>
      <Stack w="100%" align="center">
        <Card
          shadow="md"
          radius="lg"
          padding="xl"
          style={{ width: "100%", maxWidth: 450, background: "white" }}
        >
          <Stack gap="lg">
            {/* Header */}
            <div style={{ textAlign: "center" }}>
              <IconMail
                size={48}
                color="#e53e3e"
                style={{ margin: "0 auto 10px" }}
              />
              <Text size="xl" fw={700} c="dark">
                Verify Your Email
              </Text>
              <Text size="sm" c="dimmed">
                We sent a 6-digit code to: <strong>{signupData.email}</strong>
              </Text>
            </div>

            {/* Timer */}
            <Paper p="md" bg="blue.0" radius="md">
              <Group justify="center">
                <IconClock size={20} color="#228be6" />
                <Text size="sm" fw={500}>
                  Code expires in:{" "}
                  <span style={{ color: timeLeft < 30 ? "red" : "green" }}>
                    {formatTime(timeLeft)}
                  </span>
                </Text>
              </Group>
            </Paper>

            {/* OTP Input */}
            <Stack gap="xs">
              <TextInput
                ref={inputRef}
                label="Enter 6-digit OTP"
                placeholder="123456"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(value);
                  setError("");
                }}
                maxLength={6}
                size="md"
                styles={{
                  input: {
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: 500,
                    letterSpacing: "8px",
                  },
                }}
              />
            </Stack>

            {/* Messages */}
            {error && (
              <Alert c="red.4" title="Error">
                {error}
              </Alert>
            )}

            {success && (
              <Alert c="green" title="Success">
                {success}
              </Alert>
            )}

            {/* Verify Button */}
            <Button
              size="md"
              loading={loading}
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6}
              color="red.4"
            >
              {loading ? "Verifying..." : "Verify & Create Account"}
            </Button>

            {/* Resend OTP */}
            <Group justify="center">
              <Text size="sm" c="dimmed">
                Didn't receive code?
              </Text>
              <Button
                variant="subtle"
                size="sm"
                loading={resendLoading}
                disabled={!canResend || resendLoading}
                onClick={handleResendOTP}
                leftSection={<IconRefresh size={16} />}
                color="red.4"
              >
                {resendLoading ? "Sending..." : "Resend OTP"}
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </VehicleBackgroundOverlay>
  );
}
