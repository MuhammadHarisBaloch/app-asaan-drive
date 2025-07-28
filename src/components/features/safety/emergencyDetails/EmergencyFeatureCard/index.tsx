import { data } from "@/constants/Data";
import { Card, Stack, SimpleGrid, Box, Center, Text } from "@mantine/core";
import { IconClock, IconMapPin, IconPhone } from "@tabler/icons-react";

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
          {data.emergencyDetails.emergencyFeaturesList.map((feature, index) => {
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
