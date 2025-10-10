import { Stack, Divider, Card, Flex, Badge, Text } from "@mantine/core";
import {
  IconUser,
  IconCar,
  IconCalendarEventFilled,
  IconMapPin,
  IconCurrencyDollar,
} from "@tabler/icons-react";

interface ModalContentProps {
  userName: string;
  number: string;
  vehicleName: string;
  vehicleStatus: string;
  duration: number;
  startDate: string;
  endDate: string;
  price: number;
  location: string;
}
  let color: string;
  let bgColor: string;
  export default function ModalContent({
    userName,
    number,
    vehicleName,
    vehicleStatus,
    startDate,
    duration,
    endDate,
    price,
    location,
  }: ModalContentProps) {
    switch (vehicleStatus) {
      case "cancelled":
        color = "red";
        bgColor = "pink.1";
        break;
      case "confirmed":
        color = "green";
        bgColor = "green.1";
        break;
      case "completed":
        color = "black";
        bgColor = "gray.1";
        break;
      case "active":
        color = "blue";
        bgColor = "blue.1";
        break;
      case "pending":
        color = "orange";
        bgColor = "orange.0";
        break;
      default:
        color = "transparent";
        bgColor = "transparent";
    }
    return (
      <Stack gap="lg" pb="lg">
        <Divider w="100%" />
        <Card
          bg="white.2"
          radius="md"
          p="lg"
          style={{ filter: "drop-shadow(1px 1px 2px #918d8d39)" }}
        >
          <Stack>
            <Flex align="center" gap="sm">
              <IconUser size={20} color="blue" />
              <Text fz="sm" c="black">
                Customer Information
              </Text>
            </Flex>
            <Flex align="center">
              <Stack w="50%" gap="xs">
                <Text fz="xs">Name</Text>
                <Text fz="sm" c="black" fw={500}>
                  {userName}
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text fz="xs">Phone</Text>
                <Text fz="sm" c="black" fw={500}>
                  {number}
                </Text>
              </Stack>
            </Flex>
          </Stack>
        </Card>
        <Card
          bg="white.2"
          radius="md"
          p="lg"
          style={{ filter: "drop-shadow(1px 1px 2px #918d8d39)" }}
        >
          <Stack>
            <Flex align="center" gap="sm">
              <IconCar size={20} color="blue" />
              <Text fz="sm" c="black">
                Vehicle Information
              </Text>
            </Flex>
            <Flex align="center">
              <Stack w="50%" gap="xs">
                <Text fz="xs">Vehicle</Text>
                <Text fz="sm" c="black" fw={500}>
                  {vehicleName}
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text fz="xs">Status</Text>
                <Badge
                  variant="light"
                  c={color}
                  bg={bgColor}
                  fw={500}
                  styles={{
                    root: {
                      textTransform: "lowercase",
                      textAlign: "center",
                    },
                  }}
                >
                  {vehicleStatus}
                </Badge>
              </Stack>
            </Flex>
          </Stack>
        </Card>
        <Card bg="white.2" radius="md" p="lg">
          <Stack>
            <Flex
              align="ce style={{filter:'drop-shadow(1px 1px 2px #918d8d39)'}}nter"
              gap="sm"
            >
              <IconCalendarEventFilled size={20} color="blue" />
              <Text fz="sm" c="black">
                Booking Information
              </Text>
            </Flex>
            <Stack>
              <Flex align="center">
                <Stack w="50%" gap="xs">
                  <Text fz="xs">Start Date</Text>
                  <Text fz="sm" c="black" fw={500}>
                    {startDate}
                  </Text>
                </Stack>
                <Stack
                  style={{ filter: "drop-shadow(1px 1px 2px #918d8d39)" }}
                  gap="xs"
                >
                  <Text fz="xs">End Date</Text>
                  <Text fz="sm" c="black" fw={500}>
                    {endDate}
                  </Text>
                </Stack>
              </Flex>
              <Flex align="center">
                <Stack w="50%" gap="xs">
                  <Text fz="xs">Duration</Text>
                  <Text fz="sm" c="black" fw={500}>
                    {duration} Day
                  </Text>
                </Stack>
                <Stack gap="xs">
                  <Text fz="xs">Total Amount</Text>
                  <Text fz="sm" c="black" fw={500}>
                    Rs: {price}
                  </Text>
                </Stack>
              </Flex>
            </Stack>
          </Stack>
        </Card>
        <Card
          bg="white.2"
          radius="md"
          p="lg"
          style={{ filter: "drop-shadow(1px 1px 2px #918d8d39)" }}
        >
          <Stack>
            <Flex align="center" gap="sm">
              <IconMapPin size={20} color="blue" />
              <Text fz="sm" c="black">
                Location Information
              </Text>
            </Flex>
            <Flex align="center">
              <Stack w="50%" gap="xs">
                <Text fz="xs">Pickup Location</Text>
                <Text fz="sm" c="black" fw={500}>
                  {location}
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text fz="xs">Dropoff Location</Text>
                <Text fz="sm" c="black" fw={500}>
                  {location}
                </Text>
              </Stack>
            </Flex>
          </Stack>
        </Card>
        <Card
          bg="white.2"
          radius="md"
          p="lg"
          style={{ filter: "drop-shadow(1px 1px 2px #918d8d39)" }}
        >
          <Stack>
            <Flex align="center" gap="sm">
              <IconCurrencyDollar size={20} color="blue" />
              <Text fz="sm" c="black">
                Payment Information
              </Text>
            </Flex>
            <Flex align="center">
              <Stack w="50%" gap="xs">
                <Text fz="xs">Total Amount</Text>
                <Text fz="sm" c="black" fw={500}>
                  PKR {price}
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text fz="xs">Payment Status</Text>
                <Badge
                  c="blue"
                  bg="blue.1"
                  fw={500}
                  styles={{
                    root: {
                      textTransform: "lowercase",
                      textAlign: "center",
                    },
                  }}
                >
                  paid
                </Badge>
              </Stack>
            </Flex>
          </Stack>
        </Card>
      </Stack>
    );
  }
