import { Card, Flex, Stack, Text } from "@mantine/core";

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
      p="xl"
      radius="md"
      style={{ filter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.21))" }}
    >
      <Stack>
        <Text fz="lg" c="black" fw={500}>
          {heading}
        </Text>
        {featureList.map((data, index) => {
          return (
            <Flex key={index} gap="sm" align="flex-start">
              {data.icon}
              <Stack gap="xxs">
                <Text fz="sm" c="black">
                  {data.title}
                </Text>
                <Text fz="xs">{data.subTitle}</Text>
              </Stack>
            </Flex>
          );
        })}
      </Stack>
    </Card>
  );
}
