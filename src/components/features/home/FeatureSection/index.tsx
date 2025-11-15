import { data } from "@/constants/Data";
import { Stack, Title, Text, SimpleGrid } from "@mantine/core";
import FeatureItem from "./FeatureItem";

export default function HomeFeatureSection() {
  return (
    <Stack
      align="center"
      justify="center"
      pb="xl"
      pt="3rem"
      px="xl"
      gap="md"
      w="100%"
      h="100%"
    >
      <Text fz="xl" c="red.4" fw={500}>
        Features
      </Text>
      <Title order={3}>Why Choose AsaanDrive?</Title>
      <Text fz="xl">
        Our platform offers multiple benefits to both renters and vehicle
        owners.
      </Text>
      <SimpleGrid cols={2} spacing="xl" mt="lg">
        {data.home.features.map((feature, index) => (
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
