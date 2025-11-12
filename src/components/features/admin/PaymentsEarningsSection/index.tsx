import {
  Badge,
  Card,
  Divider,
  Flex,
  Group,
  Loader,
  Stack,
  Table,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchAllBookings } from "@/features/booking";
import { BookingModel } from "@/features/booking/models/booking.model";
import { IconSearch } from "@tabler/icons-react";
import { getUserDocument } from "@/features/user"; // Add this import

export default function PaymentsEarningsSection() {
  const [bookings, setBookings] = useState<BookingModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const bookingsData = await fetchAllBookings();

      // Fetch renter data for each booking
      const bookingsWithRenter = await Promise.all(
        (bookingsData ?? []).map(async (booking) => {
          if (booking.renterId) {
            const renter = await getUserDocument(booking.renterId);
            return { ...booking, renter };
          }
          return booking;
        })
      );

      // Filter only completed payments and refunds
      const paymentBookings = bookingsWithRenter.filter(
        (booking) =>
          booking.status === "completed" ||
          booking.payment?.status === "refunded"
      );

      setBookings(paymentBookings);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Filter bookings based on search query
  const filteredBookings = bookings.filter((booking) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      booking.bookingId?.toLowerCase().includes(searchLower) ||
      booking.renter?.fullName?.toLowerCase().includes(searchLower) ||
      booking.renter?.email?.toLowerCase().includes(searchLower) ||
      booking.vehicleName?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <Group justify="center" align="center" mt="xl">
        <Loader color="red.4" size="lg" />
      </Group>
    );
  }

  return (
    <Stack p="lg" gap="xl">
      {/* Header Section */}
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Payments & Earnings
        </Text>
        <Text fz="12px">
          Manage payments and view earnings across the platform.
        </Text>
      </Stack>

      <Card
        p="xl"
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
      >
        <Stack gap="lg">
          {/* Payments Section Header */}
          <Stack gap={0}>
            <Text fz="lg" fw={600} c="black">
              Payments
            </Text>
          </Stack>

          {/* Search Bar */}
          <TextInput
            radius="md"
            placeholder="Search by transaction ID, user, or vehicle..."
            leftSection={
              <IconSearch style={{ width: rem(16), height: rem(16) }} />
            }
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
          />

          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="lg" highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th fz="12px" c="gray" fw={600}>
                    TRANSACTION
                  </Table.Th>
                  <Table.Th fz="12px" c="gray" fw={600}>
                    USER
                  </Table.Th>
                  <Table.Th fz="12px" c="gray" fw={600}>
                    VEHICLE
                  </Table.Th>
                  <Table.Th fz="12px" c="gray" fw={600}>
                    AMOUNT
                  </Table.Th>
                  <Table.Th fz="12px" c="gray" fw={600}>
                    METHOD
                  </Table.Th>
                  <Table.Th fz="12px" c="gray" fw={600}>
                    STATUS
                  </Table.Th>
                  <Table.Th fz="12px" c="gray" fw={600}>
                    DATE
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredBookings.map((booking) => (
                  <Table.Tr key={booking.bookingId}>
                    <Table.Td>
                      <Stack gap={2}>
                        <Text fw={600} fz="12px" c="red.4">
                          {booking.bookingId}
                        </Text>
                        <Text fz="10px" c="gray.6">
                          Booking #{booking.bookingId?.replace("TRX", "")}
                        </Text>
                      </Stack>
                    </Table.Td>
                    <Table.Td>
                      <Stack gap={2}>
                        <Text fw={600} fz="12px" c="black">
                          {booking.renter?.fullName || "N/A"}
                        </Text>
                        <Text fz="10px" c="gray.6">
                          {booking.renter?.email || "N/A"}
                        </Text>
                      </Stack>
                    </Table.Td>

                    <Table.Td>
                      <Stack gap={2}>
                        <Text fw={600} fz="12px" c="black">
                          {booking.vehicleName || "N/A"}
                        </Text>
                        <Text fz="10px" c="gray.6">
                          {booking.vehicleType === "bike"
                            ? "Bike"
                            : booking.vehicleType === "rickshaw"
                            ? "Rickshaw"
                            : booking.vehicleType || "Vehicle"}
                        </Text>
                      </Stack>
                    </Table.Td>

                    <Table.Td>
                      <Stack gap={2}>
                        <Text fw={600} fz="12px" c="black">
                          Rs. {booking.totalPrice?.toLocaleString() || "0"}
                        </Text>
                        <Flex gap="sm">
                          <Text fz="10px" c="gray.6">
                            Fee Rs.{" "}
                            {booking.platformFee?.toLocaleString() || "0"}
                          </Text>
                          <Divider orientation="vertical" size="sm" />
                          <Text fz="10px" c="gray.6">
                            Owner: Rs.{" "}
                            {(
                              (booking.totalPrice || 0) -
                              (booking.platformFee || 0)
                            ).toLocaleString()}
                          </Text>
                        </Flex>
                      </Stack>
                    </Table.Td>

                    <Table.Td>
                      <Badge
                        c="blue"
                        bg="blue.1"
                        fw={500}
                        styles={{
                          root: {
                            textAlign: "center",
                            textTransform: "lowercase",
                          },
                        }}
                      >
                        {booking.payment?.method || "card"}
                      </Badge>
                    </Table.Td>

                    <Table.Td>
                      <Badge
                        c={
                          booking.payment?.status === "refunded"
                            ? "red"
                            : "green"
                        }
                        bg={
                          booking.payment?.status === "refunded"
                            ? "pink.1"
                            : "green.1"
                        }
                        fw={500}
                        styles={{
                          root: {
                            textAlign: "center",
                            textTransform: "lowercase",
                          },
                        }}
                      >
                        {booking.payment?.status === "refunded"
                          ? "refunded"
                          : "completed"}
                      </Badge>
                    </Table.Td>

                    <Table.Td>
                      <Text fz="12px">
                        {booking.pickUpDate
                          ? new Date(booking.pickUpDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>

          {filteredBookings.length === 0 && (
            <Group justify="center" py="xl">
              <Text c="gray.6">No transactions found</Text>
            </Group>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}
