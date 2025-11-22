import { Box, Card, Flex, Stack, Text } from "@mantine/core";
import { JSX } from "react";

interface SafetyFeatureCardProps {
  featureList: {
    icon: JSX.Element;
    title: string;
    subTitle: string;
  }[];
  heading: string;
}

export default function SafetyFeatureCard({
  featureList,
  heading,
}: SafetyFeatureCardProps) {
  return (
    <Card
      p={{ base: "lg", sm: "xl" }}
      radius="md"
      h="100%"
      style={{ filter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.21))" }}
    >
      <Stack gap="lg">
        <Text fz={{ base: "md", sm: "lg" }} c="black" fw={500}>
          {heading}
        </Text>
        {featureList.map((data, index) => {
          return (
            <Flex key={index} gap="md" align="flex-start">
              <Box style={{ flexShrink: 0 }}>{data.icon}</Box>
              <Stack gap="xs" style={{ flex: 1 }}>
                <Text fz={{ base: "sm", sm: "sm" }} c="black" fw={500}>
                  {data.title}
                </Text>
                <Text fz="xs" lh={1.5}>
                  {data.subTitle}
                </Text>
              </Stack>
            </Flex>
          );
        })}
      </Stack>
    </Card>
  );
}
