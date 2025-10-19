"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, Input, Stack, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { BookingModel } from "@/features/booking/models/booking.model";
import { db } from "@/networking/firebase";
import { collection, getDocs } from "firebase/firestore";
import { firebaseConstants } from "@/constants/Firestore";
import { UserModel } from "@/features/user/models/user.model";
import { getUserDocument } from "@/features/user";
import BookingTable from "./BookingTable";

export default function ManageBookings() {
  const [bookings, setBookings] = useState<
    (BookingModel & { renter?: UserModel | null })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ✅ Fetch bookings + renter data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const snap = await getDocs(
          collection(db, firebaseConstants.collections.bookings)
        );

        const bookingsData = await Promise.all(
          snap.docs.map(async (b) => {
            const data = b.data() as BookingModel;

            const renterData = data.renterId
              ? await getUserDocument(data.renterId)
              : null;

            return {
              ...data,
              id: b.id,
              renter: renterData,
            };
          })
        );

        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // 🔍 Search filter
  const filteredBookings = useMemo(() => {
    const query = search.toLowerCase();
    return bookings.filter((b) => {
      return (
        b.bookingId?.toLowerCase().includes(query) ||
        b.vehicleName?.toLowerCase().includes(query) ||
        b.renter?.fullName?.toLowerCase().includes(query)
      );
    });
  }, [bookings, search]);

  return (
    <Stack p="lg" gap="xl">
      {/* 🔹 Header */}
      <Stack gap={0}>
        <Text fz="xl" fw={600} c="black">
          Manage Bookings
        </Text>
        <Text fz="md" c="dimmed">
          View and manage all bookings on the platform.
        </Text>
      </Stack>

      {/* 🔹 Search Card */}
      <Card
        py="lg"
        px="xl"
        radius="md"
        style={{ filter: "drop-shadow(0px 1px 2px #00000020)" }}
      >
        <Input
          w="100%"
          size="md"
          radius="md"
          placeholder="Search bookings, users or vehicles..."
          leftSection={<IconSearch color="gray" size={20} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Card>

      <BookingTable loading={loading} bookings={filteredBookings} />
    </Stack>
  );
}
