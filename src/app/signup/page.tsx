"use client";
import VehicleBackgroundOverlay from "@/components/VehicleBackgroundOverlay";
import {
  Button,
  Card,
  Checkbox,
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
  Container,
} from "@mantine/core";
import { hasLength, isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generateOTP, storeOTP, sendOTPEmail } from "@/lib/otp-service";
import { useState } from "react";

interface SignUpForm {
  userType: string;
  fullName: string;
  email: string;
  number: string;
  city: string;
  password: string;
  confirmPassword: string;
  check: boolean;
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
      check: false,
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
      <Container size="sm" py="xl">
        <Stack w="100%" align="center" gap="xl">
          <Stack gap="xs" align="center">
            <Title c="white" order={3} ta="center">
              Create an Account
            </Title>
            <Text c="white" ta="center" fz={{ base: "sm", sm: "md" }}>
              Join AsaanDrive to rent vehicles or list your Own
            </Text>
          </Stack>
          <Card
            w="100%"
            p={{ base: "lg", sm: "xl" }}
            py={{ base: "xl", sm: "3xl" }}
            radius="lg"
          >
            <form
              onSubmit={form.onSubmit(async (values) => {
                await registerUser(values);
                console.log("Form submitted", values);
              })}
            >
              <Stack align="center" px={{ base: "md", sm: "xl" }} gap="lg">
                <Radio.Group
                  name="user-type"
                  key={form.key("userType")}
                  {...form.getInputProps("userType")}
                  w="100%"
                >
                  <Group mt="xs" justify="center" wrap="nowrap">
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
                  size="md"
                  styles={{ label: { fontSize: "14px" } }}
                  key={form.key("fullName")}
                  {...form.getInputProps("fullName")}
                />

                <TextInput
                  label="Email"
                  w="100%"
                  size="md"
                  styles={{ label: { fontSize: "14px" } }}
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                />

                <TextInput
                  label="Phone number"
                  w="100%"
                  size="md"
                  styles={{ label: { fontSize: "14px" } }}
                  key={form.key("number")}
                  {...form.getInputProps("number")}
                />

                <Select
                  w="100%"
                  label="Select our city"
                  placeholder="Pick city"
                  data={["Larkana", "Sukkur", "Khairpur' Mirs", "Rohri"]}
                  size="md"
                  styles={{ label: { fontSize: "14px" } }}
                  key={form.key("city")}
                  {...form.getInputProps("city")}
                />

                <PasswordInput
                  label="Password"
                  w="100%"
                  size="md"
                  styles={{ label: { fontSize: "14px" } }}
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                />

                <PasswordInput
                  label="Confirm Password"
                  w="100%"
                  size="md"
                  styles={{ label: { fontSize: "14px" } }}
                  key={form.key("confirmPassword")}
                  {...form.getInputProps("confirmPassword")}
                />

                <Flex align="flex-start" gap="sm" w="100%">
                  <Checkbox
                    defaultChecked
                    color="red.4"
                    mt={2}
                    key={form.key("check")}
                    {...form.getInputProps("check", { type: "checkbox" })}
                  />
                  <Text c="black" fz="sm" lh={1.4}>
                    I agree to accept{" "}
                    <Link
                      href="/terms-privacy"
                      target="_blank"
                      style={{ color: "red" }}
                    >
                      terms-privacy{" "}
                    </Link>
                  </Text>
                </Flex>

                <Space h="md" />

                <Button
                  w={{ base: "100%", sm: "80%" }}
                  type="submit"
                  loading={loading}
                  disabled={!form.values.check}
                  size="md"
                >
                  Sign Up
                </Button>

                <Flex w="100%" align="center" gap="md">
                  <Divider w="100%" />
                  <Text
                    fz="sm"
                    c="gray"
                    style={{ whiteSpace: "nowrap" }}
                    px="xs"
                  >
                    Or
                  </Text>
                  <Divider w="100%" />
                </Flex>

                <Flex gap="sm" justify="center" wrap="wrap">
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
      </Container>
    </VehicleBackgroundOverlay>
  );
}

export default SignupPage;
