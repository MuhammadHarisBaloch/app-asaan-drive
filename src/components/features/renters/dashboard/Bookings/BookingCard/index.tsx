import { fetchBookingDocs } from "@/features/booking";
import { BookingModel } from "@/features/booking/models/booking.model";
import {
  Group,
  Flex,
  Stack,
  Center,
  Divider,
  Text,
  Badge,
} from "@mantine/core";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BookingCard() {
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

  const getStatusStyle = (status: string) => {
    if (!status) {
      return { color: "transparent", bgColor: "transparent" }; // fallback agar status missing ho
    }
    switch (status.toLowerCase()) {
      case "active":
        return { color: "blue", bgColor: "blue.1" };
      case "confirmed":
        return { color: "green", bgColor: "green.1" };
      case "pending":
        return { color: "red", bgColor: "pink.1" };
      case "completed":
        return { color: "black", bgColor: "gray.1" };
      case "cancelled":
        return { color: "red", bgColor: "red.1" };
      default:
        return { color: "transparent", bgColor: "transparent" };
    }
  };

  return (
    <>
      {bookings.map((booking, i) => {
        const { color, bgColor } = getStatusStyle(booking.status);
        return (
          <>
            <Group key={i} px="lg" align="center">
              {/* Vehicle column special case */}
              <Flex gap="md" align="center" style={{ flex: 2 }}>
                <Image
                  height={100}
                  width={100}
                  src={booking.vehiclePhotos[0]}
                  alt={booking.vehicleName ?? "Vehicle"}
                  style={{
                    height: "40%",
                    width: "40%",
                    borderRadius: "5px",
                  }}
                />
                <Stack gap={2}>
                  <Text fz="xs" fw={600} c="black">
                    {booking.vehicleName}
                  </Text>
                  <Text fz="12px">{booking.vehicleType}</Text>
                </Stack>
              </Flex>

              {/* Other columns */}
              <Text fz="12px" style={{ flex: 1, textAlign: "center" }}>
                {booking.pickUpDate}
              </Text>
              <Text fz="12px" style={{ flex: 1, textAlign: "center" }}>
                {booking.returnDate}
              </Text>
              <Badge
                c={color}
                bg={bgColor}
                fw={500}
                styles={{
                  root: { textAlign: "center", textTransform: "lowercase" },
                }}
                style={{ flex: 0.8 }}
              >
                {booking.status}
              </Badge>
              <Text
                fz="xs"
                fw={600}
                c="black"
                style={{ flex: 1, textAlign: "right" }}
              >
                Rs: {booking.totalPrice}
              </Text>
            </Group>
            <Divider w="100%" />
          </>
        );
      })}
    </>
  );
}
