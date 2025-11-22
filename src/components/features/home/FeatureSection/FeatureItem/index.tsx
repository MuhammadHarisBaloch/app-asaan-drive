import { Box, Text, Center, Group } from "@mantine/core";
import { JSX } from "react";

interface FeatureItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

export default function FeatureItem({
  icon,
  title,
  description,
}: FeatureItemProps) {
  return (
    <Group gap="md" justify="flex-start" align="flex-start" wrap="nowrap">
      <Box
        bg="red.4"
        h={{ base: 45, sm: 55 }}
        w={{ base: 45, sm: 55 }}
        style={{ borderRadius: "5px" }}
      >
        <Center h="100%">{icon}</Center>
      </Box>
      <Box maw={{ base: "70%", sm: "80%" }}>
        <Text c="black" fz={{ base: "lg", sm: "xl" }} fw="bold">
          {title}
        </Text>
        <Text fz={{ base: "sm", sm: "lg" }} fw={400}>
          {description}
        </Text>
      </Box>
    </Group>
  );
}
