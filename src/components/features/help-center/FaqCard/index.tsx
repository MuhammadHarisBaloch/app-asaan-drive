import {
  Card,
  Flex,
  Box,
  Center,
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Text,
} from "@mantine/core";
import { JSX } from "react";

interface FaqCardProps {
  faqs: {
    question: string;
    answer: string;
  }[];
  title: string;
  icon: JSX.Element;
  iconBackgroundColor: string;
  cardBorderColor: string;
}

export default function FaqCard({
  faqs,
  title,
  icon,
  iconBackgroundColor,
  cardBorderColor,
}: FaqCardProps) {
  const faq = faqs.map((faq, index) => (
    <AccordionItem key={index} value={faq.question}>
      <AccordionControl
        py="md"
        px="xl"
        fz="sm"
        style={{ borderTop: `1px solid ${cardBorderColor}` }}
      >
        {faq.question}
      </AccordionControl>
      <AccordionPanel px="md" fz="xs" c="gray">
        {faq.answer}
      </AccordionPanel>
    </AccordionItem>
  ));
  return (
    <Card
      p={0}
      style={{ border: `1.5px solid ${cardBorderColor}` }}
      radius="md"
    >
      <Flex p="xl" align="center" gap="lg">
        <Box
          bg={iconBackgroundColor}
          h={50}
          w={50}
          style={{ borderRadius: "50%" }}
        >
          <Center h="100%">{icon}</Center>
        </Box>
        <Text fz="lg" c="black" fw={500}>
          {title}
        </Text>
      </Flex>
      <Accordion variant="filled">{faq}</Accordion>
    </Card>
  );
}
