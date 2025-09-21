import { Card, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import NotificationCard from "./NotificationCard";
import { useState } from "react";
import { data } from "@/constants/Data";

export default function NotificationSection() {
  const [readAllNotification, setReadAllNotification] = useState(false);
  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Notifications & Alerts
        </Text>
        <Text fz="12px">
          Stay updated with important notifications and alerts
        </Text>
      </Stack>
      <Card
        radius="md"
        p="xl"
        style={{ filter: "drop-shadow(1px 1px 2px #8e8e8e77)" }}
      >
        <Stack gap="xl">
          <Group justify="space-between">
            <Text c="black" fw={500} fz="md">
              Recent Notifications
            </Text>
            <UnstyledButton
              c="blue.5"
              fz="xs"
              fw={500}
              onClick={() => {
                setReadAllNotification(true);
              }}
            >
              Mark all as read
            </UnstyledButton>
          </Group>
          <Stack gap="lg">
            {data.vehicleOwner.dashboard.notificationSection.recentNotifications.map(
              (data, i) => {
                return (
                  <NotificationCard
                    key={i}
                    {...data}
                    markReadAllNotification={readAllNotification}
                  />
                );
              }
            )}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
