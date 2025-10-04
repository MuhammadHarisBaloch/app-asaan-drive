import Images from "@/constants/Images";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { Card, Stack, Flex, Divider, Group, Text } from "@mantine/core";
import { IconMapPin, IconEye } from "@tabler/icons-react";
import Image from "next/image";
import { RenterBookingForm } from "@/app/app/renter/vehicle/[id]/page";
import { useMemo } from "react";

interface BookingSummaryProps {
  vehicle: VehicleModel;
  formValues: Partial<RenterBookingForm> | null;
}

export default function BookingSummary({
  vehicle,
  formValues,
}: BookingSummaryProps) {
  // 1. Rental Cost calculate
  const rentalCost = useMemo(() => {
    if (!formValues?.duration) return 0;
    switch (formValues?.rentalType) {
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
        return `${formValues.duration} Day`;
      case "Weekly":
        return `${formValues.duration} Week`;
      case "Monthly":
        return `${formValues.duration} Month`;
      default:
        return "—";
    }
  }, [formValues?.duration, formValues?.rentalType]);

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
          <Text fz="12px ">Rental Type:</Text>
          <Text fz="12px " c="black">
            {formValues?.rentalType}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text fz="12px ">Duration:</Text>
          <Text fz="12px " c="black">
            {vehicleDuration}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text fz="12px ">Total Amount:</Text>
          <Text fz="12px " c="red.4">
            {total > 0 ? `Rs. ${total.toFixed(2)}` : "—"}
          </Text>
        </Group>

        <Card bg="blue.0" radius="md" style={{ border: "1px solid #bfd8fc" }}>
          <Stack gap="xs">
            <Flex align="center" gap="sm">
              <IconEye size={15} color="blue" />
              <Text fz="12px" fw={500} c="blue.6">
                Document Verification
              </Text>
            </Flex>
            <Text fz="10px" c="blue.3">
              Upload valid documents to proceed with your booking. Your
              information is secure and encrypted
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  );
}
