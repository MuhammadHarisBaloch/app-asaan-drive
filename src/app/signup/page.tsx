"use client";
import {
  Button,
  Card,
  Divider,
  Flex,
  Group,
  PasswordInput,
  Radio,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { hasLength, isEmail, isNotEmpty, useForm } from "@mantine/form";
import VehicleBackgroundOverlay from "@/components/VehicleBackgroundOverlay";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/networking/firebase";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

interface SignUpForm {
  userType: string;
  firstName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

function SignupPage() {
  const router = useRouter();
  const [loading, { open, close }] = useDisclosure(false);
  const registerUser = (values: SignUpForm) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        close();
        notifications.show({
          title: "Account created successfully!",
          message: 'You can now sign in with your credentials',
        });
        router.push("/signin");
      })
      .catch((error) => {
        close();
        notifications.show({
          title: "Registration Failed",
          message: error.message,
        });
      });
  };
  const form = useForm<SignUpForm>({
    mode: "uncontrolled",
    initialValues: {
      userType: "",
      firstName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      userType: isNotEmpty("Please select your type"),
      firstName: hasLength({ min: 2 }, "Please enter your First Name"),
      email: isEmail("Incorrect Email"),
      username: hasLength({ min: 2 }, "Please enter your Username"),
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
            onSubmit={form.onSubmit((values) => {
              registerUser(values);
              open();
              console.log("Form is submitted", values);
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
                    value="vehicle-owner"
                    label="Vehicle Owner"
                  />
                </Group>
              </Radio.Group>
              <TextInput
                label="Full Name"
                w="100%"
                styles={{
                  label: {
                    fontSize: "xs",
                  },
                }}
                key={form.key("firstName")}
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label="Email"
                w="100%"
                styles={{
                  label: {
                    fontSize: "xs",
                  },
                }}
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Username"
                w="100%"
                styles={{
                  label: {
                    fontSize: "xs",
                  },
                }}
                inputMode="email"
                key={form.key("username")}
                {...form.getInputProps("username")}
              />
              <PasswordInput
                label="Password"
                w="100%"
                styles={{
                  label: {
                    fontSize: "xs",
                  },
                }}
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              <PasswordInput
                label="Confirm Password"
                w="100%"
                styles={{
                  label: {
                    fontSize: "xs",
                  },
                }}
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
