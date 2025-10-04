import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { Card, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import { IconExclamationCircle, IconMapPin } from "@tabler/icons-react";
import Image from "next/image";
import { BookingFormValues } from "..";
interface BookingSummaryCardProps {
  vehicle: VehicleModel;
  values: BookingFormValues;
}

export default function BookingSummaryCard({
  vehicle,
  values,
}: BookingSummaryCardProps) {
  // 1. Rental Cost calculate
  const rentalCost =
    values.rentalType === "Daily"
      ? vehicle.dailyRate * values.duration
      : values.rentalType === "Weekly"
      ? vehicle.weeklyRate * values.duration
      : values.rentalType === "Monthly"
      ? vehicle.monthlyRate * values.duration
      : 0;

  // 2. Tax (5%)
  const tax = rentalCost * 0.05;

  // 3. Total = rentalCost + tax
  const total = rentalCost + tax;

  const vehicleBookingDetails = [
    {
      title: "Rental Type:",
      subTitle: values.rentalType || "—",
    },
    {
      title: "Duration:",
      // subTitle: values.duration ? `${values.duration} Days` : "—",
      subTitle:
        values.rentalType === "Daily"
          ? `${values.duration} Day`
          : values.rentalType === "Weekly"
          ? `${values.duration} Week`
          : values.rentalType === "Monthly"
          ? `${values.duration} Month`
          : "—",
    },
    {
      title: "Pickup Date:",
      subTitle: values.pickUpDate ? values.pickUpDate : "—",
    },
    {
      title: "Pickup Time:",
      subTitle: values.pickUpTime ? values.pickUpTime : "—",
    },
  ];
  const bookingPaymentDetails = [
    {
      title: "Base Rate:",
      subTitle:
        values.rentalType === "Daily"
          ? `${vehicle.dailyRate} Day`
          : values.rentalType === "Weekly"
          ? `${vehicle.weeklyRate} Week`
          : values.rentalType === "Monthly"
          ? `${vehicle.monthlyRate} Month`
          : "—",
      subTitleColor: "black",
    },
    {
      title: "Rental Cost:",
      subTitle: rentalCost > 0 ? `Rs. ${rentalCost.toFixed(2)}` : "—",
      subTitleColor: "black",
    },
    {
      title: "Tax (5%):",
      subTitle: rentalCost > 0 ? `Rs. ${tax.toFixed(2)}` : "—",
      subTitleColor: "black",
    },
    {
      title: "Total:",
      subTitle: total > 0 ? `Rs. ${total.toFixed(2)}` : "—",
      titleColor: "black",
      subTitleColor: "red.4",
    },
  ];
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
        {vehicleBookingDetails.map((data, index) => {
          return (
            <Group key={index} justify="space-between">
              <Text fz="12px ">{data.title}</Text>
              <Text fz="12px " c="black">
                {data.subTitle}
              </Text>
            </Group>
          );
        })}
        <Divider w="100%" />
        {bookingPaymentDetails.map((data, index) => {
          return (
            <Group key={index} justify="space-between">
              <Text fz="12px " c={data.titleColor}>
                {data.title}
              </Text>
              <Text fz="12px " c={data.subTitleColor}>
                {data.subTitle}
              </Text>
            </Group>
          );
        })}
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
