import { fetchBookingDocs } from "@/features/booking";
import { BookingModel } from "@/features/booking/models/booking.model";
import { Card, Group, Flex, Stack, Text, Badge } from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RecentBookingCard() {
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
        return { color: "red", bgColor: "pink.1" };
      default:
        return { color: "transparent", bgColor: "transparent" };
    }
  };

  return (
    <>
      {bookings.map((booking, i) => {
        const { color, bgColor } = getStatusStyle(booking.status);
        return (
          <Card
            key={i}
            w="100%"
            px="xl"
            py="lg"
            radius="md"
            bg="white.2"
            style={{ filter: "drop-shadow(1px 1px 2px #78787846)" }}
          >
            <Flex justify="space-between" align="center">
              <Flex gap="md" align="center">
                <Image
                  src={booking.vehiclePhotos[0]}
                  alt={booking.vehicleName ?? "-"}
                  height={60}
                  width={100}
                  style={{
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
                <Stack gap="xxs">
                  <Text fz="xs" c="black" fw={600}>
                    {booking.vehicleName}
                  </Text>
                  <Flex gap="sm" align="center">
                    <Text fz="12px">{booking.pickUpDate}</Text>
                    <IconPointFilled size={10} color="gray" />
                    <Text fz="12px">{booking.returnDate}</Text>
                  </Flex>
                </Stack>
              </Flex>
              <Flex w="30%" gap="md" justify="flex-end">
                <Badge
                  c={color}
                  bg={bgColor}
                  fw={500}
                  styles={{
                    root: {
                      textAlign: "center",
                      textTransform: "lowercase",
                    },
                  }}
                >
                  {booking.status}
                </Badge>
                <Text fz="xs" c="black" fw={600}>
                  Rs: {booking.totalPrice}
                </Text>
              </Flex>
            </Flex>
          </Card>
        );
      })}
    </>
  );
}
