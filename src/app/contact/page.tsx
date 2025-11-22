"use client";
import ContactInfo from "@/components/features/contact/ContactInfo";
import { data } from "@/constants/Data";
import {
  Stack,
  Title,
  Text,
  Card,
  TextInput,
  Grid,
  GridCol,
  Textarea,
  Button,
  Flex,
  Container,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconSend, IconPhone } from "@tabler/icons-react";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useDisclosure } from "@mantine/hooks";

export default function ContactUsPage() {
  const sendEmail = async () => {
    try {
      const result = await emailjs.sendForm(
        "service_tm5rtqe",
        "template_v17fak9",
        formRef.current!,
        "dp0EyRD3_tjsj-F_a"
      );
      console.log("Email Send Successfully", result.text);
      close();
      notifications.show({
        title: "Message sent Successfully",
        message: "",
        color: "green",
      });
    } catch (error) {
      console.error("Email not send !! ", error);
      close();
      notifications.show({
        title: "Something Wrong",
        message: `${error}`,
        color: "red",
      });
    }
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      number: null,
      message: "",
    },
    validate: {
      name: isNotEmpty("Please insert your name"),
      email: isEmail("Invalid Email"),
      message: isNotEmpty("Please insert your message"),
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [loader, { open, close }] = useDisclosure();

  return (
    <Container size="lg" py="xl" px="md">
      <Stack align="center" gap="md">
        <Title order={3} c="black" fw={600} ta="center">
          Contact Us
        </Title>
        <Text ta="center" fz={{ base: "md", sm: "lg" }} maw="800px" lh={1.5}>
          Have questions about AsaanDrive? Need support with your rental? We're
          here to help! Get in touch with our friendly support team or share
          your feedback to help us improve.
        </Text>

        <Grid w="100%" gutter="xl" pt="xl" grow>
          <GridCol span={{ base: 12, md: 6 }}>
            <Card withBorder radius="lg">
              <form
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  sendEmail();
                  open();
                  form.reset();
                }}
              >
                <Stack p={{ base: "lg", sm: "xl" }} gap="lg">
                  <Text fz={{ base: "md", sm: "lg" }} c="black" fw={500}>
                    Send us a Message
                  </Text>
                  <TextInput
                    required
                    label="Full Name"
                    placeholder="Enter your Full Name"
                    radius="md"
                    name="user_name"
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                    size="md"
                  />
                  <TextInput
                    required
                    label="Email Address"
                    placeholder="Enter your Email Address"
                    radius="md"
                    name="user_email"
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                    size="md"
                  />
                  <TextInput
                    label="Phone Number (Optional)"
                    placeholder="Enter your Phone Number"
                    radius="md"
                    name="number"
                    maxLength={11}
                    key={form.key("number")}
                    {...form.getInputProps("number")}
                    size="md"
                  />
                  <Textarea
                    required
                    label="Message"
                    placeholder="Tell us How we can help you"
                    radius="md"
                    rows={5}
                    name="message"
                    key={form.key("message")}
                    {...form.getInputProps("message")}
                    size="md"
                  />
                  <Button
                    leftSection={<IconSend size={16} />}
                    type="submit"
                    loading={loader}
                    size="md"
                    fullWidth
                  >
                    Send Message
                  </Button>
                </Stack>
              </form>
            </Card>
          </GridCol>

          <GridCol span={{ base: 12, md: 6 }}>
            <Stack gap="lg">
              <Card p={{ base: "lg", sm: "xl" }} radius="lg" withBorder>
                <Stack gap="lg">
                  <Text fz={{ base: "md", sm: "lg" }} c="black" fw={500}>
                    Get in Touch
                  </Text>
                  {data.contact.contactInfo.map((data, index) => {
                    return (
                      <ContactInfo
                        key={index}
                        icon={data.icon}
                        title={data.title}
                        subTitle={data.subTitle}
                        description={data.description}
                      />
                    );
                  })}
                </Stack>
              </Card>

              <Card
                bg="red.4"
                p={{ base: "lg", sm: "xl" }}
                radius="lg"
                withBorder
              >
                <Stack gap="md">
                  <Text c="white" fz={{ base: "lg", sm: "xl" }} fw={500}>
                    Need immediate assistance?
                  </Text>
                  <Text c="white" fz={{ base: "sm", sm: "md" }} lh={1.6}>
                    For urgent issues with your current rental or emergency
                    support, please call our 24/7 hotline.
                  </Text>
                  <Flex gap="md" align="center">
                    <IconPhone size={20} color="white" />
                    <Text c="white" fz={{ base: "sm", sm: "md" }} fw={500}>
                      +92 300 1234567
                    </Text>
                  </Flex>
                </Stack>
              </Card>
            </Stack>
          </GridCol>
        </Grid>
      </Stack>
    </Container>
  );
}
