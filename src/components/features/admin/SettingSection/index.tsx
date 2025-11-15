import {
  Card,
  Stack,
  Text,
  Switch,
  TextInput,
  NumberInput,
  Group,
  Button,
  Divider,
  Box,
  MultiSelect,
  Select,
} from "@mantine/core";

import { IconShield, IconBell } from "@tabler/icons-react";

export default function AdminSettingsSection() {
  return (
    <Stack p="lg" gap="xl">
      {/* Header Section */}
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Settings Panel
        </Text>
        <Text fz="12px">
          Configure system settings and platform preferences
        </Text>
      </Stack>

      {/* Security Settings */}
      <Card
        p="xl"
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
      >
        <Group gap="sm" mb="md">
          <IconShield size={20} color="gray" />
          <Text fz="lg" fw={600} c="black">
            Security Settings
          </Text>
        </Group>

        <Stack gap="xl">
          {/* Two-Factor Authentication */}
          <Group justify="space-between" align="flex-start">
            <Stack gap="sm" style={{ flex: 1 }}>
              <Text fw={600} c="black" fz="sm">
                Two-Factor Authentication
              </Text>
              <Text fz="xs" c="gray.6">
                Require 2FA for admin accounts
              </Text>
            </Stack>
            <Switch color="red.4" size="md" defaultChecked={true} />
          </Group>

          <Divider />

          {/* Session Timeout */}
          <Group justify="space-between" align="flex-start">
            <Stack gap="md" style={{ flex: 1 }}>
              <Text fw={600} c="black" fz="sm">
                Session Timeout (minutes)
              </Text>
              <NumberInput
                w="100%"
                radius="md"
                min={5}
                max={120}
                value={30}
                step={5}
                size="sm"
                style={{ width: 100 }}
              />
            </Stack>
          </Group>

          <Divider />

          {/* Password Policy */}
          <Group justify="space-between" align="flex-start">
            <Stack gap="md" style={{ flex: 1 }}>
              <Text fw={600} c="black" fz="sm">
                Password Policy
              </Text>
              <Select
                radius="md"
                defaultValue={`Strong (8+ chars, mixed case, numbers, symbols)`}
                data={[
                  `Strong (8+ chars, mixed case, numbers, symbols)`,
                  `Medium (6+ chars, mixed case, numbers)`,
                  `Basic (6+ characters)`,
                ]}
              />
            </Stack>
          </Group>
        </Stack>
      </Card>

      {/* Notification Settings */}
      <Card
        p="xl"
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
      >
        <Group gap="sm" mb="md">
          <IconBell size={25} color="gray" />
          <Text fz="lg" fw={600} c="black">
            Notification Settings
          </Text>
        </Group>

        <Stack gap="xl">
          {/* Email Notifications */}
          <Group justify="space-between" align="flex-start">
            <Stack gap="sm" style={{ flex: 1 }}>
              <Text fw={600} c="black" fz="sm">
                Email Notifications
              </Text>
              <Text fz="xs" c="gray.6">
                Send email notifications for bookings and updates
              </Text>
            </Stack>
            <Switch size="md" color="red.4" defaultChecked={true} />
          </Group>

          <Divider />

          {/* SMS Notifications */}
          <Group justify="space-between" align="flex-start">
            <Stack gap="sm" style={{ flex: 1 }}>
              <Text fw={600} c="black" fz="sm">
                SMS Notifications
              </Text>
              <Text fz="xs" c="gray.6">
                Send SMS alerts for urgent updates
              </Text>
            </Stack>
            <Switch size="md" color="red.4" defaultChecked={true} />
          </Group>

          <Divider />

          {/* Push Notifications */}
          <Group justify="space-between" align="flex-start">
            <Stack gap="sm" style={{ flex: 1 }}>
              <Text fw={600} c="black" fz="sm">
                Push Notifications
              </Text>
              <Text fz="xs" c="gray.6">
                Browser push notifications for real-time updates
              </Text>
            </Stack>
            <Switch size="md" color="red.4" defaultChecked={false} />
          </Group>
        </Stack>
      </Card>

      {/* Save Button */}
      <Group justify="flex-end">
        <Button size="md">Save Settings</Button>
      </Group>
    </Stack>
  );
}
