import { Badge, Card, Divider, Flex, Stack, Tabs, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import BookingRequestCard from "./BookingRequestCard";
import { data } from "@/constants/Data";
import { fetchOwnerVehicleBookings } from "@/features/booking";
import { BookingModel } from "@/features/booking/models/booking.model";
import { getUserDocument } from "@/features/user";
import { getAuth } from "firebase/auth";
import React from "react";
import BookingList from "./BookingList";

export default function BookingManagementSection() {
  const [value, setValue] = useState<string | null>("Upcoming");
  const [bookings, setBookings] = useState<BookingModel[]>([]);

  useEffect(() => {
    const listOwnerBookings = async () => {
      const user = getAuth().currentUser;
      if (!user) return;

      // 🔹 pehle fetch karo
      const bookings = await fetchOwnerVehicleBookings(user.uid);

      // 🔹 phir renter data merge karo
      const bookingsWithRenter = await Promise.all(
        (bookings ?? []).map(async (booking) => {
          const renter = await getUserDocument(booking.renterId);
          return { ...booking, renter };
        })
      );

      setBookings(bookingsWithRenter);
      console.log("Bookings with renter:", bookingsWithRenter);
    };

    listOwnerBookings();
  }, []);
  const handleBookingApprove = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "confirmed" } : b))
    );
  };
  const handleBookingDecline = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b))
    );
  };

  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Booking Management
        </Text>
        <Text fz="12px">Track and manage all your vehicle bookings</Text>
      </Stack>
      <Card
        p="xl"
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
      >
        <Tabs variant="none" value={value} onChange={setValue}>
          <Tabs.List grow className="list">
            {data.vehicleOwner.dashboard.BookingManagement.tabList.map(
              (data, index) => {
                return (
                  <Tabs.Tab key={index} value={data.value} className="tab">
                    <Flex align="center" justify="center" gap="sm">
                      {data.icon}
                      {data.value}
                      <Badge size="lg" fw={500} color="gray.1" c="gray" circle>
                        {data.notificationValue}
                      </Badge>
                    </Flex>
                  </Tabs.Tab>
                );
              }
            )}
          </Tabs.List>
          <Divider w="100%" />
          <Tabs.Panel value="Upcoming">
            <BookingList
              bookings={bookings}
              statusFilter={["pending", "confirmed"]}
              onApprove={handleBookingApprove}
              onDecline={handleBookingDecline}
            />
          </Tabs.Panel>

          <Tabs.Panel value="Ongoing">
            <BookingList
              bookings={bookings}
              statusFilter="ongoing"
              onApprove={handleBookingApprove}
              onDecline={handleBookingDecline}
            />
          </Tabs.Panel>

          <Tabs.Panel value="Completed">
            <BookingList
              bookings={bookings}
              statusFilter="completed"
              onApprove={handleBookingApprove}
              onDecline={handleBookingDecline}
            />
          </Tabs.Panel>

          <Tabs.Panel value="Cancelled">
            <BookingList
              bookings={bookings}
              statusFilter="cancelled"
              onApprove={handleBookingApprove}
              onDecline={handleBookingDecline}
            />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Stack>
  );
}
