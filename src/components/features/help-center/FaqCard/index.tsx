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
        fz={{ base: "xs", sm: "sm" }}
        style={{ borderTop: `1px solid ${cardBorderColor}` }}
      >
        {faq.question}
      </AccordionControl>
      <AccordionPanel fz={{ base: "xs", sm: "xs" }} c="gray">
        {faq.answer}
      </AccordionPanel>
    </AccordionItem>
  ));

  return (
    <Card
      w="100%"
      p={0}
      style={{ border: `1.5px solid ${cardBorderColor}` }}
      radius="md"
    >
      <Flex p={{ base: "lg", sm: "xl" }} align="center" gap="md">
        <Box
          bg={iconBackgroundColor}
          h={{ base: 40, sm: 50 }}
          w={{ base: 40, sm: 50 }}
          style={{ borderRadius: "50%" }}
        >
          <Center h="100%">{icon}</Center>
        </Box>
        <Text fz={{ base: "md", sm: "lg" }} c="black" fw={500}>
          {title}
        </Text>
      </Flex>
      <Accordion variant="filled">{faq}</Accordion>
    </Card>
  );
}
