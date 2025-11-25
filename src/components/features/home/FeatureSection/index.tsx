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
      px={{ sm: "lg", base: "md" }}
      gap="md"
      w="100%"
      h="100%"
    >
      <Text fz={{ base: "lg", sm: "xl" }} c="red.4" fw={500}>
        Features
      </Text>
      <Title order={3} ta="center">
        Why Choose AsaanDrive?
      </Title>
      <Text fz={{ base: "md", sm: "xl" }} ta="center">
        Our platform offers multiple benefits to both renters and vehicle
        owners.
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" mt="lg" w="100%">
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
