import { data } from "@/constants/Data";
import { Card, Group, Flex, Center, Stack, Text } from "@mantine/core";
import { JSX } from "react";

interface RecentActivityCardProps {
  icon: JSX.Element;
  iconBgColor: string;
  title: string;
  subTitle: string;
  status: string;
}
let color: string;
let bgColor: string;
export default function RecentActivityCard({
  icon,
  iconBgColor,
  title,
  status,
  subTitle,
}: RecentActivityCardProps) {
  switch (status) {
    case "pending":
      color = "orange.2";
      bgColor = "orange.0";
      break;
    case "success":
      color = "green";
      bgColor = "green.1";
      break;
    case "warning":
      color = "red";
      bgColor = "pink.1";
      break;
    case "completed":
      color = "blue";
      bgColor = "blue.1";
      break;
  }

  return (
    <Card
      px="lg"
      py="md"
      style={{
        borderRadius: "10px",
        filter: "drop-shadow(1px 1px 2px #5d5d5d3e)",
      }}
    >
      <Group justify="space-between">
        <Flex align="center" gap="xl">
          <Center
            h={50}
            w={50}
            bg={iconBgColor}
            style={{ borderRadius: "10px" }}
          >
            {icon}
          </Center>
          <Stack gap="xxs">
            <Text fz="xs" c="black" fw={500}>
              {title}
            </Text>
            <Text fz="12px">{subTitle}</Text>
          </Stack>
        </Flex>
        <Center px="md" bg={bgColor} style={{ borderRadius: "10px" }}>
          <Text fz="12px" c={color}>
            {status}
          </Text>
        </Center>
      </Group>
    </Card>
  );
}
