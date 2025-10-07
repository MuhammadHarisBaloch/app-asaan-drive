import {
  Card,
  Center,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconArrowRight,
  IconCalendarEventFilled,
  IconCar,
  IconClock,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { getUserDocument } from "@/features/user";
import { UserModel } from "@/features/user/models/user.model";
import EmergencyModal from "../EmergencyModal";
import RecentBookingCard from "./RecentBookingCard";

// 👇 import BookingsSection and BookingStats
import BookingsSection, { BookingStats } from "./Bookings";

export default function DashboardSection() {
  const [user, setUser] = useState<UserModel | null>(null);
  const [stats, setStats] = useState<BookingStats>({
    activeRentals: 0,
    upcomingBookings: 0,
    pendingRequests: 0,
    totalSpent: 0,
  });

  const auth = getAuth();

  useEffect(() => {
    const fetchUser = async (id: string) => {
      const userData = await getUserDocument(id);
      setUser(userData);
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUser(user.uid);
      }
    });
  }, []);

  return (
    <Stack p="lg" gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Text fz="xl" c="black" fw={600}>
            Welcome {user?.fullName ?? ""}!
          </Text>
          <Text fz="12px">Here's what's happening with your rentals</Text>
        </Stack>
        {stats.activeRentals > 0 && (
          <Flex align="center" gap="lg">
            <Text fz="lg" c="red.4" fw={600}>
              For Any Emergency
            </Text>
            <IconArrowRight size={25} color="red" />
            <Center
              className="hover-pointer"
              h={60}
              w={60}
              bg="red.4"
              style={{ borderRadius: "50%" }}
              onClick={() => EmergencyModal()}
            >
              <IconAlertTriangle size={30} color="white" />
            </Center>
          </Flex>
        )}
      </Group>

      {/* 🔹 Overview Cards with dynamic stats */}
      <SimpleGrid cols={4} spacing="lg">
        <Card
          w="100%"
          px="lg"
          radius="md"
          style={{ filter: "drop-shadow(1px 1px 2px #00000068)" }}
        >
          <Flex gap="md">
            <Center h={30} w={30} bg="blue.1" style={{ borderRadius: "5px" }}>
              <IconCar size={15} color="blue" />
            </Center>
            <Stack gap="xs">
              <Text fz="12px">Active Rentals</Text>
              <Text fz="xs" c="black" fw={600}>
                {stats.activeRentals}
              </Text>
            </Stack>
          </Flex>
        </Card>

        <Card
          w="100%"
          px="lg"
          radius="md"
          style={{ filter: "drop-shadow(1px 1px 2px #00000068)" }}
        >
          <Flex gap="md">
            <Center h={30} w={30} bg="green.1" style={{ borderRadius: "5px" }}>
              <IconCalendarEventFilled size={15} color="green" />
            </Center>
            <Stack gap="xs">
              <Text fz="12px">Upcoming Bookings</Text>
              <Text fz="xs" c="black" fw={600}>
                {stats.upcomingBookings}
              </Text>
            </Stack>
          </Flex>
        </Card>

        <Card
          w="100%"
          px="lg"
          radius="md"
          style={{ filter: "drop-shadow(1px 1px 2px #00000068)" }}
        >
          <Flex gap="md">
            <Center h={30} w={30} bg="pink.1" style={{ borderRadius: "5px" }}>
              <IconClock size={15} color="red" />
            </Center>
            <Stack gap="xs">
              <Text fz="12px">Pending Requests</Text>
              <Text fz="xs" c="black" fw={600}>
                {stats.pendingRequests}
              </Text>
            </Stack>
          </Flex>
        </Card>

        <Card
          w="100%"
          px="lg"
          radius="md"
          style={{ filter: "drop-shadow(1px 1px 2px #00000068)" }}
        >
          <Flex gap="md">
            <Center h={30} w={30} bg="purple.0" style={{ borderRadius: "5px" }}>
              <IconCurrencyDollar size={15} color="purple" />
            </Center>
            <Stack gap="xs">
              <Text fz="12px">Total Spent This Month</Text>
              <Text fz="xs" c="black" fw={600}>
                PKR {stats.totalSpent.toLocaleString()}
              </Text>
            </Stack>
          </Flex>
        </Card>
      </SimpleGrid>

      {/* 🔹 Recent Bookings */}
      <Card
        w="100%"
        px="lg"
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 2px #00000068)" }}
      >
        <Stack gap="lg">
          <Text fz="sm" c="black" fw={600}>
            Recent Bookings
          </Text>
          <Stack gap="xl" pb="lg">
            <RecentBookingCard />
          </Stack>
        </Stack>
      </Card>

      {/* 👇 Hidden bookings fetcher for stats update */}
      <div style={{ display: "none" }}>
        <BookingsSection onStatsUpdate={setStats} />
      </div>
    </Stack>
  );
}
