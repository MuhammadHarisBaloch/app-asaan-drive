// components/BookingRow.tsx
"use client";

import { Badge, Flex, Stack, Text } from "@mantine/core";
import { IconUserCircle, IconPointFilled } from "@tabler/icons-react";
import Image from "next/image";
import { BookingModel } from "@/features/booking/models/booking.model";
import { UserModel } from "@/features/user/models/user.model";

interface BookingRowProps {
  booking: BookingModel & { renter?: UserModel | null };
  gridTemplate: string;
}

export default function BookingRow({ booking, gridTemplate }: BookingRowProps) {
  // ✅ getStatusStyle logic for badges
  const getStatusStyle = (status: string) => {
    if (!status) {
      return { color: "transparent", bgColor: "transparent" };
    }
    switch (status.toLowerCase()) {
      case "active":
        return { color: "blue", bgColor: "blue.1" };
      case "confirmed":
        return { color: "green", bgColor: "green.1" };
      case "pending":
        return { color: "orange.4", bgColor: "orange.0" };
      case "completed":
        return { color: "black", bgColor: "gray.1" };
      case "cancelled":
        return { color: "red", bgColor: "pink.1" };
      default:
        return { color: "gray", bgColor: "gray.1" };
    }
  };
  const { color, bgColor } = getStatusStyle(booking.status ?? "");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: gridTemplate,
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #f2f2f2",
      }}
    >
      {/* Booking ID */}
      <Stack gap={0} align="flex-start">
        <Text fz="13px" c="black" fw={600}>
          #{booking.bookingId ?? "---"}
        </Text>
        <Text fz="12px" c="dimmed">
          {booking.pickUpDate ?? "---"}
        </Text>
      </Stack>

      {/* User */}
      <Flex align="center" gap="sm" justify="flex-start">
        <IconUserCircle color="gray" size={30} />
        <Stack gap={0} align="flex-start">
          <Text fz="13px" c="black" fw={600}>
            {booking.renter?.fullName ?? "Unknown User"}
          </Text>
          <Text fz="12px" c="dimmed">
            {booking.renter?.email ?? "--"}
          </Text>
        </Stack>
      </Flex>

      {/* Vehicle */}
      <Flex align="center" gap="sm" justify="flex-start">
        <Image
          src={booking.vehiclePhotos?.[0] ?? ""}
          alt={booking.vehicleName ?? "Vehicle"}
          unoptimized
          height={36}
          width={60}
          style={{ borderRadius: 4, objectFit: "cover" }}
        />
        <Stack gap={0} align="flex-start">
          <Text fz="13px" c="black" fw={600}>
            {booking.vehicleName ?? "Unknown Vehicle"}
          </Text>
          <Flex align="center" gap={4}>
            <Text fz="12px" c="dimmed">
              {booking.vehicleType ?? "--"}
            </Text>
            <IconPointFilled color="gray" size={6} />
            <Text fz="12px" c="dimmed">
              {booking.rentalType ?? "--"}
            </Text>
          </Flex>
        </Stack>
      </Flex>

      {/* Date & Duration */}
      <Stack gap={0} align="flex-start">
        <Text fz="13px" c="black" fw={600}>
          {booking.returnDate ?? "--"}
        </Text>
        <Text fz="12px" c="dimmed">
          {booking.duration}{" "}
          {booking.rentalType === "Daily"
            ? "day"
            : booking.rentalType === "Weekly"
            ? "week"
            : booking.rentalType === "Monthly"
            ? "month"
            : "---"}
        </Text>
      </Stack>

      {/* Status */}
      <Flex justify="center">
        <Badge
          w="100%"
          c={color}
          fw={500}
          bg={bgColor}
          styles={{
            root: {
              textAlign: "center",
              textTransform: "lowercase",
            },
          }}
        >
          {booking.status ?? "--"}
        </Badge>
      </Flex>

      {/* Payment */}
      <Stack gap="sm" align="flex-end">
        <Badge
          c="green"
          fw={500}
          bg="green.1"
          styles={{
            root: {
              textAlign: "center",
              textTransform: "lowercase",
            },
          }}
        >
          Paid
        </Badge>
        <Stack gap={0} align="flex-start">
          <Text lh={1} fz="12px" fw={600}>
            Rs. {booking.totalPrice?.toLocaleString() ?? "--"}
          </Text>
          <Text fz="11px" c="dimmed">
            card
          </Text>
        </Stack>
      </Stack>
    </div>
  );
}
