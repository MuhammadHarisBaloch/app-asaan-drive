import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { Stack, Flex, Center, Button, Text } from "@mantine/core";
import {
  IconUserCircle,
  IconPhone,
  IconMail,
  IconShieldCheck,
} from "@tabler/icons-react";

interface ContactInfoSectionProps {
  vehicle: VehicleModel;
}
export default function ContactInfoSection({
  vehicle,
}: ContactInfoSectionProps) {
  return (
    <Stack p="lg" gap="xl">
      <Text fz="lg" c="black" fw={500}>
        Owner Contact Information
      </Text>
      <Flex align="center" gap="lg">
        <Center h="80px" w="80px" bg="red.4" style={{ borderRadius: "50%" }}>
          <IconUserCircle size={50} color="white" />
        </Center>
        <Stack gap={0}>
          <Text fz="md" c="black" fw={600}>
            {vehicle.ownerName}
          </Text>
          <Text fz="sm" c="black">
            {vehicle.ownerType}
          </Text>
        </Stack>
      </Flex>
      <Flex gap="xl">
        <Button
          size="lg"
          fz="md"
          fw={500}
          leftSection={<IconPhone size={20} color="gray" />}
          w="100%"
          variant="outline"
          color="gray"
        >
          {vehicle.ownerNumber}
        </Button>
        <Button
          size="lg"
          fz="md"
          fw={500}
          leftSection={<IconMail size={20} color="gray" />}
          w="100%"
          variant="outline"
          color="gray"
        >
          {vehicle.ownerEmail}
        </Button>
      </Flex>
      <Flex
        w="100%"
        gap="md"
        bg="green.0"
        py="lg"
        px="xl"
        style={{ borderRadius: "10px" }}
      >
        <IconShieldCheck size={20} color="#0F6646" />
        <Text fz="xs" c="green">
          Payment successful. A receipt has been sent to your email.
        </Text>
      </Flex>
    </Stack>
  );
}
