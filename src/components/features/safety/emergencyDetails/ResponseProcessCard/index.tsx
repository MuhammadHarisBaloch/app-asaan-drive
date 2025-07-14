import { Card, Stack, Flex, Center, Text } from "@mantine/core";

const emergencyResponseSteps = [
  {
    title: "Alert Received (0-30 seconds)",
    subTitle:
      "Our emergency team receives your alert with your location, trip details, and profile information.",
  },
  {
    title: "Immediate Contact (30 seconds - 2 minutes)",
    subTitle:
      "We attempt to call you directly to assess the situation and determine the level of response needed.",
  },
  {
    title: "Emergency Services (2-5 minutes)",
    subTitle:
      "If needed, we contact local emergency services and provide them with your exact location and situation details.",
  },
  {
    title: "Follow-up Support",
    subTitle:
      "We stay in contact until the situation is resolved and provide additional support as needed.",
  },
];

export default function ResponseProcessCard() {
  return (
    <Card
      p="xl"
      w="100%"
      radius="md"
      style={{
        filter: "drop-shadow(1px 1px 4px rgba(122, 122, 122, 0.21))",
      }}
    >
      <Stack gap="xxl">
        <Text fz="xl" c="black" fw={600}>
          Emergency Response Process
        </Text>
        {emergencyResponseSteps.map((item, index) => {
          return (
            <Flex key={index} align="flex-start" gap="lg">
              <Center
                c="red.4"
                h={50}
                w={50}
                bg="red.0"
                style={{ borderRadius: "50%" }}
              >
                {index + 1}
              </Center>
              <Stack gap="xs">
                <Text fz="md" fw={500} c="black">
                  {item.title}
                </Text>
                <Text fz="sm">{item.subTitle}</Text>
              </Stack>
            </Flex>
          );
        })}
      </Stack>
    </Card>
  );
}
