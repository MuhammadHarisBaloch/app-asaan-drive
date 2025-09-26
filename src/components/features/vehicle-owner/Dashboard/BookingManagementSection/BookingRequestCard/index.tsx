import { Badge, Button, Card, Center, Flex, Stack, Text } from "@mantine/core";
import {
  IconCalendarEventFilled,
  IconEye,
  IconMapPin,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import BookingViewDetailModal from "./BookingViewDetailsModal";
interface BookingRequestCardProps {
  profileName: string;
  userName: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  location: string;
  number: number;
  price: number;
  bookingRequestValue?: boolean;
  vehicleStatus: string;
}
export default function BookingRequestCard({
  profileName,
  userName,
  vehicleName,
  startDate,
  endDate,
  location,
  number,
  price,
  bookingRequestValue = false,
  vehicleStatus,
}: BookingRequestCardProps) {
  const [bookingRequest, setBookingRequest] = useState(bookingRequestValue);

  let color: string;

  switch (vehicleStatus) {
    case "cancelled":
      color = "#f20000";
      break;
    case "confirmed":
      color = "indigo";
      break;
    case "completed":
      color = "#7a7a7a";
      break;
    case "ongoing":
      color = "teal";
      break;
    default:
      color = "#ea7a26";
  }

  return (
    <Card mt="xl" withBorder radius="md" p="lg">
      <Flex align="center" justify="space-between">
        <Flex w="12rem" gap="sm" align="center">
          <Center h={50} w={50} bg="red.4" style={{ borderRadius: "50%" }}>
            <Text fz="md" c="white">
              {profileName}
            </Text>
          </Center>
          <Stack gap={0} align="flex-start">
            <Text fz="sm" c="black" fw={500}>
              {vehicleName}
            </Text>
            <Flex gap="xs">
              <IconUser size={15} color="gray" />
              <Text fz="12px">{userName}</Text>
            </Flex>
          </Stack>
        </Flex>
        <Flex>
          <Flex gap="xs" align="center">
            <IconCalendarEventFilled size={15} color="gray" />
            <Text fz="12px" w="9rem">
              {startDate} - {endDate}
            </Text>
          </Flex>
          <Flex gap="xs" align="center">
            <IconMapPin size={15} color="gray" />
            <Text fz="12px" w="6rem">
              {location}
            </Text>
          </Flex>
          <Flex gap="xs" align="center">
            <IconPhone size={15} color="gray" />
            <Text fz="12px" w="6rem">
              {number}
            </Text>
          </Flex>
        </Flex>
        <Flex w="15rem" align="center" justify="space-between">
          <Stack gap="xs" align="center">
            <Text fz="sm" c="black" fw={500}>
              Pkr {price}
            </Text>
            <Badge
              variant="light"
              color={color}
              styles={{
                root: {
                  textTransform: "lowercase",
                  minWidth: 80,
                  textAlign: "center",
                },
              }}
              fw={600}
            >
              {vehicleStatus}
            </Badge>
          </Stack>
          {bookingRequest === true ? (
            <Stack>
              <Button
                w="8rem"
                bg="blue"
                fz="xs"
                onClick={() => {
                  setBookingRequest(false);
                }}
              >
                Approve
              </Button>
              <Button fz="xs" w="8rem">
                Decline
              </Button>
            </Stack>
          ) : (
            <Button
              w="8rem"
              variant="light"
              color="indigo"
              fz="xs"
              leftSection={<IconEye size={15} color="blue" />}
              onClick={() => {
                BookingViewDetailModal({
                  userName,
                  number,
                  vehicleName,
                  vehicleStatus,
                  startDate,
                  endDate,
                  price,
                  location,
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
