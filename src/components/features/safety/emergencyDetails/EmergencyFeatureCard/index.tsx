import { Card, Stack, SimpleGrid, Box, Center, Text } from "@mantine/core";
import { IconClock, IconMapPin, IconPhone } from "@tabler/icons-react";

const emergencyFeatures = [
  {
    icon: <IconClock size={30} color="blue" />,
    iconBackground: "blue.0",
    title: "Instant Response",
    subTitle:
      "Emergency alert is triggered immediately - no confirmation needed in crisis situations.",
  },
  {
    icon: <IconMapPin size={30} color="green" />,
    iconBackground: "green.0",
    title: "Location Shared",
    subTitle:
      "Your exact GPS coordinates are automatically shared with our emergency response team.",
  },
  {
    icon: <IconPhone size={30} color="purple" />,
    iconBackground: "purple.0",
    title: "Support Contacted",
    subTitle:
      "Our 24/7 emergency team receives your alert and begins immediate assistance protocols.",
  },
];
export default function EmergencyFeatureCard() {
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
          What Happens When You Press It
        </Text>
        <SimpleGrid cols={3} spacing="3xl">
          {emergencyFeatures.map((feature, index) => {
            return (
              <Stack align="center" key={index}>
                <Box
                  bg={feature.iconBackground}
                  h={60}
                  w={60}
                  style={{ borderRadius: "50%" }}
                >
                  <Center h="100%">{feature.icon}</Center>
                </Box>
                <Text fz="md" fw={500} c="black">
                  {feature.title}
                </Text>
                <Text fz="xs" ta="center">
                  {feature.subTitle}
                </Text>
              </Stack>
            );
          })}
        </SimpleGrid>
      </Stack>
    </Card>
  );
}
