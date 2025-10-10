import { Card, Stack, Group, Center, Text } from "@mantine/core";
import { IconCar, IconTrendingUp } from "@tabler/icons-react";
import { JSX } from "react";
interface DashboardStatsCardProps {
  icon: JSX.Element;
  iconBg: string;
  title: string;
  price: string;
}
export default function DashboardStatsCard({
  icon,
  iconBg,
  title,
  price,
}: DashboardStatsCardProps) {
  return (
    <Card
      w="100%"
      p="lg"
      radius="md"
      style={{ filter: "drop-shadow(1px 1px 2px #5d5d5dab)" }}
    >
      <Stack gap="xl">
        <Group align="center" justify="space-between">
          <Center h={60} w={60} bg={iconBg} style={{ borderRadius: "10px" }}>
            {icon}
          </Center>
          <IconTrendingUp size={20} color="green" />
        </Group>
        <Stack gap="xs">
          <Text fz="lg" fw={600} c="black">
            {price}
          </Text>
          <Text fz="xs" fw={600} c="gray.8">
            {title}
          </Text>
          {/* <Text fz="12px">{data.description}</Text> */}
        </Stack>
      </Stack>
    </Card>
  );
}
