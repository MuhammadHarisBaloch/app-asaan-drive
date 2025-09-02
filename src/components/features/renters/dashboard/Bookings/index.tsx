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
import React from "react";
import Image from "next/image";
import Images from "@/constants/Images";
import { data } from "@/constants/Data";

export default function BookingsSection() {
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
                  <Group px="lg" align="center">
                    {/* Vehicle column special case */}
                    <Flex gap="md" align="center" style={{ flex: 2 }}>
                      <Image
                        height={100}
                        width={100}
                        src={data.vehicleImage}
                        alt={data.vehicleName}
                        style={{ height: "auto", width: "4rem" }}
                      />
                      <Stack gap={2}>
                        <Text fz="xs" fw={600} c="black">
                          {data.vehicleName}
                        </Text>
                        <Text fz="12px">{data.vehicleType}</Text>
                      </Stack>
                    </Flex>

                    {/* Other columns */}
                    <Text fz="12px" style={{ flex: 1, textAlign: "center" }}>
                      {data.pickupDate}
                    </Text>
                    <Text fz="12px" style={{ flex: 1, textAlign: "center" }}>
                      {data.returnDate}
                    </Text>
                    <Center
                      py="xxs"
                      bg={data.statusBgColor}
                      style={{
                        flex: 1,
                        borderRadius: "10px",
                      }}
                    >
                      <Text fz="12px" c={data.statusColor}>
                        {data.status}
                      </Text>
                    </Center>
                    <Text
                      fz="xs"
                      fw={600}
                      c="black"
                      style={{ flex: 1, textAlign: "right" }}
                    >
                      {data.price}
                    </Text>
                  </Group>
                  <Divider w="100%" />
                </React.Fragment>
              )
            )}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
