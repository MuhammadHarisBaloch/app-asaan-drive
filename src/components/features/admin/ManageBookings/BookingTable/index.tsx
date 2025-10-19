// components/BookingTable.tsx
"use client";

import { Card, Skeleton, Text } from "@mantine/core";
import { BookingModel } from "@/features/booking/models/booking.model";
import { UserModel } from "@/features/user/models/user.model";
import BookingRow from "../BookingRow";

interface BookingTableProps {
  loading: boolean;
  bookings: (BookingModel & { renter?: UserModel | null })[];
}

export default function BookingTable({ loading, bookings }: BookingTableProps) {
  const headers = [
    "Booking ID",
    "User",
    "Vehicle",
    "Date & Duration",
    "Status",
    "Payment",
  ];

  // ✅ grid layout same as before
  const gridHeaderTemplate = "160px 220px 230px 110px 100px 100px";
  const gridRowTemplate = "200px 210px 210px 100px 100px 100px";

  return (
    <Card
      p={0}
      radius="md"
      style={{
        filter: "drop-shadow(0px 1px 2px #00000020)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridHeaderTemplate,
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          padding: "14px 24px",
          borderBottom: "1px solid #eee",
        }}
      >
        {headers.map((h, i) => (
          <Text
            key={i}
            fz="xs"
            fw={600}
            tt="capitalize"
            ta={h === "Booking ID" ? "start" : "center"}
          >
            {h}
          </Text>
        ))}
      </div>

      {/* Rows */}
      {loading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: gridRowTemplate,
              alignItems: "center",
              padding: "16px 24px",
              borderBottom: "1px solid #f2f2f2",
            }}
          >
            {Array.from({ length: 6 }).map((_, j) => (
              <Skeleton key={j} height={20} radius="sm" />
            ))}
          </div>
        ))
      ) : bookings.length === 0 ? (
        <Text ta="center" py="xl" c="dimmed">
          No bookings found.
        </Text>
      ) : (
        bookings.map((b) => (
          <BookingRow
            key={b.bookingId}
            booking={b}
            gridTemplate={gridRowTemplate}
          />
        ))
      )}
    </Card>
  );
}
