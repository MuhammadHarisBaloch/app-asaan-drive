import { Card, Flex, Group, Input, Select, Stack, Text } from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";

export default function BookingsSection() {
  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          My Bookings
        </Text>
        <Text fz="12px">Manage your vehicle reservations</Text>
      </Stack>
      <Card
        w="100%"
        p="xl"
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 2px #00000068)" }}
      >
        <Stack gap="xxl">
          <Group justify="space-between">
            <Input
              radius="md"
              leftSection={<IconSearch size={15} color="gray" />}
              placeholder="Search bookings..."
            />
            <Flex gap="sm" align="center">
              <IconFilter size={20} color="gray" />
              <Select
                w="10rem"
                radius="md"
                defaultValue={"All Status"}
                data={[
                  "All Status",
                  "Active",
                  "Confirmed",
                  "Pending",
                  "Completed",
                ]}
              />
            </Flex>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}
