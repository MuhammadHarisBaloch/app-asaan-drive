import FeatureCardList from "@/components/features/how-it-works/FeatureCardList";
import { data } from "@/constants/Data";
import { Stack, Text, Title } from "@mantine/core";

export default function HowItWorksPage() {
  return (
    <Stack gap="3xl" px="lg">
      <Stack align="center" my="xxl" gap="xs">
        <Text c="red" fz="xl">
          Process
        </Text>
        <Title order={3} fw="bold">
          How AsaanDrive Works
        </Title>
        <Text fz="xl">
          Simple Steps to get you on the Road or Earn from your vehicle.
        </Text>
      </Stack>
      <Stack gap="xl">
        <Text c="black" fz="xl" fw="bold">
          For Renters
        </Text>
        <FeatureCardList items={data.renter.usageSteps} />
      </Stack>
      <Stack gap="xl">
        <Text c="black" fz="xl" fw="bold">
          For Vehicle Owners
        </Text>
        <FeatureCardList items={data.vehicleOwner.usageSteps} />
      </Stack>
    </Stack>
  );
}
