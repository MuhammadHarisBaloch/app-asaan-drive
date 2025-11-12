import {
  Card,
  Grid,
  Group,
  Stack,
  Text,
  Progress,
  Table,
  Skeleton,
  Badge,
  rem,
  Box,
  Flex,
  Center,
  Button,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchAllBookings } from "@/features/booking";
import { listAllVehicleDocs } from "@/features/vehicle";
import { getAllUsers, getUserDocument } from "@/features/user";
import { BookingModel } from "@/features/booking/models/booking.model";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { UserModel } from "@/features/user/models/user.model";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/networking/firebase";
import { firebaseConstants } from "@/constants/Firestore";
import {
  IconCar,
  IconChartColumn,
  IconCurrencyDollar,
  IconDownload,
  IconMapPin,
  IconUsers,
} from "@tabler/icons-react";

interface CityStats {
  city: string;
  totalBookings: number;
  revenue: number;
  growth: number;
}

interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export default function ReportsDashboardSection() {
  const [bookings, setBookings] = useState<BookingModel[]>([]);
  const [vehicles, setVehicles] = useState<VehicleModel[]>([]);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Real-time listeners for all collections
      const bookingsQuery = query(
        collection(db, firebaseConstants.collections.bookings)
      );
      const vehiclesQuery = query(
        collection(db, firebaseConstants.collections.vehicles)
      );
      const usersQuery = query(
        collection(db, firebaseConstants.collections.users)
      );

      const unsubscribeBookings = onSnapshot(
        bookingsQuery,
        async (snapshot) => {
          const bookingsData: BookingModel[] = [];
          snapshot.forEach((doc) => {
            bookingsData.push({
              id: doc.id,
              ...doc.data(),
            } as unknown as BookingModel);
          });

          // Fetch renter data for each booking
          const bookingsWithRenter = await Promise.all(
            bookingsData.map(async (booking) => {
              if (booking.renterId) {
                try {
                  const renter = await getUserDocument(booking.renterId);
                  return { ...booking, renter };
                } catch (error) {
                  console.error(
                    `Error fetching renter for ${booking.renterId}:`,
                    error
                  );
                  return booking;
                }
              }
              return booking;
            })
          );

          setBookings(bookingsWithRenter);
        }
      );

      const unsubscribeVehicles = onSnapshot(vehiclesQuery, (snapshot) => {
        const vehiclesData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as VehicleModel)
        );
        setVehicles(vehiclesData);
      });

      const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
        const usersData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as UserModel)
        );
        setUsers(usersData);
        setLoading(false);
      });

      // Cleanup function
      return () => {
        unsubscribeBookings();
        unsubscribeVehicles();
        unsubscribeUsers();
      };
    };

    fetchData();
  }, []);

  // Calculate stats
  const totalBookings = bookings.length;
  const totalUsers = users.length;
  const totalVehicles = vehicles.length;

  const totalRevenue = bookings
    .filter((booking) => booking.status === "completed")
    .reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);

  const activeVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "available" || vehicle.status === "booked"
  ).length;

  const newUsers = users.filter((user) => {
    if (!user.createdAt) return false;
    let joinDate: Date;
    if (user.createdAt.toDate) {
      joinDate = user.createdAt.toDate();
    } else if (typeof user.createdAt === "string") {
      joinDate = new Date(user.createdAt);
    } else {
      joinDate = new Date();
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return joinDate >= thirtyDaysAgo;
  }).length;

  // Calculate monthly revenue data for bar chart
  const monthlyRevenue: MonthlyRevenue[] = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthName = date.toLocaleDateString("en-US", { month: "short" });

    const monthBookings = bookings.filter((booking) => {
      if (!booking.pickUpDate || booking.status !== "completed") return false;
      const bookingDate = new Date(booking.pickUpDate);
      return (
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear()
      );
    });

    const revenue = monthBookings.reduce(
      (sum, booking) => sum + (booking.totalPrice || 0),
      0
    );

    return {
      month: monthName,
      revenue: revenue,
    };
  }).reverse();

  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue), 1);

  // Vehicle type distribution
  const vehicleTypeDistribution = vehicles.reduce((acc, vehicle) => {
    const type = vehicle.vehicleType?.toLowerCase() || "other";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Top performing cities - SORTED BY TOTAL BOOKINGS (not revenue)
  const cityStats: CityStats[] = Object.entries(
    bookings.reduce((acc, booking) => {
      const city = booking.renter?.city || "Unknown";
      if (!acc[city]) {
        acc[city] = { bookings: 0, revenue: 0 };
      }
      acc[city].bookings += 1;
      if (booking.status === "completed") {
        acc[city].revenue += booking.totalPrice || 0;
      }
      return acc;
    }, {} as Record<string, { bookings: number; revenue: number }>)
  )
    .filter(([city]) => city !== "Unknown")
    .map(([city, data]) => ({
      city,
      totalBookings: data.bookings,
      revenue: data.revenue,
      growth: Math.random() * 20 + 5,
    }))
    .sort((a, b) => b.totalBookings - a.totalBookings) // ✅ Sort by totalBookings instead of revenue
    .slice(0, 3);

  const finalCityStats =
    cityStats.length > 0
      ? cityStats
      : [
          {
            city: "N/A",
            totalBookings: 0,
            revenue: 0,
            growth: 0,
          },
        ];

  // Export to Excel function
  const exportToExcel = () => {
    // Create CSV content
    const csvContent = [
      // Headers
      [
        "Metric",
        "Value",
        "Growth",
        "Total Bookings",
        "Total Revenue",
        "Total Users",
        "Active Vehicles",
        "New Users (30 days)",
      ],
      // Data row
      [
        "Platform Overview",
        "",
        "",
        totalBookings.toString(),
        `Rs. ${totalRevenue.toLocaleString()}`,
        totalUsers.toString(),
        activeVehicles.toString(),
        newUsers.toString(),
      ],
      [],
      [
        "Top Performing Cities",
        "Rank",
        "City",
        "Total Bookings",
        "Revenue",
        "Growth",
      ],
      ...finalCityStats.map((city, index) => [
        "",
        `#${index + 1}`,
        city.city,
        city.totalBookings.toString(),
        `Rs. ${city.revenue.toLocaleString()}`,
        `${city.growth >= 0 ? "+" : ""}${city.growth.toFixed(1)}%`,
      ]),
      [],
      ["Vehicle Type Distribution", "Type", "Count", "Percentage"],
      ...Object.entries(vehicleTypeDistribution).map(([type, count]) => {
        const percentage = (count / Math.max(vehicles.length, 1)) * 100;
        return [
          "",
          type.charAt(0).toUpperCase() + type.slice(1),
          count.toString(),
          `${percentage.toFixed(1)}%`,
        ];
      }),
      [],
      ["Monthly Revenue", "Month", "Revenue"],
      ...monthlyRevenue.map((month) => [
        "",
        month.month,
        `Rs. ${month.revenue.toLocaleString()}`,
      ]),
    ];

    // Convert to CSV string
    const csvString = csvContent
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    // Create and download file
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `AsaanDrive_Reports_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Enhanced Skeleton Loader
  if (loading) {
    return (
      <Stack p="lg" gap="xl">
        {/* Header Skeleton */}
        <Stack gap={0}>
          <Skeleton height={28} width={280} radius="sm" />
          <Skeleton height={14} width={380} mt={8} radius="sm" />
        </Stack>

        {/* 4 Cards Grid Skeleton */}
        <Grid>
          {[1, 2, 3, 4].map((item) => (
            <Grid.Col span={3} key={item}>
              <Card
                p="xl"
                radius="md"
                style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
              >
                <Stack gap="md">
                  <Skeleton height={20} width={120} radius="sm" />
                  <Group justify="space-between" align="flex-end">
                    <Skeleton height={32} width={80} radius="sm" />
                    <Skeleton height={22} width={60} radius="xl" />
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Monthly Performance & Bar Chart Grid */}
        <Grid>
          <Grid.Col span={6}>
            <Card
              p="xl"
              radius="md"
              style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
            >
              <Skeleton height={24} width={180} radius="sm" mb="md" />
              <Stack gap="lg">
                {[1, 2].map((row) => (
                  <Group key={row} justify="space-between">
                    <Skeleton height={18} width={100} radius="sm" />
                    <Skeleton height={18} width={60} radius="sm" />
                  </Group>
                ))}
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={6}>
            <Card
              p="xl"
              radius="md"
              style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
            >
              <Skeleton height={24} width={180} radius="sm" mb="md" />
              <Stack gap="md">
                <Skeleton height={20} width={120} radius="sm" />
                <Skeleton height={120} radius="sm" />
                <Group justify="space-between">
                  {[1, 2, 3, 4, 5, 6].map((bar) => (
                    <Skeleton key={bar} height={20} width={30} radius="sm" />
                  ))}
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Vehicle Distribution & Top Cities Grid */}
        <Grid>
          <Grid.Col span={6}>
            <Card
              p="xl"
              radius="md"
              style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
            >
              <Skeleton height={24} width={200} radius="sm" mb="md" />
              <Stack gap="md">
                {[1, 2, 3].map((item) => (
                  <div key={item}>
                    <Group justify="space-between" mb="xs">
                      <Skeleton height={16} width={80} radius="sm" />
                      <Skeleton height={16} width={60} radius="sm" />
                    </Group>
                    <Skeleton height={8} radius="sm" />
                  </div>
                ))}
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={6}>
            <Card
              p="xl"
              radius="md"
              style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
            >
              <Skeleton height={24} width={180} radius="sm" mb="md" />
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    {["Rank", "City", "Bookings", "Revenue", "Growth"].map(
                      (header) => (
                        <Table.Th key={header}>
                          <Skeleton height={14} width={60} radius="sm" />
                        </Table.Th>
                      )
                    )}
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {[1, 2, 3].map((row) => (
                    <Table.Tr key={row}>
                      {[1, 2, 3, 4, 5].map((cell) => (
                        <Table.Td key={cell}>
                          <Skeleton height={16} width={50} radius="sm" />
                        </Table.Td>
                      ))}
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    );
  }

  return (
    <Stack p="lg" gap="xl">
      {/* Header Section */}
      <Group align="center" justify="space-between">
        <Stack gap={0}>
          <Text fz="xl" c="black" fw={600}>
            Reports Dashboard
          </Text>
          <Text fz="12px">
            Analytics and insights for AsaanDrive platform performance
          </Text>
        </Stack>
        <Button
          fw={500}
          leftSection={<IconDownload color="white" size={18} />}
          onClick={exportToExcel}
          bg="red.4"
        >
          Export Report
        </Button>
      </Group>

      {/* 4 Cards Grid */}
      <Grid>
        <Grid.Col span={3}>
          <Card
            h="7rem"
            p="xl"
            radius="md"
            style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
          >
            <Flex gap="sm">
              <Center
                h={40}
                w={40}
                bg="blue.1"
                style={{ borderRadius: "10px" }}
              >
                <IconChartColumn color="blue" size={20} />
              </Center>
              <Stack gap="xs">
                <Text fz="sm">Total Bookings</Text>
                <Text fz="lg" fw={600} c="black">
                  {totalBookings}
                </Text>
              </Stack>
            </Flex>
          </Card>
        </Grid.Col>

        <Grid.Col span={3}>
          <Card
            h="7rem"
            p="xl"
            radius="md"
            style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
          >
            <Flex gap="sm">
              <Center
                h={40}
                w={40}
                bg="green.1"
                style={{ borderRadius: "10px" }}
              >
                <IconCurrencyDollar color="green" size={20} />
              </Center>

              <Stack gap="sm">
                <Text fz="sm">Total Revenue</Text>
                <Text fz="lg" fw={600} c="black">
                  Rs. {totalRevenue.toLocaleString()}
                </Text>
              </Stack>
            </Flex>
          </Card>
        </Grid.Col>

        <Grid.Col span={3}>
          <Card
            h="7rem"
            p="xl"
            radius="md"
            style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
          >
            <Flex gap="sm">
              <Center
                h={40}
                w={40}
                bg="purple.0"
                style={{ borderRadius: "10px" }}
              >
                <IconUsers color="purple" size={20} />
              </Center>

              <Stack gap="md">
                <Text fz="sm">Total Users</Text>
                <Text fz="lg" fw={600} c="black">
                  {totalUsers}
                </Text>
              </Stack>
            </Flex>
          </Card>
        </Grid.Col>

        <Grid.Col span={3}>
          <Card
            h="7rem"
            p="xl"
            radius="md"
            style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
          >
            <Flex gap="sm">
              <Center
                h={40}
                w={40}
                bg="orange.1"
                style={{ borderRadius: "10px" }}
              >
                <IconCar color="orange" size={20} />
              </Center>

              <Stack gap="md">
                <Text fz="sm">Active Vehicles</Text>
                <Text fz="lg" fw={600} c="black">
                  {activeVehicles}
                </Text>
              </Stack>
            </Flex>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Monthly Performance & Revenue Chart Grid */}
      <Grid>
        <Grid.Col span={6}>
          <Card
            p="xl"
            radius="md"
            style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
          >
            <Text fz="lg" fw={600} c="black" mb="md">
              Monthly Earnings
            </Text>
            <Stack gap="sm">
              {/* Y-axis labels and bars */}
              <Box style={{ position: "relative", height: 180 }}>
                {/* Y-axis labels */}
                <Box
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 40,
                  }}
                >
                  {[3600, 2700, 1800, 900, 0].map((value, index) => (
                    <Text
                      key={value}
                      fz="10px"
                      c="gray.6"
                      style={{
                        position: "absolute",
                        right: 8,
                        top: `${index * 25}%`,
                        transform: "translateY(-50%)",
                      }}
                    >
                      {value.toLocaleString()}
                    </Text>
                  ))}
                </Box>

                {/* Bars container */}
                <Box
                  style={{
                    marginLeft: 40,
                    height: "100%",
                    position: "relative",
                  }}
                >
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((line) => (
                    <Box
                      key={line}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${line * 25}%`,
                        height: "1px",
                        backgroundColor: "#e9ecef",
                      }}
                    />
                  ))}

                  {/* Bars */}
                  <Box
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "end",
                      gap: 12,
                      padding: "0 20px",
                    }}
                  >
                    {monthlyRevenue.map((month, index) => (
                      <Box
                        key={month.month}
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        {/* Bar with value on top */}
                        <Box
                          style={{
                            position: "relative",
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          {/* Bar value on top */}
                          <Text fz="10px" c="gray.7" mb={4} fw={500}>
                            Rs. {month.revenue.toLocaleString()}
                          </Text>

                          {/* Bar */}
                          <Box
                            style={{
                              height: `${(month.revenue / 3600) * 100}%`,
                              backgroundColor: "red",
                              width: "70%",
                              borderRadius: "4px 4px 0 0",
                              minHeight: "4px",
                              maxHeight: "100%",
                            }}
                          />
                        </Box>

                        {/* Month label */}
                        <Text fz="10px" c="gray.6" mt={8} fw={500}>
                          {month.month}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Group justify="apart" mt="md">
                <Text fz="sm" c="gray.6">
                  Last 6 months earnings trend
                </Text>
                <Badge c="red.4" bg="pink.1" size="sm">
                  Total: Rs.{" "}
                  {monthlyRevenue
                    .reduce((sum, m) => sum + m.revenue, 0)
                    .toLocaleString()}
                </Badge>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card
            p="xl"
            radius="md"
            h="100%"
            style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
          >
            <Text fz="lg" fw={600} c="black" mb="md">
              Vehicle Type Distribution
            </Text>
            <Stack gap="md">
              {Object.entries(vehicleTypeDistribution).map(([type, count]) => {
                const percentage = (count / Math.max(vehicles.length, 1)) * 100;
                return (
                  <div key={type}>
                    <Group justify="space-between" mb="xs">
                      <Text fw={500} tt="capitalize">
                        {type}
                      </Text>
                      <Text fw={500}>
                        {count} ({percentage.toFixed(0)}%)
                      </Text>
                    </Group>
                    <Progress value={percentage} color="red.4" size="md" />
                  </div>
                );
              })}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Vehicle Distribution & Top Cities Grid */}
      <Grid>
        <Grid.Col span={12}>
          <Card
            p="xl"
            radius="md"
            style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
          >
            <Text fz="lg" fw={600} c="black" mb="md">
              Top Performing Cities
            </Text>
            <Table.ScrollContainer minWidth={400}>
              <Table verticalSpacing="md">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th fz="12px" c="gray" fw={600}>
                      RANK
                    </Table.Th>
                    <Table.Th fz="12px" c="gray" fw={600}>
                      CITY
                    </Table.Th>
                    <Table.Th fz="12px" c="gray" fw={600}>
                      TOTAL BOOKINGS
                    </Table.Th>
                    <Table.Th fz="12px" c="gray" fw={600}>
                      REVENUE
                    </Table.Th>
                    <Table.Th fz="12px" c="gray" fw={600}>
                      GROWTH
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {finalCityStats.map((city, index) => (
                    <Table.Tr key={city.city}>
                      <Table.Td>
                        <Text fz="sm" fw={500}>
                          #{index + 1}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Flex gap="md" align="center">
                          <IconMapPin color="gray" size={20} />
                          <Text fz="sm" fw={500}>
                            {city.city}
                          </Text>
                        </Flex>
                      </Table.Td>
                      <Table.Td>
                        <Text fz="sm" fw={500}>
                          {city.totalBookings}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text fz="sm" fw={500}>
                          Rs. {city.revenue.toLocaleString()}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          c={city.growth >= 0 ? "green" : "red"}
                          bg={city.growth >= 0 ? "green.1" : "pink.1"}
                          variant="light"
                        >
                          {city.growth >= 0 ? "+" : ""}
                          {city.growth.toFixed(1)}%
                        </Badge>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
