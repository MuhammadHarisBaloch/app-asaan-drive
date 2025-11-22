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
  Container,
} from "@mantine/core";
import { IconMail, IconPhone } from "@tabler/icons-react";

export default function FaqPage() {
  const items = data.faq.questions.map((item, index) => (
    <AccordionItem key={index} value={item.question}>
      <AccordionControl
        fz={{ base: "xs", sm: "sm" }}
        p={{ base: "sm", sm: "md" }}
      >
        {item.question}
      </AccordionControl>
      <AccordionPanel fz={{ base: "xs", sm: "xs" }} c="gray">
        {item.answer}
      </AccordionPanel>
    </AccordionItem>
  ));

  return (
    <Container size="lg" py="xl" px="md">
      <Stack align="center" gap="md">
        <Stack align="center" gap="xs">
          <Title order={3} c="black" fw={600} ta="center">
            Frequently Asked Questions
          </Title>
          <Text ta="center" fz={{ base: "sm", sm: "lg" }} maw="800px" lh={1.5}>
            Find quick answers to common questions about AsaanDrive. Can't find
            what you're looking for? Contact our support team for personalized
            assistance.
          </Text>
        </Stack>

        <Accordion w="100%" variant="contained" mt="xl" radius="md">
          {items}
        </Accordion>

        <Card
          w="100%"
          radius="md"
          bg="pink.0"
          mt="xl"
          style={{ border: "1px solid #fecaca" }}
        >
          <Stack align="center" py={{ base: "md", sm: "lg" }} px="md">
            <Text fz={{ base: "md", sm: "lg" }} fw={500} c="red.4" ta="center">
              Still have questions?
            </Text>
            <Text fz="sm" ta="center">
              Our friendly support team is here to help you 24/7
            </Text>
            <Flex
              gap="md"
              mt="md"
              direction={{ base: "column", sm: "row" }}
              justify="center"
              w="100%"
            >
              <Button
                leftSection={<IconPhone color="white" size={18} />}
                size="md"
                fz="sm"
                maw={{ base: "100%", sm: "160px" }}
              >
                Call Support
              </Button>
              <Button
                leftSection={<IconMail color="red" size={18} />}
                size="md"
                fz="sm"
                variant="outline"
                color="red.4"
                maw={{ base: "100%", sm: "160px" }}
              >
                Email Us
              </Button>
            </Flex>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
