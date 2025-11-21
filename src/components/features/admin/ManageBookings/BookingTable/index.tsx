// components/BookingTable.tsx
"use client";

import { Card, Skeleton, Text, Table, ScrollArea } from "@mantine/core";
import { BookingModel } from "@/features/booking/models/booking.model";
import { UserModel } from "@/features/user/models/user.model";
import BookingRow from "../BookingRow";

interface BookingTableProps {
  loading: boolean;
  bookings: (BookingModel & { renter?: UserModel | null })[];
}

export default function BookingTable({ loading, bookings }: BookingTableProps) {
  const headers = [
    { label: "Booking ID", width: "140px" },
    { label: "User", width: "200px" },
    { label: "Vehicle", width: "180px" },
    { label: "Date & Duration", width: "150px" },
    { label: "Status", width: "120px" },
    { label: "Payment", width: "130px" },
  ];

  if (loading) {
    return (
      <Card
        p={0}
        radius="md"
        style={{
          filter: "drop-shadow(0px 1px 2px #00000020)",
          overflow: "hidden",
          minWidth: "900px",
        }}
      >
        <ScrollArea>
          <Table>
            <Table.Thead>
              <Table.Tr>
                {headers.map((header, index) => (
                  <Table.Th
                    key={index}
                    style={{
                      backgroundColor: "#f9f9f9",
                      padding: "14px 16px",
                      borderBottom: "1px solid #eee",
                      width: header.width,
                      minWidth: header.width,
                    }}
                  >
                    <Text
                      fz="xs"
                      fw={600}
                      tt="uppercase"
                      ta={header.label === "Booking ID" ? "left" : "center"}
                    >
                      {header.label}
                    </Text>
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <Table.Tr key={index}>
                  {headers.map((_, cellIndex) => (
                    <Table.Td
                      key={cellIndex}
                      style={{
                        padding: "16px",
                        borderBottom: "1px solid #f2f2f2",
                      }}
                    >
                      <Skeleton height={20} radius="sm" />
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card
        p={0}
        radius="md"
        style={{
          filter: "drop-shadow(0px 1px 2px #00000020)",
          overflow: "hidden",
          minWidth: "900px",
        }}
      >
        <ScrollArea>
          <Table>
            <Table.Thead>
              <Table.Tr>
                {headers.map((header, index) => (
                  <Table.Th
                    key={index}
                    style={{
                      backgroundColor: "#f9f9f9",
                      padding: "14px 16px",
                      borderBottom: "1px solid #eee",
                      width: header.width,
                      minWidth: header.width,
                    }}
                  >
                    <Text
                      fz="xs"
                      fw={600}
                      tt="uppercase"
                      ta={header.label === "Booking ID" ? "left" : "center"}
                    >
                      {header.label}
                    </Text>
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
          </Table>
        </ScrollArea>
        <Text ta="center" py="xl" c="dimmed">
          No bookings found.
        </Text>
      </Card>
    );
  }

  return (
    <Card
      p={0}
      radius="md"
      style={{
        filter: "drop-shadow(0px 1px 2px #00000020)",
        overflow: "hidden",
        minWidth: "900px",
      }}
    >
      <ScrollArea>
        <Table>
          <Table.Thead>
            <Table.Tr>
              {headers.map((header, index) => (
                <Table.Th
                  key={index}
                  style={{
                    backgroundColor: "#a8a8a83e",
                    padding: "14px 16px",
                    borderBottom: "1px solid #eee",
                    width: header.width,
                    minWidth: header.width,
                  }}
                >
                  <Text
                    fz="xs"
                    fw={600}
                    tt="uppercase"
                    ta={header.label === "Booking ID" ? "left" : "center"}
                  >
                    {header.label}
                  </Text>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {bookings.map((booking) => (
              <BookingRow key={booking.bookingId} booking={booking} />
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
