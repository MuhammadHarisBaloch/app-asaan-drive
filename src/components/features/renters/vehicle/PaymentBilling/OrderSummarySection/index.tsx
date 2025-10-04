import { data } from "@/constants/Data";
import Images from "@/constants/Images";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { Card, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import Image from "next/image";
import { useMemo } from "react";
import { RenterBookingForm } from "@/app/app/renter/vehicle/[id]/page";

interface OrderSummarySectionProps {
  formValues: Partial<RenterBookingForm> | null;
  vehicle: VehicleModel;
}
export default function OrderSummarySection({
  vehicle,
  formValues,
}: OrderSummarySectionProps) {
  // 1. Rental Cost calculate
  const rentalCost = useMemo(() => {
    if (!formValues?.duration) return 0;
    switch (formValues.rentalType) {
      case "Daily":
        return vehicle.dailyRate * formValues?.duration;
      case "Weekly":
        return vehicle.weeklyRate * formValues?.duration;
      case "Monthly":
        return vehicle.monthlyRate * formValues?.duration;
      default:
        return 0;
    }
  }, [formValues?.rentalType, formValues?.duration]);

  // 2. Tax (5%)
  const tax = useMemo(() => rentalCost * 0.05, [rentalCost]);
  // 3. Total = rentalCost + tax
  const total = useMemo(() => rentalCost + tax, [rentalCost, tax]);

  const vehicleDuration = useMemo(() => {
    switch (formValues?.rentalType) {
      case "Daily":
        return `Day`;
      case "Weekly":
        return `Week`;
      case "Monthly":
        return `Month`;
      default:
        return "—";
    }
  }, [formValues?.rentalType, formValues?.duration]);

  const baseRate = useMemo(() => {
    switch (formValues?.rentalType) {
      case "Daily":
        return `${vehicle.dailyRate} /Day`;
      case "Weekly":
        return `${vehicle.weeklyRate} /Week`;
      case "Monthly":
        return `${vehicle.monthlyRate} /Month`;
      default:
        return "—";
    }
  }, [formValues?.rentalType]);

  return (
    <Card h="100%" withBorder radius="lg" p="xl">
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
            }}
          />
          <Stack gap="xs">
            <Text fz="sm" fw={600} c="black">
              {vehicle.vehicleModel}
            </Text>
            <Text fz="12px">
              {vehicle.vehicleType} . {vehicle.vehicleYear}
            </Text>
            <Flex align="center" gap="sm">
              <IconMapPin size={15} color="gray" />
              <Text fz="12px">{vehicle.pickupLocation}, Pakistan</Text>
            </Flex>
          </Stack>
        </Flex>
        <Divider w="100%" />
        <Group justify="space-between">
          <Text fz="12px ">Rental Type</Text>
          <Text fz="12px " c="black">
            {formValues?.rentalType || "—"}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text fz="12px ">{vehicleDuration}</Text>
          <Text fz="12px " c="black">
            {formValues?.duration || "—"}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text fz="12px ">Rate</Text>
          <Text fz="12px " c="black">
            {baseRate}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text fz="12px ">Return Date</Text>
          <Text fz="12px " c="black">
            -
          </Text>
        </Group>
        <Divider w="100%" />
        <Group justify="space-between">
          <Text fz="12px ">Subtotal</Text>
          <Text fz="12px " c="black">
            {rentalCost > 0 ? `Rs. ${rentalCost.toFixed(2)}` : "—"}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text fz="12px ">{`Tax (5%)`}</Text>
          <Text fz="12px " c="black">
            {rentalCost * 0.05}
          </Text>
        </Group>
        <Divider w="100%" />
        <Group justify="space-between">
          <Text fz="xs" c="black" fw={500}>
            Total:
          </Text>
          <Text fz="xs" c="red.4" fw={500}>
            {total > 0 ? `Rs. ${total.toFixed(2)}` : "—"}
          </Text>
        </Group>
        {/* <Card bg="white.4" radius="lg">
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
        </Card> */}
      </Stack>
    </Card>
  );
}
