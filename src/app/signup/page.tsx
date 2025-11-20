"use client";
import VehicleBackgroundOverlay from "@/components/VehicleBackgroundOverlay";
import {
  Button,
  Card,
  Divider,
  Flex,
  Group,
  PasswordInput,
  Radio,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { hasLength, isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generateOTP, storeOTP, sendOTPEmail } from "@/lib/otp-service";

interface SignUpForm {
  userType: string;
  fullName: string;
  email: string;
  number: string;
  city: string;
  password: string;
  confirmPassword: string;
}

function SignupPage() {
  const router = useRouter();
  const [loading, { open: startLoading, close: stopLoading }] =
    useDisclosure(false);

  const registerUser = async (values: SignUpForm) => {
    startLoading();

    try {
      // 1. Generate and send OTP
      const otp = generateOTP();
      await storeOTP(values.email, otp);
      await sendOTPEmail(values.email, otp);

      // 2. Store user data in session storage temporarily
      const signupData = {
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        userType: values.userType,
        number: values.number,
        city: values.city,
      };

      sessionStorage.setItem("signupData", JSON.stringify(signupData));

      notifications.show({
        title: "OTP Sent!",
        message: "Check your email for verification code",
        color: "green",
      });

      // 3. Redirect without sensitive data in URL
      router.push("/signup/otp-verification");
    } catch (error) {
      console.error("Signup error:", error);
      notifications.show({
        title: "Signup Failed",
        message: "Failed to send OTP. Please try again.",
        color: "red",
      });
    } finally {
      stopLoading();
    }
  };

  // ... rest of your form code remains same
  const form = useForm<SignUpForm>({
    mode: "uncontrolled",
    initialValues: {
      userType: "",
      fullName: "",
      email: "",
      number: "",
      city: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      userType: isNotEmpty("Please select your type"),
      fullName: hasLength({ min: 2 }, "Please enter your Full Name"),
      number: (value) =>
        /^03[0-9]{9}$/.test(value)
          ? null
          : "Please enter a valid 11 digit Pakistani number (e.g. 03XXXXXXXXX)",
      city: isNotEmpty("Please select your city"),
      email: isEmail("Incorrect Email"),
      password: hasLength({ min: 2 }, "Please enter your password"),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  return (
    <VehicleBackgroundOverlay>
      <Stack w="100%" align="center" gap="xl">
        <Stack gap="xs" align="center">
          <Title c="white" order={3}>
            Create an Account
          </Title>
          <Text c="white">
            Join AsaanDrive to rent vehicles or list your Own
          </Text>
        </Stack>
        <Card w="35%" p="lg" py="3xl" radius="lg">
          <form
            onSubmit={form.onSubmit(async (values) => {
              await registerUser(values);
              console.log("Form submitted", values);
            })}
          >
            <Stack align="center" px="xxl">
              <Radio.Group
                name="user-type"
                key={form.key("userType")}
                {...form.getInputProps("userType")}
              >
                <Group mt="xs">
                  <Radio color="red.4" value="renter" label="Renter" />
                  <Radio
                    color="red.4"
                    value="vehicles-owner"
                    label="Vehicles Owner"
                  />
                </Group>
              </Radio.Group>
              <TextInput
                label="Full Name"
                w="100%"
                styles={{ label: { fontSize: "xs" } }}
                key={form.key("fullName")}
                {...form.getInputProps("fullName")}
              />
              <TextInput
                label="Email"
                w="100%"
                styles={{ label: { fontSize: "xs" } }}
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Phone number"
                w="100%"
                styles={{ label: { fontSize: "xs" } }}
                key={form.key("number")}
                {...form.getInputProps("number")}
              />
              <Select
                w="100%"
                label="Select our city"
                placeholder="Pick city"
                data={["Larkana", "Sukkur", "Khairpur' Mirs", "Rohri"]}
                styles={{ label: { fontSize: "xs" } }}
                key={form.key("city")}
                {...form.getInputProps("city")}
              />
              <PasswordInput
                label="Password"
                w="100%"
                styles={{ label: { fontSize: "xs" } }}
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              <PasswordInput
                label="Confirm Password"
                w="100%"
                styles={{ label: { fontSize: "xs" } }}
                key={form.key("confirmPassword")}
                {...form.getInputProps("confirmPassword")}
              />
              <Space h="lg" />
              <Button w="80%" type="submit" loading={loading}>
                Sign Up
              </Button>
              <Flex w="60%" align="center" gap="lg">
                <Divider w="50%" />
                Or
                <Divider w="50%" />
              </Flex>
              <Flex gap="sm">
                <Text fz="sm">Already have Account?</Text>
                <UnstyledButton
                  component={Link}
                  href="/signin"
                  c="red.4"
                  fz="sm"
                >
                  Sign in
                </UnstyledButton>
              </Flex>
            </Stack>
          </form>
        </Card>
      </Stack>
    </VehicleBackgroundOverlay>
  );
}

export default SignupPage;
