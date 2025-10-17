// file: components/features/renters/vehicle/OrderSummarySection.tsx
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { Card, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import Image from "next/image";
import { RenterBookingForm } from "@/app/app/renter/vehicle/[id]/page";

interface PaymentSummary {
  returnDate: string | null;
  rentalCost: number;
  tax: number;
  total: number;
  baseRate: string;
  vehicleDurationLabel: string;
}

interface OrderSummarySectionProps {
  formValues: Partial<RenterBookingForm>;
  vehicle: VehicleModel;
  paymentSummary: PaymentSummary;
}

export default function OrderSummarySection({
  vehicle,
  formValues,
  paymentSummary,
}: OrderSummarySectionProps) {
  // child is now purely presentational — no useEffect that updates parent
  const { returnDate, rentalCost, tax, total, baseRate, vehicleDurationLabel } =
    paymentSummary;

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
            height={60}
            width={100}
            style={{
              objectFit: "cover",
              borderRadius: "5px",
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
          <Text fz="12px ">{vehicleDurationLabel}</Text>
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
            {returnDate ?? "—"}
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
            {tax > 0 ? `Rs. ${tax.toFixed(2)}` : "—"}
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
      </Stack>
    </Card>
  );
}
