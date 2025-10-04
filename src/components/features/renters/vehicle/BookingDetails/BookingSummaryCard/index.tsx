import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { Card, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import { IconExclamationCircle, IconMapPin } from "@tabler/icons-react";
import Image from "next/image";
import { BookingFormValues } from "..";
import { useMemo } from "react";
interface BookingSummaryCardProps {
  vehicle: VehicleModel;
  values: BookingFormValues;
}

export default function BookingSummaryCard({
  vehicle,
  values,
}: BookingSummaryCardProps) {
  // 1. Rental Cost calculate
  const rentalCost = useMemo(() => {
    switch (values.rentalType) {
      case "Daily":
        return vehicle.dailyRate * values.duration;
      case "Weekly":
        return vehicle.weeklyRate * values.duration;
      case "Monthly":
        return vehicle.monthlyRate * values.duration;
      default:
        return 0;
    }
  }, [values.rentalType]);

  // 2. Tax (5%)
  const tax = useMemo(() => rentalCost * 0.05, [rentalCost]);
  // 3. Total = rentalCost + tax
  const total = useMemo(() => rentalCost + tax, [rentalCost, tax]);

  const vehicleDuration = useMemo(() => {
    switch (values.rentalType) {
      case "Daily":
        return `${values.duration} Day`;
      case "Weekly":
        return `${values.duration} Week`;
      case "Monthly":
        return `${values.duration} Month`;
      default:
        return "—";
    }
  }, [values.rentalType]);

  const baseRate = useMemo(() => {
    switch (values.rentalType) {
      case "Daily":
        return `${vehicle.dailyRate} Day`;
      case "Weekly":
        return `${vehicle.weeklyRate} Week`;
      case "Monthly":
        return `${vehicle.monthlyRate} Month`;
      default:
        return "—";
    }
  }, [values.rentalType]);

  return (
    <Card withBorder radius="lg" p="xl">
      <Stack>
        <Text fz="lg" c="black" fw={500}>
          Booking Summary
        </Text>
        <Flex gap="lg">
          <Image
            src={vehicle.vehiclePhotos[0]}
            alt={vehicle.vehicleModel}
            height={100}
            width={100}
            sizes="100vw"
            style={{
              width: "6rem",
              height: "5rem",
              borderRadius: "10px",
            }}
          />
          <Stack gap="xs">
            <Text fz="sm" fw={600} c="black">
              {vehicle.vehicleModel}
            </Text>
            <Text fz="12px">
              {vehicle.vehicleType}. {vehicle.vehicleYear}
            </Text>
            <Flex align="center" gap="sm">
              <IconMapPin size={15} color="gray" />
              <Text fz="12px">{vehicle.pickupLocation}, Pakistan</Text>
            </Flex>
          </Stack>
        </Flex>
        <Divider w="100%" />
        <Group justify="space-between">
          <Text fz="12px ">Rental Type: </Text>
          <Text fz="12px " c="black">
            {values.rentalType || "—"}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text fz="12px ">Duration: </Text>
          <Text fz="12px " c="black">
            {vehicleDuration || "—"}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text fz="12px ">Pickup Date: </Text>
          <Text fz="12px " c="black">
            {values.pickUpDate ?? "—"}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text fz="12px ">Pickup Time: </Text>
          <Text fz="12px " c="black">
            {values.pickUpTime ?? "—"}
          </Text>
        </Group>

        <Divider w="100%" />
        <Group justify="space-between">
          <Text fz="12px ">Base Rate: </Text>
          <Text fz="12px " c="black">
            {baseRate}
          </Text>
        </Group>

        <Group justify="space-between">
          <Text fz="12px ">Rental Cost: </Text>
          <Text fz="12px " c="black">
            {rentalCost > 0 ? `Rs. ${rentalCost.toFixed(2)}` : "—"}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text fz="12px ">{`Tax (5%): `}</Text>
          <Text fz="12px " c="black">
            {rentalCost * 0.05}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text fz="12px ">{`Total: `}</Text>
          <Text fz="12px " c="black">
            {total > 0 ? `Rs. ${total.toFixed(2)}` : "—"}
          </Text>
        </Group>
        <Card bg="white.4" radius="lg">
          <Stack gap="xs">
            <Flex align="center" gap="sm">
              <IconExclamationCircle size={15} color="red" />
              <Text fz="12px" fw={500} c="black">
                Important Information
              </Text>
            </Flex>
            <Text fz="10px">
              You'll be charged only after the owner accepts your booking
              request. Please be on time for pickup and return the vehicle in
              the same condition.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  );
}
