import { Card, Stack, Text } from "@mantine/core";
import { IconCar } from "@tabler/icons-react";
import { JSX } from "react";

interface TrackingCardProps {
  icon: JSX.Element;
  title: string;
  subTitle: string;
  description: string;
  trackingId: string;
}

export default function TrackingCard({
  icon,
  title,
  subTitle,
  description,
  trackingId,
}: TrackingCardProps) {
  return (
    <Card
      w="100%"
      px="xl"
      py="3xl"
      radius="md"
      style={{ filter: "drop-shadow(1px 1px 2px #4141412b)" }}
    >
      <Stack align="center" justify="center">
        {icon}
        <Text c="black" fw={600}>
          {title}
        </Text>
        <Text fz="sm">
          {subTitle} {trackingId}
        </Text>
        <Text fz="sm">{description}</Text>
      </Stack>
    </Card>
  );
}
