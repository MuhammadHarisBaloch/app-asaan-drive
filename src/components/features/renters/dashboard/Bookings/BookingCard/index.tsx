import { fetchBookingDocs } from "@/features/booking";
import { Group, Flex, Stack, Divider, Text, Badge } from "@mantine/core";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";

interface BookingCardProps {
  vehiclePhotos: string;
  vehicleName: string;
  vehicleType: string;
  pickUpDate: string;
  returnDate: string;
  status: string;
  totalPrice: number;
}
export default function BookingCard({
  vehicleName,
  vehiclePhotos,
  vehicleType,
  pickUpDate,
  returnDate,
  status,
  totalPrice,
}: BookingCardProps) {
  const getStatusStyle = (status: string) => {
    if (!status) {
      return { color: "transparent", bgColor: "transparent" }; // fallback agar status missing ho
    }
    switch (status.toLowerCase()) {
      case "active":
        return { color: "blue", bgColor: "blue.1" };
      case "confirmed":
        return { color: "green", bgColor: "green.1" };
      case "pending":
        return { color: "red", bgColor: "pink.1" };
      case "completed":
        return { color: "black", bgColor: "gray.1" };
      case "cancelled":
        return { color: "red", bgColor: "pink.1" };
      default:
        return { color: "transparent", bgColor: "transparent" };
    }
  };
  const { color, bgColor } = getStatusStyle(status);

  return (
    <>
      <Group px="lg" align="center">
        {/* Vehicle column special case */}
        <Flex gap="md" align="center" style={{ flex: 2 }}>
          <Image
            src={vehiclePhotos}
            alt={vehicleName ?? "Vehicle"}
            height={60}
            width={100}
            style={{
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
          <Stack gap={2}>
            <Text fz="xs" fw={600} c="black">
              {vehicleName}
            </Text>
            <Text fz="12px">{vehicleType}</Text>
          </Stack>
        </Flex>

        {/* Other columns */}
        <Text fz="12px" style={{ flex: 1, textAlign: "center" }}>
          {pickUpDate}
        </Text>
        <Text fz="12px" style={{ flex: 1, textAlign: "center" }}>
          {returnDate}
        </Text>
        <Badge
          c={color}
          bg={bgColor}
          fw={500}
          styles={{
            root: { textAlign: "center", textTransform: "lowercase" },
          }}
          style={{ flex: 0.8 }}
        >
          {status}
        </Badge>
        <Text
          fz="xs"
          fw={600}
          c="black"
          style={{ flex: 1, textAlign: "right" }}
        >
          Rs: {totalPrice}
        </Text>
      </Group>
      <Divider w="100%" />
    </>
  );
}
