import { Avatar, Badge, Button, Card, Flex, Stack, Text } from "@mantine/core";
import {
  IconCalendarEventFilled,
  IconEye,
  IconMapPin,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import BookingViewDetailModal from "./BookingViewDetailsModal";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseConstants } from "@/constants/Firestore";
import { db } from "@/networking/firebase";

interface BookingRequestCardProps {
  renterName: string;
  vehicleName: string;
  pickUpDate: string;
  returnDate: string;
  city: string;
  phoneNumber: string;
  status: string;
  bookingId: string;
  totalPrice: number;
  duration: number;
  onApprove?: (bookingId: string) => void;
  onDecline?: (bookingId: string) => void;
}

export default function BookingRequestCard({
  renterName,
  vehicleName,
  pickUpDate,
  returnDate,
  city,
  phoneNumber,
  status,
  bookingId,
  totalPrice,
  duration,
  onApprove,
  onDecline,
}: BookingRequestCardProps) {
  const handleApprove = async (bookingId: string) => {
    console.log("Booking ID in Approve Handler:", bookingId);
    try {
      const bookingRef = doc(
        db,
        firebaseConstants.collections.bookings,
        bookingId
      );
      await updateDoc(bookingRef, { status: "confirmed" });

      console.log("Booking approved and updated in Firestore!");

      // 🔹 notify parent to refresh UI
      onApprove?.(bookingId);
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

  const handleDecline = async (bookingId: string) => {
    console.log("Booking ID in Decline Handler:", bookingId);
    try {
      const bookingRef = doc(
        db,
        firebaseConstants.collections.bookings,
        bookingId
      );
      await updateDoc(bookingRef, { status: "cancelled" });

      console.log("Booking cancelled and updated in Firestore!");

      // 🔹 notify parent to refresh UI
      onDecline?.(bookingId);
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

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
        return { color: "orange", bgColor: "orange.0" };
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
    <Card mt="xl" withBorder radius="md" py="lg" px="sm">
      <Flex align="center" justify="space-between">
        <Flex w="12rem" gap="sm" align="center">
          <Avatar
            size="md"
            h="3rem"
            w="3rem"
            key={renterName}
            name={renterName}
            color="#ff0000ff"
          />
          <Stack gap={0} align="flex-start">
            <Text fz="12px" c="black" fw={600}>
              {vehicleName}
            </Text>
            <Flex gap="xs" align="center">
              <IconUser size={12} color="gray" />
              <Text fz="12px">{renterName}</Text>
            </Flex>
          </Stack>
        </Flex>
        <Flex>
          <Flex gap="xs" align="center">
            <IconCalendarEventFilled size={15} color="gray" />
            <Text fz="12px" w="10rem">
              {pickUpDate} - {returnDate}
            </Text>
          </Flex>
          <Flex gap="xs" align="center">
            <IconMapPin size={15} color="gray" />
            <Text fz="12px" w="6rem">
              {city}
            </Text>
          </Flex>
          <Flex gap="xs" align="center">
            <IconPhone size={15} color="gray" />
            <Text fz="12px" w="6rem">
              {phoneNumber}
            </Text>
          </Flex>
        </Flex>
        <Flex w="15rem" align="center" justify="space-between">
          <Stack gap="xs" align="center">
            <Text fz="12px" c="black" fw={600}>
              Pkr {totalPrice}
            </Text>
            <Badge
              variant="light"
              size="xs"
              c={color}
              bg={bgColor}
              styles={{
                root: {
                  textTransform: "lowercase",
                  minWidth: 80,
                  textAlign: "center",
                },
              }}
              fw={600}
            >
              {status}
            </Badge>
          </Stack>
          {status === "pending" ? (
            <Stack>
              <Button
                size="xs"
                bg="blue"
                fz="12px"
                onClick={() => handleApprove(bookingId!)}
              >
                Approve
              </Button>
              <Button
                fz="12px"
                size="xs"
                onClick={() => handleDecline(bookingId!)}
              >
                Decline
              </Button>
            </Stack>
          ) : (
            <Button
              size="xs"
              variant="light"
              color="indigo"
              fz="12px"
              leftSection={<IconEye size={12} color="blue" />}
              onClick={() => {
                BookingViewDetailModal({
                  userName: renterName,
                  number: phoneNumber,
                  vehicleName: vehicleName,
                  vehicleStatus: status,
                  startDate: pickUpDate,
                  endDate: returnDate,
                  price: totalPrice,
                  location: city,
                  duration: duration,
                });
              }}
            >
              View Details
            </Button>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
