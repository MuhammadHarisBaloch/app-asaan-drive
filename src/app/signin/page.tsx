"use client";
import VehicleBackgroundOverlay from "@/components/VehicleBackgroundOverlay";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  Card,
  Stack,
  TextInput,
  Title,
  Text,
  Checkbox,
  Group,
  Button,
  Divider,
  Flex,
  UnstyledButton,
  PasswordInput,
} from "@mantine/core";

export default function SignInPage() {
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
  return (
    <VehicleBackgroundOverlay>
      <Stack align="center">
        <Title order={3} c="white">
          Sign in
        </Title>
        <Text fz="lg" c="white">
          Welcome Back! Sign in your AsaanDrive Account
        </Text>
        <Card w="40%" pt="lg" pb="3xl">
          <form
            onSubmit={form.onSubmit((values) =>
              console.log("Signin data", values)
            )}
          >
            <Stack w="100%" px="xxl">
              <TextInput
                w="100%"
                label="Username"
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
                styles={{
                  label: {
                    fontSize: 14,
                  },
                }}
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              <Group w="100%" justify="space-between">
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
                <Text fz="sm" c="red">
                  Forget Password?
                </Text>
              </Group>
              <Button bg="red" radius="lg" type="submit">
                Sign in
              </Button>
              <Flex justify="space-between" px="xxl" align="center">
                <Divider w="40%" />
                Or
                <Divider w="40%" />
              </Flex>
              <Flex gap="xs" justify="center">
                <Text fz="sm" c="gray">
                  Don’t have an Account ?
                </Text>
                <UnstyledButton c="red" fz="sm">
                  Sign up
                </UnstyledButton>
              </Flex>
            </Stack>
          </form>
        </Card>
      </Stack>
      x
    </VehicleBackgroundOverlay>
  );
}
