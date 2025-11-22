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
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
  Container,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../../networking/firebase";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { signinUser } from "@/features/auth";
import { getUserDocument } from "@/features/user";
import { UserModel } from "@/features/user/models/user.model";

interface SignInForm {
  userName: string;
  password: string;
  rememberPassword: boolean;
}

export default function SignInPage() {
  const [loading, { open: startLoading, close: stopLoading }] = useDisclosure();
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      userName: "",
      password: "",
      rememberPassword: false,
    },
    validate: {
      userName: isNotEmpty("Please Enter Username"),
      password: isNotEmpty("Please Enter Password"),
    },
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);

  const signInUser = async (values: SignInForm) => {
    const authUser = await signinUser(values.userName, values.password);
    if (!authUser) {
      stopLoading();
      notifications.show({
        title: "Sign in failed",
        message: "Invalid user credentials",
        color: "red",
      });
      return;
    }

    const fetchUser: UserModel | null = await getUserDocument(authUser.uid);

    // Check if user document actually exists
    if (!fetchUser) {
      stopLoading();
      notifications.show({
        title: "Sign in failed",
        message: "User record not found in database.",
        color: "red",
      });
      return;
    }

    // Blocked user check
    if (fetchUser.status === "Blocked") {
      notifications.show({
        title: "Account Blocked",
        message: "Your account has been blocked by the admin.",
        color: "red",
      });
      await signOut(auth);
      return;
    }

    // ✅ Proceed normally if everything is fine
    stopLoading();
    notifications.show({
      title: "Signed in successfully",
      message: "",
    });

    router.push(`/app/${fetchUser.userType}`);
  };

  return (
    <VehicleBackgroundOverlay>
      <Container size="sm" py={{ sm: "xl", base: "xs" }}>
        <Stack w="100%" align="center" gap="xl">
          <Stack w="100%" gap="xs" align="center">
            <Title order={3} c="white" ta="center">
              Sign in
            </Title>
            <Text c="white" ta="center" fz={{ base: "sm", sm: "md" }}>
              Welcome Back! Sign in your AsaanDrive Account
            </Text>
          </Stack>
          <Card w="100%" p={{ base: "lg", sm: "xl" }} pb="xl" radius="lg">
            <form
              onSubmit={form.onSubmit((values) => {
                console.log("Signin data", values);
                startLoading();
                signInUser(values);
              })}
            >
              <Stack align="center" px={{ base: "md", sm: "xl" }} gap="lg">
                <TextInput
                  w="100%"
                  label="Username"
                  size="md"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  key={form.key("userName")}
                  {...form.getInputProps("userName")}
                />
                <PasswordInput
                  w="100%"
                  label="Password"
                  size="md"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                />
                <Group w="100%" justify="space-between" wrap="nowrap">
                  <Checkbox
                    className="hover-pointer"
                    c="gray"
                    color="indigo"
                    size="sm"
                    defaultChecked
                    label="Remember me"
                    key={form.key("rememberPassword")}
                    {...form.getInputProps("rememberPassword", {
                      type: "checkbox",
                    })}
                  />
                  <UnstyledButton c="red.4" fz="sm">
                    Forget Password?
                  </UnstyledButton>
                </Group>
                <Button
                  w={{ base: "100%", sm: "80%" }}
                  type="submit"
                  loading={loading}
                  size="md"
                >
                  Sign in
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
                <Flex gap="xs" justify="center" wrap="wrap">
                  <Text fz="sm" c="gray">
                    Don't have an Account?
                  </Text>
                  <UnstyledButton
                    component={Link}
                    href="/signup"
                    c="red.4"
                    fz="sm"
                  >
                    Sign up
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
