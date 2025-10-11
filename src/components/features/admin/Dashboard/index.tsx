import { firebaseConstants } from "@/constants/Firestore";
import { db } from "@/networking/firebase";
import {
  Card,
  Center,
  Flex,
  Grid,
  GridCol,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCalendarEventFilled,
  IconCar,
  IconClock,
  IconMoneybag,
  IconUsers,
} from "@tabler/icons-react";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    vehicles: 0,
    bookings: 0,
    earnings: 0,
  });
  const [weeklyBookingsData, setWeeklyBookingsData] = useState<any[]>([]);
  const [monthlyEarningData, setMonthlyEarningData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Real-time listeners
  useEffect(() => {
    const usersRef = collection(db, firebaseConstants.collections.users);
    const vehiclesRef = collection(db, firebaseConstants.collections.vehicles);
    const bookingsRef = collection(db, firebaseConstants.collections.bookings);

    const unsubscribers: (() => void)[] = [];

    const unsubUsers = onSnapshot(usersRef, (snapshot) => {
      setStats((prev) => ({ ...prev, users: snapshot.size }));
    });
    const unsubVehicles = onSnapshot(vehiclesRef, (snapshot) => {
      setStats((prev) => ({ ...prev, vehicles: snapshot.size }));
    });
    const unsubBookings = onSnapshot(bookingsRef, (snapshot) => {
      const bookings = snapshot.docs.map((d) => d.data());
      const totalEarnings = bookings.reduce(
        (sum, b) => sum + (b.totalPrice || 0),
        0
      );

      setStats((prev) => ({
        ...prev,
        bookings: snapshot.size,
        earnings: totalEarnings,
      }));

      generateChartData(bookings);
      setLoading(false);
    });

    unsubscribers.push(unsubUsers, unsubVehicles, unsubBookings);

    return () => unsubscribers.forEach((unsub) => unsub());
  }, []);

  // 🔹 Chart Data Generator
  const generateChartData = (bookings: any[]) => {
    const last7Days = [...Array(7)].map((_, i) =>
      dayjs().subtract(6 - i, "day")
    );
    const weeklyData = last7Days.map((date) => {
      const dayName = date.format("ddd");
      const count = bookings.filter((b) => {
        if (!b.pickUpDate) return false;
        return dayjs(b.pickUpDate).isSame(date, "day");
      }).length;
      return { day: dayName, bookings: count };
    });
    setWeeklyBookingsData(weeklyData);

    const last6Months = [...Array(6)].map((_, i) =>
      dayjs().subtract(5 - i, "month")
    );
    const monthlyData = last6Months.map((m) => {
      const monthName = m.format("MMM");
      const total = bookings
        .filter((b) => b.pickUpDate && dayjs(b.pickUpDate).isSame(m, "month"))
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0);
      return { month: monthName, earning: total };
    });
    setMonthlyEarningData(monthlyData);
  };

  // 🔹 Dashboard Cards
  const adminDashStats = [
    {
      title: "Total Users",
      subTitle: stats.users.toString(),
      icon: <IconUsers size={20} color="blue" />,
      iconBg: "blue.1",
    },
    {
      title: "Total Vehicles",
      subTitle: stats.vehicles.toString(),
      icon: <IconCar size={20} color="orange" />,
      iconBg: "orange.0",
    },
    {
      title: "Total Bookings",
      subTitle: stats.bookings.toString(),
      icon: <IconCalendarEventFilled size={20} color="green" />,
      iconBg: "green.1",
    },
    {
      title: "Total Earnings",
      subTitle: `Rs. ${stats.earnings.toLocaleString()}`,
      icon: <IconMoneybag size={20} color="red" />,
      iconBg: "pink.1",
    },
  ];

  return (
    <Stack p="lg" gap="xxl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Admin Dashboard
        </Text>
        <Text fz="md">Welcome Admin. Here's what's happening today.</Text>
      </Stack>

      {/* 🔹 Stats Cards */}
      <SimpleGrid cols={4} spacing="xl">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <Card
                  key={i}
                  radius="md"
                  p="lg"
                  style={{ filter: "drop-shadow(1px 1px 2px #48484848)" }}
                >
                  <Skeleton height={60} />
                </Card>
              ))
          : adminDashStats.map((d, i) => (
              <Card
                key={i}
                radius="md"
                p="lg"
                style={{ filter: "drop-shadow(1px 1px 2px #48484848)" }}
              >
                <Flex align="center" justify="space-between">
                  <Stack gap={0}>
                    <Text fz="xs">{d.title}</Text>
                    <Text fz="md" fw={500} c="black">
                      {d.subTitle}
                    </Text>
                  </Stack>
                  <Center
                    h={40}
                    w={40}
                    bg={d.iconBg}
                    style={{ borderRadius: "10px" }}
                  >
                    {d.icon}
                  </Center>
                </Flex>
              </Card>
            ))}
      </SimpleGrid>

      {/* 🔹 Charts */}
      <Grid gutter="xl">
        {[...Array(2)].map((_, idx) => (
          <GridCol key={idx} span={6}>
            <Card
              radius="md"
              style={{ filter: "drop-shadow(1px 1px 2px #48484848)" }}
            >
              {loading ? (
                <Stack p="md">
                  <Skeleton height={30} width="50%" />
                  <Skeleton height={300} />
                </Stack>
              ) : idx === 0 ? (
                <Stack p="md">
                  <Group align="center" justify="space-between" pb="lg">
                    <Text fz="md" fw={500} c="black">
                      Weekly Bookings
                    </Text>
                    <Flex gap="sm">
                      <IconClock color="gray" size={20} />
                      <Text fz="xs">Last 7 days</Text>
                    </Flex>
                  </Group>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyBookingsData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line dataKey="bookings" stroke="red" />
                    </LineChart>
                  </ResponsiveContainer>
                </Stack>
              ) : (
                <Stack p="md">
                  <Group align="center" justify="space-between" pb="lg">
                    <Text fz="md" fw={500} c="black">
                      Monthly Earnings
                    </Text>
                    <Flex gap="sm">
                      <IconClock color="gray" size={20} />
                      <Text fz="xs">Last 6 months</Text>
                    </Flex>
                  </Group>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyEarningData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line dataKey="earning" stroke="red" />
                    </LineChart>
                  </ResponsiveContainer>
                </Stack>
              )}
            </Card>
          </GridCol>
        ))}
      </Grid>
    </Stack>
  );
}
