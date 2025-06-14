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
      <Box bg="red" h={55} w={55} style={{ borderRadius: "5px" }}>
        <Center h="100%">{icon}</Center>
      </Box>
      <Box maw="80%">
        <Text c="black" fz="1.5rem" fw="bold">
          {title}
        </Text>
        <Text fz="1.2rem" fw={400}>
          {description}
        </Text>
      </Box>
    </Group>
  );
}
