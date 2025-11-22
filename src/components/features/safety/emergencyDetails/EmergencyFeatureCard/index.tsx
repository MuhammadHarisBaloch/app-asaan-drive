import { data } from "@/constants/Data";
import { Card, Stack, SimpleGrid, Box, Center, Text } from "@mantine/core";

export default function EmergencyFeatureCard() {
  return (
    <Card
      p={{ base: "lg", sm: "xl" }}
      w="100%"
      radius="md"
      style={{
        filter: "drop-shadow(1px 1px 4px rgba(122, 122, 122, 0.21))",
      }}
    >
      <Stack gap="xl">
        <Text fz={{ base: "lg", sm: "xl" }} c="black" fw={600}>
          What Happens When You Press It
        </Text>
        <SimpleGrid
          cols={{ base: 1, sm: 3 }}
          spacing={{ base: "lg", sm: "xl" }}
        >
          {data.emergencyDetails.emergencyFeaturesList.map((feature, index) => {
            return (
              <Stack align="center" key={index}>
                <Box
                  bg={feature.iconBackground}
                  h={50}
                  w={50}
                  style={{ borderRadius: "50%" }}
                >
                  <Center h="100%">{feature.icon}</Center>
                </Box>
                <Text
                  fz={{ base: "sm", sm: "md" }}
                  fw={500}
                  c="black"
                  ta="center"
                >
                  {feature.title}
                </Text>
                <Text fz="xs" ta="center" lh={1.4}>
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
