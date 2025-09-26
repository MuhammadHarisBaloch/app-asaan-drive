import { Card, Group, Stack, Text, Button } from "@mantine/core";
import NotificationCard from "./NotificationCard";
import { useState } from "react";
import { data } from "@/constants/Data";

export default function Notifications() {
  const [readAllNotification, setReadAllNotification] = useState(false);
  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Notifications
        </Text>
        <Text fz="12px">Stay updated with your rental activity</Text>
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
            <Button
              variant="outline"
              color="red.4"
              fz="xs"
              fw={500}
              onClick={() => {
                setReadAllNotification(true);
              }}
            >
              Mark all as read
            </Button>
          </Group>
          <Stack gap="lg">
            {data.renter.dashboard.notifications.availableNotifications.map(
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
