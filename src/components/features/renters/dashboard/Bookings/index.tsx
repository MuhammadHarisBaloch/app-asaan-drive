import {
  Card,
  Center,
  Divider,
  Flex,
  Group,
  Input,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";
import { data } from "@/constants/Data";
import BookingCard from "./BookingCard";

export default function BookingsSection() {
  const [bookings, setBookings] = useState<string | null>("All Status");
  const [value, setValue] = useState("");
  return (
    <Stack p="lg" gap="xxl">
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
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
            />
            <Flex gap="sm" align="center">
              <IconFilter size={20} color="gray" />
              <Select
                w="10rem"
                radius="md"
                data={[
                  "All Status",
                  "Active",
                  "Confirmed",
                  "Pending",
                  "Completed",
                ]}
                value={bookings}
                onChange={setBookings}
              />
            </Flex>
          </Group>
          <Stack gap="lg">
            {/* Header */}
            <Group px="lg" align="center">
              {data.renter.dashboard.myBookings.headerColumns.map((col, i) => (
                <Text
                  key={i}
                  fz="xs"
                  fw={600}
                  c="black"
                  style={{ flex: col.flex }}
                  ta={col.align}
                >
                  {col.label}
                </Text>
              ))}
            </Group>
            <Divider w="100%" />
            {/* Rows */}
            {data.renter.dashboard.myBookings.BookingFeaturesData.map(
              (data, index) => (
                <React.Fragment key={index}>
                  {bookings === data.status || value === data.vehicleName ? (
                    <BookingCard {...data} />
                  ) : bookings === "All Status" ? (
                    <BookingCard {...data} />
                  ) : null}
                </React.Fragment>
              )
            )}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
