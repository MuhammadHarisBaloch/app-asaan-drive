import {
  Badge,
  Card,
  Divider,
  Flex,
  Group,
  Skeleton,
  Stack,
  Table,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { BookingModel } from "@/features/booking/models/booking.model";
import { IconSearch } from "@tabler/icons-react";
import { getUserDocument } from "@/features/user";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/networking/firebase";
import { firebaseConstants } from "@/constants/Firestore";

export default function PaymentsEarningsSection() {
  const [bookings, setBookings] = useState<BookingModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Create query for completed and refunded bookings
      const q = query(
        collection(db, firebaseConstants.collections.bookings),
        where("status", "in", ["completed", "cancelled"])
      );

      // Set up real-time listener
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const bookingsData: BookingModel[] = [];

        // First get all bookings
        querySnapshot.forEach((doc) => {
          bookingsData.push({
            id: doc.id,
            ...doc.data(),
          } as unknown as BookingModel);
        });

        // Then fetch renter data for each booking
        const bookingsWithRenter = await Promise.all(
          bookingsData.map(async (booking) => {
            if (booking.renterId) {
              try {
                const renter = await getUserDocument(booking.renterId);
                return { ...booking, renter };
              } catch (error) {
                console.error(
                  `Error fetching renter for ${booking.renterId}:`,
                  error
                );
                return booking;
              }
            }
            return booking;
          })
        );

        // Filter only payments that are completed or refunded
        const paymentBookings = bookingsWithRenter.filter(
          (booking) =>
            booking.status === "completed" ||
            booking.payment?.status === "refunded"
        );

        setBookings(paymentBookings);
        setLoading(false);
      });

      // Cleanup function
      return () => unsubscribe();
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

  // Skeleton Rows
  const skeletonRows = Array(5)
    .fill(0)
    .map((_, index) => (
      <Table.Tr key={index}>
        <Table.Td>
          <Stack gap={2}>
            <Skeleton height={16} width={120} />
            <Skeleton height={12} width={80} />
          </Stack>
        </Table.Td>
        <Table.Td>
          <Stack gap={2}>
            <Skeleton height={16} width={100} />
            <Skeleton height={12} width={120} />
          </Stack>
        </Table.Td>
        <Table.Td>
          <Stack gap={2}>
            <Skeleton height={16} width={90} />
            <Skeleton height={12} width={60} />
          </Stack>
        </Table.Td>
        <Table.Td>
          <Stack gap={2}>
            <Skeleton height={16} width={70} />
            <Flex gap="sm">
              <Skeleton height={12} width={50} />
              <Divider orientation="vertical" size="sm" />
              <Skeleton height={12} width={60} />
            </Flex>
          </Stack>
        </Table.Td>
        <Table.Td>
          <Skeleton height={24} width={50} radius="xl" />
        </Table.Td>
        <Table.Td>
          <Skeleton height={24} width={70} radius="xl" />
        </Table.Td>
        <Table.Td>
          <Skeleton height={16} width={100} />
        </Table.Td>
      </Table.Tr>
    ));

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

          <Text fz="lg" fw={600} c="black">
            Payments
          </Text>

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
                {loading
                  ? skeletonRows
                  : filteredBookings.map((booking) => (
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

          {!loading && filteredBookings.length === 0 && (
            <Group justify="center" py="xl">
              <Text c="gray.6">No transactions found</Text>
            </Group>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}
