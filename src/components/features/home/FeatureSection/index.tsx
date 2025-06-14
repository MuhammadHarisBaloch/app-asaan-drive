import { Stack, Title, Text, SimpleGrid } from "@mantine/core";
import {
  IconClock,
  IconMapPin,
  IconShieldCheck,
  IconCoin,
} from "@tabler/icons-react";
import FeatureItem from "./FeatureItem";

const features = [
  {
    icon: <IconClock size={28} color="white" />,
    title: "Flexible Rental Options",
    description:
      "Rent by the hour, day, week, or month based on your needs. No long-term commitments required.",
  },
  {
    icon: <IconMapPin size={28} color="white" />,
    title: "Real-Time Tracking",
    description:
      "Keep track of your rented vehicle with our real-time GPS tracking feature for safety and convenience.",
  },
  {
    icon: <IconShieldCheck size={28} color="white" />,
    title: "Safety First",
    description:
      "All vehicles are thoroughly inspected and maintained. Emergency assistance available 24/7.",
  },
  {
    icon: <IconCoin size={28} color="white" />,
    title: "Earn with Your Vehicle",
    description:
      "Turn your idle vehicle into a source of income by listing it on our platform when you're not using it.",
  },
];

export default function HomeFeatureSection() {
  return (
    <Stack
      align="center"
      justify="center"
      px="xl"
      gap="md"
      w="100%"
      h="calc(100dvh - 80px)"
    >
      <Text fz="1.5rem" c="red" fw={500}>
        Features
      </Text>
      <Title order={3}>Why Choose AsaanDrive?</Title>
      <Text fz="1.5rem">
        Our platform offers multiple benefits to both renters and vehicle
        owners.
      </Text>
      <SimpleGrid cols={2} spacing="xl" mt="lg">
        {features.map((feature, index) => (
          <FeatureItem
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
