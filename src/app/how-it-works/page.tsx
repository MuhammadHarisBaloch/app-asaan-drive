"use client";
import FeatureCardList from "@/components/features/how-it-works/FeatureCardList";
import { data } from "@/constants/Data";
import { Stack, Text, Title, Box } from "@mantine/core";

export default function HowItWorksPage() {
  return (
    <Box w="100%" pb="lg" pt="xs" px="sm">
      <Stack gap="xl" mb="xl">
        <Stack align="center" my="xl" gap="xs">
          <Text c="red.4" fw={600} fz={{ base: "xl", sm: "xl" }}>
            Process
          </Text>
          <Title order={3} fw="bold" ta="center">
            How AsaanDrive Works
          </Title>
          <Text fz={{ base: "md", sm: "xl" }} ta="center">
            Simple Steps to get you on the Road or Earn from your vehicle.
          </Text>
        </Stack>

        <Stack gap="lg">
          <Text
            c="black"
            fz={{ base: "lg", sm: "xl" }}
            fw="bold"
            ta={{ base: "center", sm: "left" }}
          >
            For Renters
          </Text>
          <FeatureCardList items={data.renter.usageSteps} />
        </Stack>

        <Stack gap="lg">
          <Text
            c="black"
            fz={{ base: "lg", sm: "xl" }}
            fw="bold"
            ta={{ base: "center", sm: "left" }}
          >
            For Vehicle Owners
          </Text>
          <FeatureCardList items={data.vehicleOwner.usageSteps} />
        </Stack>
      </Stack>
    </Box>
  );
}
