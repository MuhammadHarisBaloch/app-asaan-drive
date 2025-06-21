import { Stack, Text, Group, SimpleGrid } from "@mantine/core";
import ProcessCard from "./ProcessCard";
import {
  IconCreditCardRefund,
  IconReceiptDollar,
  IconSearch,
  IconUserPlus,
} from "@tabler/icons-react";

const processCardItems = [
  {
    icon: <IconUserPlus size={25} color="#E30B5C" />,
    title: "1. Sign up",
    description:
      "Create your Account and Complete your profile for Verification",
  },
  {
    icon: <IconSearch size={25} color="#E30B5C" />,
    title: "2. Browse & Select",
    description: "Find the perfect vehicle for your needs using our filters.",
  },
  {
    icon: <IconReceiptDollar size={25} color="#E30B5C" />,
    title: "3. Book & Pay",
    description: "Complete the booking and make a secure payment online.",
  },
  {
    icon: <IconCreditCardRefund size={25} color="#E30B5C" />,
    title: "4. Ride & Return",
    description:
      "Pick up your vehicle and return it at the agreed time and location.",
  },
];

export default function AboutAppProcess() {
  return (
    <Stack px="xl" gap="lg">
      <Text fz="xl" c="black" fw={700}>
        For Renters
      </Text>
      <SimpleGrid cols={4} spacing="xl">
        {processCardItems.map((item, index) => {
          return (
            <ProcessCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
