import AboutAppProcess from "@/components/features/how-it-works/AboutAppProcess";
import { Box, Stack, Text, Title } from "@mantine/core";

export default function HowItWorks() {
  return (
    <Stack gap="3xl">
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
      <AboutAppProcess />
    </Stack>
  );
}
