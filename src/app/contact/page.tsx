"use client";
import ContactInfo from "@/components/features/contact/ContactInfo";
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
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import {
  IconSend,
  IconMail,
  IconPhone,
  IconAddressBook,
} from "@tabler/icons-react";
const contactInfoList = [
  {
    icon: <IconMail size={25} color="red" />,
    title: "Email",
    subTitle: "support@asaandrive.com",
    description: "We typically respond within 24 hours",
  },
  {
    icon: <IconPhone size={25} color="red" />,
    title: "Phone",
    subTitle: "+92 3461392377",
    description: "Available 24/7 for urgent support",
  },
  {
    icon: <IconAddressBook size={25} color="red" />,
    title: "Address",
    subTitle: "Khairpur, Sindh",
    description: "Serving all major Cities in Pakistan",
  },
];

export default function ContactUsPage() {
  const theme = useMantineTheme();
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
  return (
    <Stack px="5rem" py="xxl" align="center" gap="sm">
      <Title order={3} c="black" fw={600}>
        Contact Us
      </Title>
      <Text ta="center" fz="lg" w="80%" lh={1.2}>
        Have questions about AsaanDrive? Need support with your rental?
        <br /> We're here to help! Get in touch with our friendly support team
        or share your feedback to help us improve.
      </Text>
      <Grid w="100%" gutter="lg" pt="xxl" grow>
        <GridCol span={6}>
          <Card withBorder radius="lg">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Stack p="xl" gap="xl">
                <Text fz="lg" c="black" fw={500}>
                  Send us a Message
                </Text>
                <TextInput
                  label="Full Name"
                  placeholder="Enter your Full Name"
                  radius="md"
                  key={form.key("name")}
                  {...form.getInputProps("name")}
                />
                <TextInput
                  label="Email Number"
                  placeholder="Enter your Email Address"
                  radius="md"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                />
                <TextInput
                  label="Phone Number (Optional)"
                  placeholder="Enter your Full Name"
                  radius="md"
                  key={form.key("number")}
                  {...form.getInputProps("number")}
                />
                <Textarea
                  label="Message"
                  placeholder="Tell us How we can help you "
                  radius="md"
                  rows={6}
                  key={form.key("message")}
                  {...form.getInputProps("message")}
                />
                <Button leftSection={<IconSend size={15} />} type="submit">
                  Send Message
                </Button>
              </Stack>
            </form>
          </Card>
        </GridCol>
        <GridCol span={6}>
          <Stack gap="lg">
            <Card p="xl" radius="lg" withBorder>
              <Stack gap="xl">
                <Text fz="lg" c="black" fw={500}>
                  Get in Touch
                </Text>
                {contactInfoList.map((data, index) => {
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
            <Card bg="red.4" h="100%" p="xl" radius="lg" withBorder>
              <Stack gap="xl">
                <Text c="white" fz="xl">
                  Need immediate assistance?
                </Text>
                <Text c="white" fz="md">
                  For urgent issues with your current rental or emergency
                  support, please call our 24/7 hotline.
                </Text>
                <Flex gap="lg">
                  <IconPhone color="white" />
                  <Text c="white" fz="md">
                    +92 300 1234567
                  </Text>
                </Flex>
              </Stack>
            </Card>
          </Stack>
        </GridCol>
      </Grid>
    </Stack>
  );
}
