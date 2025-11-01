import { data } from "@/constants/Data";
import { getUserDocument } from "@/features/user";
import { UserModel } from "@/features/user/models/user.model";
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
  IconCalendar,
  IconCalendarEventFilled,
  IconCar,
  IconCurrencyDollar,
  IconTrendingUp,
  IconWallet,
} from "@tabler/icons-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import RecentActivityCard from "./RecentActivityCard";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firebaseConstants } from "@/constants/Firestore";
import { db } from "@/networking/firebase";
import DashboardStatsCard from "./DashboadStatsCard";
import { listOwnerVehicleDocs } from "@/features/vehicle";
import { fetchOwnerVehicleBookings } from "@/features/booking";
import { BookingModel } from "@/features/booking/models/booking.model";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";

function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <Card
      radius="md"
      p="lg"
      style={{ filter: "drop-shadow(1px 1px 2px #53535336)" }}
    >
      <Flex align="center" gap="md">
        <Center
          h={50}
          w={50}
          bg={color}
          style={{ borderRadius: "10px", color: "white" }}
        >
          {icon}
        </Center>
        <Stack gap={0}>
          <Text fz="xs">{title}</Text>
          <Text fz="lg" fw={600} c="black">
            {value}
          </Text>
        </Stack>
      </Flex>
    </Card>
  );
}

export default function VehicleOwnerDashboardSection() {
  const [user, setUser] = useState<UserModel | null>(null);
  const [vehicles, setVehicles] = useState<VehicleModel[]>([]);
  const [bookings, setBookings] = useState<BookingModel[]>([]);
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeBookings: 0,
    totalEarnings: 0,
    pendingRequests: 0,
  });

  const auth = getAuth();

  // 🔹 Fetch user, vehicles, and bookings
  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) return;
      const userData = await getUserDocument(firebaseUser.uid);
      setUser(userData);

      const ownerVehicles = await listOwnerVehicleDocs(firebaseUser.uid);
      setVehicles(ownerVehicles ?? []);

      const ownerBookings = await fetchOwnerVehicleBookings(firebaseUser.uid);
      setBookings(ownerBookings ?? []);
    });
  }, []);

  // 🔹 Calculate stats (REVISED according to new flow)
  useEffect(() => {
    // Active bookings = confirmed + active
    const activeBookings = bookings.filter((b) =>
      ["active", "confirmed"].includes(b.status)
    ).length;

    // ✅ Only count bookings with released payment status (completed rides)
    const totalEarnings = bookings
      .filter((b) => b.payment?.status === "released")
      .reduce((sum, b) => sum + (b.payment?.amount || 0), 0);

    const pendingRequests = bookings.filter(
      (b) => b.status === "pending"
    ).length;

    setStats({
      totalVehicles: vehicles.length,
      activeBookings,
      totalEarnings,
      pendingRequests,
    });
  }, [vehicles, bookings]);

  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Welcome {user?.fullName ?? ""} !
        </Text>
        <Text fz="12px">Here's what's happening with your vehicles</Text>
      </Stack>
      {/* 🔹 Dashboard Stats Section */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        <StatCard
          icon={<IconCar size={24} color="blue" />}
          title="Total Vehicles"
          value={stats.totalVehicles}
          color="blue.1"
        />
        <StatCard
          icon={<IconCalendar size={24} color="green" />}
          title="Active Bookings"
          value={stats.activeBookings}
          color="green.1"
        />
        <StatCard
          icon={<IconCurrencyDollar size={24} color="orange" />}
          title="Total Earnings"
          value={`PKR ${stats.totalEarnings.toLocaleString()}`}
          color="orange.0"
        />
        <StatCard
          icon={<IconCalendarEventFilled size={24} color="red" />}
          title="Pending Requests"
          value={stats.pendingRequests.toLocaleString()}
          color="pink.0"
        />
      </SimpleGrid>
      <Card
        w="100%"
        radius="md"
        p="xl"
        style={{ filter: "drop-shadow(1px 1px 2px #5d5d5dab)" }}
      >
        <Text fz="lg" c="black" fw={500} mb="xl">
          Recent Activity
        </Text>
        <Stack gap="lg" pb="lg">
          {data.vehicleOwner.dashboard.overviewSection.recentActivites.map(
            (data, i) => {
              return <RecentActivityCard key={i} {...data} />;
            }
          )}
        </Stack>
      </Card>
    </Stack>
  );
}
