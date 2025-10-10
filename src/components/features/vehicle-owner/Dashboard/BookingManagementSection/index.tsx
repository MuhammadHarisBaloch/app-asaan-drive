import {
  Badge,
  Card,
  Divider,
  Flex,
  Group,
  Loader,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import BookingRequestCard from "./BookingRequestCard";
import { data } from "@/constants/Data";
import { fetchOwnerVehicleBookings } from "@/features/booking";
import { BookingModel } from "@/features/booking/models/booking.model";
import { getUserDocument } from "@/features/user";
import { getAuth } from "firebase/auth";
import React from "react";
import BookingList from "./BookingList";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { listOwnerVehicleDocs } from "@/features/vehicle";
import { firebaseConstants } from "@/constants/Firestore";
import { db } from "@/networking/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { sendNotification } from "@/features/notification";

export default function BookingManagementSection() {
  const [value, setValue] = useState<string | null>("Upcoming");
  const [bookings, setBookings] = useState<BookingModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const user = getAuth().currentUser;
      if (!user) return;
      setLoading(true);

      const bookingsData = await fetchOwnerVehicleBookings(user.uid);

      const bookingsWithRenter = await Promise.all(
        (bookingsData ?? []).map(async (booking) => {
          const renter = await getUserDocument(booking.renterId);
          return { ...booking, renter };
        })
      );

      setBookings(bookingsWithRenter);
      setLoading(false);
    };

    fetchData();
  }, []);

  // helper function to update vehicle status in Firestore

  const updateVehicleStatus = async (
    vehicleId: string,
    status: "available" | "booked"
  ) => {
    try {
      const vehicleRef = doc(
        db,
        firebaseConstants.collections.vehicles,
        vehicleId
      );
      await updateDoc(vehicleRef, { status });
      console.log(`Vehicle ${vehicleId} status updated to ${status}`);
    } catch (error) {
      console.error("Error updating vehicle status:", error);
    }
  };

  const handleBookingApprove = async (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking?.vehicleId || !booking?.renterId) return;

    // 🔹 Local UI update
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "confirmed" } : b))
    );

    await updateVehicleStatus(booking.vehicleId, "booked");

    try {
      // 🔹 Firestore update
      const bookingRef = doc(
        db,
        firebaseConstants.collections.bookings,
        bookingId
      );
      await updateDoc(bookingRef, { status: "confirmed" });

      // 🔔 Notification for renter
      const ownerData = await getUserDocument(getAuth().currentUser?.uid);

      await sendNotification({
        userId: booking.renterId,
        title: "Booking Approved",
        message: `${
          ownerData?.fullName || "The owner"
        } has approved your booking for "${booking.vehicleName}".`,
        type: "booking",
      });

      console.log(`Booking ${bookingId} approved and renter notified.`);
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

  const handleBookingDecline = async (bookingId: string) => {
    console.log("Booking ID in Decline Handler:", bookingId);

    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking?.vehicleId) return;

    try {
      // 🔹 Local UI update (status: cancelled)
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );

      // 🔹 Firestore update
      const bookingRef = doc(
        db,
        firebaseConstants.collections.bookings,
        bookingId
      );
      await updateDoc(bookingRef, { status: "cancelled" });
      await updateVehicleStatus(booking.vehicleId, "available");

      console.log("Booking cancelled and updated in Firestore!");

      // 🔹 Notification to renter
      await sendNotification({
        userId: booking.renterId, // renter ko notify karna
        title: "Booking Declined",
        message: `Your booking for "${booking.vehicleName}" has been declined by the owner.`,
        type: "booking",
      });
      console.log("Notification sent to renter for declined booking");
    } catch (error) {
      console.error("Error declining booking:", error);
    }
  };

  if (loading) {
    return (
      <Group justify="center" align="center" mt="xl">
        <Loader color="red.4" size="lg" />
      </Group>
    );
  }
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
              statusFilter="active"
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
