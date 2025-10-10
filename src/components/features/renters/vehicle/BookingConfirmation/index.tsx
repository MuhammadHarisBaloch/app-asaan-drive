import Images from "@/constants/Images";
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCalendarEventFilled,
  IconClock,
  IconCurrentLocationFilled,
  IconMapPin,
  IconPrinter,
  IconShare,
  IconStarFilled,
  IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import BookingIdCard from "./BookingIdCard";
import ContactInfoSection from "./ContactInfoSection";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { RenterBookingForm } from "@/app/app/renter/vehicle/[id]/page";
import { useMemo } from "react";
import Link from "next/link";
interface BookingConfirmationProps {
  bookingId: string | null;
  vehicle: VehicleModel;
  bookingValues: Partial<RenterBookingForm> | null;
}
export default function BookingConfirmation({
  vehicle,
  bookingValues,
  bookingId,
}: BookingConfirmationProps) {
  // 1. Rental Cost calculate
  const rentalCost = useMemo(() => {
    if (!bookingValues?.duration) return 0;
    switch (bookingValues?.rentalType) {
      case "Daily":
        return vehicle.dailyRate * bookingValues.duration;
      case "Weekly":
        return vehicle.weeklyRate * bookingValues.duration;
      case "Monthly":
        return vehicle.monthlyRate * bookingValues.duration;
      default:
        return 0;
    }
  }, [bookingValues?.rentalType, bookingValues?.duration]);

  // 2. Tax (5%)
  const tax = useMemo(() => rentalCost * 0.05, [rentalCost]);
  // 3. Total = rentalCost + tax
  const total = useMemo(() => rentalCost + tax, [rentalCost, tax]);

  const vehicleDuration = useMemo(() => {
    switch (bookingValues?.rentalType) {
      case "Daily":
        return `${bookingValues.duration} Day`;
      case "Weekly":
        return `${bookingValues.duration} Week`;
      case "Monthly":
        return `${bookingValues.duration} Month`;
      default:
        return "—";
    }
  }, [bookingValues?.duration, bookingValues?.rentalType]);

  const baseRate = useMemo(() => {
    switch (bookingValues?.rentalType) {
      case "Daily":
        return `${vehicle.dailyRate}/Day`;
      case "Weekly":
        return `${vehicle.weeklyRate}/Week`;
      case "Monthly":
        return `${vehicle.monthlyRate}/Month`;
      default:
        return "—";
    }
  }, [bookingValues?.rentalType]);

  return (
    <Stack py="3xl" px="8rem" gap="xl">
      <BookingIdCard bookingId={bookingId} />
      <Card
        w="100%"
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 2px #42424242)" }}
        px={0}
      >
        <Stack>
          <Flex gap="lg" p="lg">
            <Image
              height={100}
              width={100}
              src={vehicle.vehiclePhotos[0]}
              alt={vehicle.vehicleModel}
              sizes="100vw"
              style={{ width: "9rem", height: "8rem", borderRadius: "10px" }}
            />
            <Stack gap="md">
              <Text fz="xl" c="black " fw={600} lh={0.8}>
                {vehicle.vehicleModel}
              </Text>
              <Text fz="lg">
                {vehicle.vehicleType} . {vehicle.vehicleYear}
              </Text>
              <Flex align="center" gap="xs">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStarFilled key={i} size={18} color="yellow" />
                ))}
                <Text fz="xs">4.8 (24 reviews)</Text>
              </Flex>
              <Flex gap="md">
                <Badge
                  c="orange"
                  bg="orange.0"
                  size="lg"
                  fw={500}
                  styles={{
                    root: { textAlign: "center", textTransform: "lowercase" },
                  }}
                >
                  pending
                </Badge>
                <Badge
                  c="blue"
                  bg="blue.1"
                  size="lg"
                  fw={500}
                  styles={{
                    root: { textAlign: "center", textTransform: "lowercase" },
                  }}
                >
                  Paid Online
                </Badge>
              </Flex>
            </Stack>
          </Flex>
          <Divider w="100%" />
          <Stack p="lg" gap="xl">
            <Text fz="lg" c="black" fw={500}>
              Booking Details
            </Text>
            <SimpleGrid cols={2} spacing="lg" verticalSpacing="xxl">
              <Flex gap="md" align="flex-start">
                <IconCalendarEventFilled size={30} color="gray" />
                <Stack gap="xxs">
                  <Text fz="xs" fw={500}>
                    Start Date
                  </Text>
                  <Text fz="sm" c="black">
                    {bookingValues?.pickUpDate}
                  </Text>
                </Stack>
              </Flex>
              <Flex gap="md" align="flex-start">
                <IconClock size={30} color="gray" />
                <Stack gap="xxs">
                  <Text fz="xs" fw={500}>
                    Start Time
                  </Text>
                  <Text fz="sm" c="black">
                    {bookingValues?.pickUpTime}
                  </Text>
                </Stack>
              </Flex>
              <Flex gap="md" align="flex-start">
                <IconCalendarEventFilled size={30} color="gray" />
                <Stack gap="xxs">
                  <Text fz="xs" fw={500}>
                    End Date
                  </Text>
                  <Text fz="sm" c="black">
                    {bookingValues?.returnDate}
                  </Text>
                </Stack>
              </Flex>
              <Flex gap="md" align="flex-start">
                <IconClock size={30} color="gray" />
                <Stack gap="xxs">
                  <Text fz="xs" fw={500}>
                    End Time
                  </Text>
                  <Text fz="sm" c="black">
                    {bookingValues?.pickUpTime}
                  </Text>
                </Stack>
              </Flex>
            </SimpleGrid>
          </Stack>
          <Divider w="100%" />
          <Stack p="lg" gap="xl">
            <Text fz="lg" c="black" fw={500}>
              Pickup Location
            </Text>
            <Image
              height={100}
              width={100}
              src={Images.Map.pickupLocationMap}
              alt="cd-125"
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <Flex gap="md" align="flex-start">
              <IconMapPin size={20} color="gray" />
              <Stack gap="xxs">
                <Text fz="xs" fw={500}>
                  Address
                </Text>
                <Text fz="sm" c="black">
                  {vehicle.pickupLocation}, Pakistan
                </Text>
                <Text fz="12px">
                  Please contact the owner for exact location details
                </Text>
              </Stack>
            </Flex>
          </Stack>
          <Divider w="100%" />
          <Stack p="lg" gap="xl">
            <Text fz="lg" c="black" fw={500}>
              Payment Summary
            </Text>

            <Flex justify="space-between">
              <Text fz="sm" c="black" fw={500}>
                {bookingValues?.rentalType} Rate
              </Text>
              <Text fz="sm">{baseRate}</Text>
            </Flex>

            <Flex justify="space-between">
              <Text fz="sm" c="black" fw={500}>
                Duration
              </Text>
              <Text fz="sm">{bookingValues?.duration}</Text>
            </Flex>

            <Flex justify="space-between">
              <Text fz="sm" c="black" fw={500}>
                Subtotal
              </Text>
              <Text fz="sm">{`Rs. ${rentalCost}`}</Text>
            </Flex>

            <Divider w="100%" />
            <Flex justify="space-between">
              <Text fz="lg" c="black" fw={500}>
                Total Paid
              </Text>
              <Text fz="lg" c="red.4">
                {`Rs. ${total}`}
              </Text>
            </Flex>
          </Stack>
        </Stack>
        <Divider w="100%" />
        <ContactInfoSection vehicle={vehicle} />
      </Card>
      <Flex px="lg" gap="xl">
        <Button
          size="lg"
          fz="md"
          fw={500}
          w="100%"
          leftSection={<IconCurrentLocationFilled size={20} color="white" />}
        >
          Track Your Ride
        </Button>
        <Button
          component={Link}
          href={`/app/renter`}
          size="lg"
          bg="white"
          fz="md"
          fw={500}
          w="100%"
          c="gray"
          leftSection={<IconUser size={20} color="gray" />}
          style={{ filter: "drop-shadow(1px 1px 2px #8c8c8cb3)" }}
        >
          Go to Dashboard
        </Button>
      </Flex>
      <Flex justify="center" gap="xl">
        <Button
          variant="transparent"
          size="lg"
          fz="md"
          fw={400}
          c="gray"
          leftSection={<IconPrinter size={25} color="gray" />}
        >
          Print Receipt
        </Button>
        <Button
          variant="transparent"
          size="lg"
          fz="md"
          fw={400}
          c="gray"
          leftSection={<IconShare size={25} color="gray" />}
        >
          Share Booking
        </Button>
      </Flex>
    </Stack>
  );
}
