import { Card, Stack, Flex, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

const emergencyInformation = [
  {
    title: "Use only for real emergencies:",
    subTitle: "False alarms can delay response to actual emergencies.",
  },
  {
    title: "Stay calm:",
    subTitle: "Our team is trained to handle emergency situations efficiently.",
  },
  {
    title: "Keep your phone accessible:",
    subTitle: "We may need to contact you for additional information.",
  },
];

export default function EmergencyInformationCard() {
  return (
    <Card
      p="xl"
      w="100%"
      radius="md"
      bg="pink.0"
      style={{ border: "1px solid #fecaca" }}
    >
      <Stack gap="xl">
        <Text fz="xl" c="red.9" fw={600}>
          Important Information
        </Text>
        {emergencyInformation.map((info, index) => {
          return (
            <Flex key={index} align="center" gap="md">
              <IconAlertTriangle size={20} color="#B91C1C" />
              <Flex align="center" gap="xs">
                <Text fz="md" c="red.8" fw={500}>
                  {info.title}
                </Text>
                <Text fz="sm" c="red.8">
                  {info.subTitle}
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </Stack>
    </Card>
  );
}
