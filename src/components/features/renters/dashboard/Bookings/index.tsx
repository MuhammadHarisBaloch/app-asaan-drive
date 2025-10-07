import {
  Card,
  Center,
  Divider,
  Flex,
  Group,
  Input,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { data } from "@/constants/Data";
import BookingCard from "./BookingCard";
import { fetchBookingDocs } from "@/features/booking";
import { BookingModel } from "@/features/booking/models/booking.model";
import { getAuth } from "firebase/auth";
export interface BookingStats {
  activeRentals: number;
  upcomingBookings: number;
  pendingRequests: number;
  totalSpent: number;
}

interface BookingsSectionProps {
  onStatsUpdate?: (stats: BookingStats) => void;
}
export default function BookingsSection({
  onStatsUpdate,
}: BookingsSectionProps) {
  const [bookingsFilter, setBookingsFilter] = useState<string | null>(
    "all status"
  );
  const [bookings, setBookings] = useState<BookingModel[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const user = getAuth().currentUser;
      if (!user) return;
      const bookings = await fetchBookingDocs(user.uid);
      return bookings;
    };

    fetchBookings().then((bookings) => {
      console.log("Recently Bookings", bookings);
      setBookings(bookings ?? []);
    });
  }, []);

  // 🔹 Calculate dynamic counts
  useEffect(() => {
    if (onStatsUpdate) {
      const stats: BookingStats = {
        activeRentals: bookings.filter((b) => b.status === "active").length,
        upcomingBookings: bookings.filter((b) => b.status === "confirmed")
          .length,
        pendingRequests: bookings.filter((b) => b.status === "pending").length,
        totalSpent: bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0),
      };
      onStatsUpdate(stats);
    }
  }, [bookings, onStatsUpdate]);

  return (
    <Stack p="lg" gap="xxl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          My Bookings
        </Text>
        <Text fz="12px">Manage your vehicle reservations</Text>
      </Stack>
      <Card
        w="100%"
        p="xl"
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 2px #00000068)" }}
      >
        <Stack gap="xxl">
          <Group justify="space-between">
            <Input
              radius="md"
              leftSection={<IconSearch size={15} color="gray" />}
              placeholder="Search bookings..."
            />
            <Flex gap="sm" align="center">
              <IconFilter size={20} color="gray" />
              <Select
                w="10rem"
                radius="md"
                data={[
                  "all status",
                  "active",
                  "confirmed",
                  "pending",
                  "completed",
                  "cancelled",
                ]}
                value={bookingsFilter}
                onChange={setBookingsFilter}
              />
            </Flex>
          </Group>
          <Stack gap="lg">
            {/* Header */}
            <Group px="lg" align="center">
              {data.renter.dashboard.myBookings.headerColumns.map((col, i) => (
                <Text
                  key={i}
                  fz="xs"
                  fw={600}
                  c="black"
                  style={{ flex: col.flex }}
                  ta={col.align}
                >
                  {col.label}
                </Text>
              ))}
            </Group>
            <Divider w="100%" />
            {bookings.map((booking, i) => {
              return (
                <React.Fragment key={i}>
                  {bookingsFilter === booking.status ? (
                    <BookingCard
                      key={i}
                      vehiclePhotos={booking.vehiclePhotos[0]}
                      vehicleName={booking.vehicleName ?? ""}
                      vehicleType={booking.vehicleType ?? ""}
                      pickUpDate={booking.pickUpDate ?? ""}
                      returnDate={booking.returnDate ?? ""}
                      status={booking.status}
                      totalPrice={booking.totalPrice}
                    />
                  ) : bookingsFilter === "all status" ? (
                    <BookingCard
                      key={i}
                      vehiclePhotos={booking.vehiclePhotos[0]}
                      vehicleName={booking.vehicleName ?? ""}
                      vehicleType={booking.vehicleType ?? ""}
                      pickUpDate={booking.pickUpDate ?? ""}
                      returnDate={booking.returnDate ?? ""}
                      status={booking.status}
                      totalPrice={booking.totalPrice}
                    />
                  ) : null}
                </React.Fragment>
              );
            })}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
