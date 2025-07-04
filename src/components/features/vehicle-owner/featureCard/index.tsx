import { Card, Stack, Box, Center, Title, Text } from "@mantine/core";
import { JSX } from "react";

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  subTitle: string;
  iconBackgroundColor: string;
}
export default function FeatureCard({
  icon,
  title,
  subTitle,
  iconBackgroundColor,
}: FeatureCardProps) {
  return (
    <Card
      radius="md"
      style={{ filter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.16))" }}
    >
      <Stack align="center" gap="xl" py="lg">
        <Box
          bg={iconBackgroundColor}
          h={50}
          w={50}
          style={{ borderRadius: "50%" }}
        >
          <Center h="100%">{icon}</Center>
        </Box>
        <Stack gap="lg" align="center">
          <Text fz="sm" c="black" lh={0.8} fw={500}>
            {title}
          </Text>
          <Text fz="xs" ta="center">
            {subTitle}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
}
