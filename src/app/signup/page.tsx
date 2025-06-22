"use client";
import {
  BackgroundImage,
  Box,
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
import Images from "../../constants/Images";

interface SignUpForm {
  userType: string;
  firstName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

function SignupPage() {
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
    <BackgroundImage src={Images.backgrounds.signup} w="100%">
      <Box bg="black.8" w="100%" h="100%" py="3xl">
        <Stack w="100%" align="center" gap="xl">
          <Stack gap="xs" align="center">
            <Title c="white" order={3}>
              Create an Account
            </Title>
            <Text c="white">
              Join AsaanDrive to rent vehicles or list your Own
            </Text>
          </Stack>
          <Card w="35%" p="lg" py="3xl">
            <form
              onSubmit={form.onSubmit((values) => {
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
                    <Radio color="red" value="renter" label="Renter" />
                    <Radio
                      color="red"
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
                <Button w="80%" type="submit">
                  Sign Up
                </Button>
                <Flex w="60%" align="center" gap="lg">
                  <Divider w="50%" />
                  Or
                  <Divider w="50%" />
                </Flex>

                <Flex gap="sm">
                  <Text fz="sm">Already have Account?</Text>
                  <UnstyledButton c="red" fz="sm" type="submit">
                    Sign in
                  </UnstyledButton>
                </Flex>
              </Stack>
            </form>
          </Card>
        </Stack>
      </Box>
    </BackgroundImage>
  );
}

export default SignupPage;
