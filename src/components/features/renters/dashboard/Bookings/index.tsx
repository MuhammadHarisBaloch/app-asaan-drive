import {
  Card,
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
import { BookingModel } from "@/features/booking/models/booking.model";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/networking/firebase";
import PaymentAutoHandler from "@/utils/PaymentWatcher";
import { firebaseConstants } from "@/constants/Firestore";

export interface BookingStats {
  activeRentals: number;
  upcomingBookings: number;
  pendingRequests: number;
  totalSpent: number;
  totalRefund: number;
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

  // 🔹 Real-time Firestore listener (renter's own bookings)
  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) return;

    const q = query(
      collection(db, firebaseConstants.collections.bookings),
      where("renterId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({
        bookingId: d.id,
        ...d.data(),
      })) as BookingModel[];

      console.log("🔄 Live bookings update:", list);
      setBookings(list);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Dynamic stats (CORRECT LOGIC - Aapke flow ke hisaab se)
  useEffect(() => {
    if (!onStatsUpdate) return;

    // ✅ TOTAL SPENT: All bookings jo pay ki gayi hain (hold + released)
    const totalAllPayments = bookings
      .filter(
        (b) =>
          b.payment?.status === "hold" ||
          b.payment?.status === "released" ||
          b.payment?.status === "refunded" // ✅ Refunded bhi initially pay kiye the
      )
      .reduce((sum, b) => sum + (b.payment?.amount || 0), 0);

    // ✅ REFUND: Sirf refunded payments
    const totalRefund = bookings
      .filter((b) => b.payment?.status === "refunded")
      .reduce((sum, b) => sum + (b.payment?.amount || 0), 0);

    // ✅ NET SPENT: Total sab payments minus refunds
    const netSpent = totalAllPayments - totalRefund;

    const stats: BookingStats = {
      activeRentals: bookings.filter((b) => b.status === "active").length,
      upcomingBookings: bookings.filter((b) => b.status === "confirmed").length,
      pendingRequests: bookings.filter((b) => b.status === "pending").length,
      totalSpent: netSpent > 0 ? netSpent : 0,
      totalRefund,
    };

    console.log("💰 CORRECT Stats Calculation:", {
      totalAllPayments,
      totalRefund,
      netSpent,
      bookings: bookings.map((b) => ({
        id: b.bookingId,
        status: b.status,
        paymentStatus: b.payment?.status,
        amount: b.payment?.amount,
      })),
    });

    onStatsUpdate(stats);
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
          {/* 🔍 Filters */}
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

          {/* 🔹 Table Header */}
          <Stack gap="lg">
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

            {/* 🔹 Booking List */}
            {bookings.map((booking, i) => {
              const isVisible =
                bookingsFilter === "all status" ||
                bookingsFilter === booking.status;

              return (
                isVisible && (
                  <React.Fragment key={i}>
                    {/* 👇 Auto release/refund logic */}
                    <PaymentAutoHandler bookingId={booking.bookingId ?? ""} />

                    <BookingCard
                      vehiclePhotos={booking.vehiclePhotos?.[0]}
                      vehicleName={booking.vehicleName ?? ""}
                      vehicleType={booking.vehicleType ?? ""}
                      pickUpDate={booking.pickUpDate ?? ""}
                      returnDate={booking.returnDate ?? ""}
                      status={booking.status}
                      totalPrice={booking.totalPrice}
                    />
                  </React.Fragment>
                )
              );
            })}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
