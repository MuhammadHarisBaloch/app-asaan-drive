// components/ManageBookings.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  Input,
  Stack,
  Text,
  Group,
  Select,
  Badge,
  ScrollArea,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { BookingModel } from "@/features/booking/models/booking.model";
import { db } from "@/networking/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { firebaseConstants } from "@/constants/Firestore";
import { UserModel } from "@/features/user/models/user.model";
import BookingTable from "./BookingTable";

export default function ManageBookings() {
  const [bookings, setBookings] = useState<
    (BookingModel & { renter?: UserModel | null })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // ✅ Firestore Snapshot Listener for Bookings
  useEffect(() => {
    setMounted(true);

    // Don't run Firestore operations during build
    if (typeof window === "undefined") return;

    const bookingsRef = collection(db, firebaseConstants.collections.bookings);

    const unsub = onSnapshot(
      bookingsRef,
      async (snapshot) => {
        try {
          // Dynamically import to avoid server-side dependencies
          const { getUserDocument } = await import("@/features/user");

          const bookingsData = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const data = doc.data() as BookingModel;

              const renterData = data.renterId
                ? await getUserDocument(data.renterId)
                : null;

              return {
                ...data,
                id: doc.id,
                renter: renterData,
              };
            })
          );

          setBookings(bookingsData);
        } catch (error) {
          console.error("Error processing bookings snapshot:", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Bookings snapshot error:", error);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  // 🔍 Search + Status Filter + Sorting
  const filteredBookings = useMemo(() => {
    let filtered = bookings;

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter((b) => {
        return (
          b.bookingId?.toLowerCase().includes(query) ||
          b.vehicleName?.toLowerCase().includes(query) ||
          b.renter?.fullName?.toLowerCase().includes(query) ||
          b.renter?.email?.toLowerCase().includes(query)
        );
      });
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    // Sorting: Pending bookings first, then by pickUpDate (latest first)
    return filtered.sort((a, b) => {
      // Pending bookings ko top pe rakho
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;

      // PickUpDate se sort karo (latest first)
      const getDate = (booking: BookingModel) => {
        if (booking.pickUpDate) {
          return new Date(booking.pickUpDate);
        }
        // Agar pickUpDate nahi hai toh returnDate try karo
        if (booking.returnDate) {
          return new Date(booking.returnDate);
        }
        // Default: old date
        return new Date(0);
      };

      const dateA = getDate(a);
      const dateB = getDate(b);

      return dateB.getTime() - dateA.getTime(); // Latest first
    });
  }, [bookings, search, statusFilter]);

  // Status counts for badges
  const statusCounts = useMemo(() => {
    const counts = {
      pending: 0,
      confirmed: 0,
      active: 0,
      completed: 0,
      cancelled: 0,
    };

    bookings.forEach((booking) => {
      if (booking.status && counts.hasOwnProperty(booking.status)) {
        counts[booking.status as keyof typeof counts]++;
      }
    });

    return counts;
  }, [bookings]);

  // Don't render during build/SSR
  if (!mounted) {
    return (
      <Stack p="md" gap="lg" style={{ maxWidth: "100%", overflow: "hidden" }}>
        <Stack gap={0}>
          <Text fz="xl" fw={600} c="black">
            Manage Bookings
          </Text>
          <Text fz="sm" c="dimmed">
            Loading bookings...
          </Text>
        </Stack>
        <Card
          py="lg"
          px="xl"
          radius="md"
          style={{ filter: "drop-shadow(0px 1px 2px #00000020)" }}
        >
          <Group gap="md" wrap="nowrap">
            <Input
              flex={1}
              size="md"
              radius="md"
              placeholder="Search bookings, users or vehicles..."
              leftSection={<IconSearch color="gray" size={20} />}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <Select
              placeholder="Filter by status"
              value={statusFilter}
              onChange={setStatusFilter}
              data={[
                { value: "pending", label: "Pending" },
                { value: "confirmed", label: "Confirmed" },
                { value: "active", label: "Active" },
                { value: "completed", label: "Completed" },
                { value: "cancelled", label: "Cancelled" },
              ]}
              clearable
            />
          </Group>
        </Card>
        <BookingTable loading={true} bookings={[]} />
      </Stack>
    );
  }

  return (
    <Stack p="md" gap="lg" style={{ maxWidth: "100%", overflow: "hidden" }}>
      {/* 🔹 Header */}
      <Stack gap={0}>
        <Text fz="xl" fw={600} c="black">
          Manage Bookings
        </Text>
        <Text fz="md">View and manage all bookings on the platform.</Text>

        {/* Status Count Badges */}
        <ScrollArea>
          <Group gap="xs" mt="sm" wrap="nowrap">
            <Badge
              c="orange.3"
              bg="orange.0"
              size="lg"
              fw={500}
              styles={{
                root: { textAlign: "center", textTransform: "lowercase" },
              }}
            >
              Pending: {statusCounts.pending}
            </Badge>
            <Badge
              c="green"
              bg="green.1"
              size="lg"
              fw={500}
              styles={{
                root: { textAlign: "center", textTransform: "lowercase" },
              }}
            >
              Confirmed: {statusCounts.confirmed}
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
              Active: {statusCounts.active}
            </Badge>
            <Badge
              c="bkack"
              bg="gray.2"
              size="lg"
              fw={500}
              styles={{
                root: { textAlign: "center", textTransform: "lowercase" },
              }}
            >
              Completed: {statusCounts.completed}
            </Badge>
            <Badge
              c="red"
              bg="pink.1"
              size="lg"
              fw={500}
              styles={{
                root: { textAlign: "center", textTransform: "lowercase" },
              }}
            >
              Cancelled: {statusCounts.cancelled}
            </Badge>
          </Group>
        </ScrollArea>
      </Stack>

      {/* 🔹 Search & Filter Card */}
      <Card
        py="lg"
        px="xl"
        radius="md"
        style={{ filter: "drop-shadow(0px 1px 2px #00000020)" }}
      >
        <Group gap="md" wrap="nowrap">
          <Input
            flex={1}
            size="md"
            radius="md"
            placeholder="Search bookings, users or vehicles..."
            leftSection={<IconSearch color="gray" size={20} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />

          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={setStatusFilter}
            data={[
              { value: "pending", label: "Pending" },
              { value: "confirmed", label: "Confirmed" },
              { value: "active", label: "Active" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" },
            ]}
            clearable
          />
        </Group>
      </Card>

      {/* 🔹 Table with proper scrolling */}
      <div style={{ width: "100%", overflow: "hidden" }}>
        <BookingTable loading={loading} bookings={filteredBookings} />
      </div>
    </Stack>
  );
}
