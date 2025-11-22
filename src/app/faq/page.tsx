import { data } from "@/constants/Data";
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

export default function FaqPage() {
  const items = data.faq.questions.map((item, index) => (
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
      <Accordion w="100%" variant="contained" mt="xxl" radius="md">
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
