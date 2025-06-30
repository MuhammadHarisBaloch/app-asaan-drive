import {
  Stack,
  Title,
  Text,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Accordion,
  Card,
  Flex,
  Button,
} from "@mantine/core";
import { IconMail, IconPhone } from "@tabler/icons-react";

const faqQuestions = [
  {
    question: "How can I rent a vehicle on AsaanDrive?",
    answer:
      "Renting on AsaanDrive is simple! Browse available vehicles in your area, select your preferred vehicle, choose your rental duration, complete the booking process with required documents, and make payment. You'll receive booking confirmation and vehicle pickup details via email and SMS.",
  },
  {
    question: "What documents are required for renting?",
    answer:
      "You'll need a valid driver's license, national ID card (CNIC), and a credit/debit card for payment. For some premium vehicles, additional documents like proof of income or employment may be required. All documents must be original and valid.",
  },
  {
    question: "Is there any security deposite needed?",
    answer:
      "Yes, a refundable security deposit is required for all rentals. The amount varies based on the vehicle type and rental duration. For bikes and cycles, it's typically PKR 5,000-15,000, while cars and rickshaws may require PKR 20,000-50,000. The deposit is fully refunded after successful return of the vehicle.",
  },
  {
    question: "How do I list my vehicle on the platform?",
    answer:
      "Vehicle owners can easily list their vehicles by creating an account, clicking 'List Vehicle', providing vehicle details including photos, documents, and pricing. Our team will verify your vehicle and documents within 24-48 hours. Once approved, your vehicle will be live on the platform for bookings.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Our customer support team is available 24/7 to assist you. You can reach us via phone at +92 300 1234567, email at support@asaandrive.com, or use the live chat feature in the app. We also have a comprehensive help center with guides and tutorials.",
  },
  {
    question: "Is AsaanDrive available in my city?",
    answer:
      "AsaanDrive is currently available in major cities across Pakistan including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, and Multan. We're rapidly expanding to more cities. Check our website or app to see if we're available in your area, or sign up for notifications when we launch in your city.",
  },
  {
    question: "What happens if the vehicle breaks down during rental?",
    answer:
      "Don't worry! AsaanDrive provides 24/7 roadside assistance. Contact our emergency helpline immediately, and we'll arrange for repairs or a replacement vehicle. Basic mechanical issues are covered at no extra cost, though damages due to misuse may incur charges.",
  },
  {
    question: "Can I extend my rental period?",
    answer:
      "Yes, you can extend your rental period subject to vehicle availability. Contact customer support or use the app to request an extension. Additional charges will apply based on the extended duration, and payment must be completed before the original rental period ends.",
  },
];

export default function FaqPage() {
  const items = faqQuestions.map((item, index) => (
    <AccordionItem key={index} value={item.question}>
      <AccordionControl fz="sm" p="md">
        {item.question}
      </AccordionControl>
      <AccordionPanel fz="xs" c="gray">
        {item.answer}
      </AccordionPanel>
    </AccordionItem>
  ));

  return (
    <Stack px="10rem" py="xxl" align="center" gap="sm">
      <Stack align="center" gap="xs">
        <Title order={3} c="black" fw={600}>
          Frequently Asked Questions
        </Title>
        <Text ta="center" fz="lg" w="90%" lh={1.2}>
          Find quick answers to common questions about AsaanDrive. Can't find
          what you're looking for? Contact our support team for personalized
          assistance.
        </Text>
      </Stack>
      <Accordion variant="contained" mt="xxl" radius="md">
        {items}
      </Accordion>
      <Card
        w="100%"
        radius="md"
        bg="pink.0"
        mt="xxl"
        style={{ border: "1px solid #fecaca" }}
      >
        <Stack align="center" py="lg">
          <Text fz="lg" fw={500} c="red.4">
            Still have questions?
          </Text>
          <Text fz="sm">
            Our friendly support team is here to help you 24/7
          </Text>
          <Flex gap="lg" mt="md">
            <Button
              leftSection={<IconPhone color="white" size={20} />}
              size="lg"
              fz="sm"
            >
              Call Support
            </Button>
            <Button
              leftSection={<IconMail color="red" size={20} />}
              size="lg"
              fz="sm"
              variant="outline"
              color="red.4"
            >
              Email Us
            </Button>
          </Flex>
        </Stack>
      </Card>
    </Stack>
  );
}
