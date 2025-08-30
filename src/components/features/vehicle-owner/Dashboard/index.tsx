import { getUserDocument } from "@/features/user";
import { UserModel } from "@/features/user/models/user.model";
import {
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCalendarEventFilled,
  IconCar,
  IconCurrencyDollar,
  IconTrendingUp,
  IconWallet,
} from "@tabler/icons-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const ownerFeatures = [
  {
    icon: <IconCar size={30} color="blue" />,
    iconBgColor: "blue.1",
    title: "12",
    subTitle: "Total Vehicles",
    description: "+2 this month",
  },
  {
    icon: <IconCalendarEventFilled size={30} color="green" />,
    iconBgColor: "green.1",
    title: "8",
    subTitle: "Active Bookings",
    description: "3 pending approval",
  },
  {
    icon: <IconCurrencyDollar size={30} color="orange" />,
    iconBgColor: "orange.0",
    title: "pkr 45,250",
    subTitle: "Total Earnings",
    description: "+12% from last month",
  },
  {
    icon: <IconWallet size={30} color="purple" />,
    iconBgColor: "purple.0",
    title: "pkr 12,800",
    subTitle: "Wallet Balance",
    description: "Available for withdrawal",
  },
];

const recentActivites = [
  {
    icon: <IconCalendarEventFilled size={25} color="orange" />,
    iconBgColor: "orange.0",
    title: "New booking request for Honda Civic",
    subTitle: "5 min ago",
    status: "pending",
    statusBgColor: "orange.0",
    statusColor: "orange.5",
  },
  {
    icon: <IconCurrencyDollar size={25} color="green" />,
    iconBgColor: "green.1",
    title: "Payment received - PKR 3,500",
    subTitle: "1 hour ago",
    status: "success",
    statusBgColor: "green.0",
    statusColor: "green",
  },
  {
    icon: <IconCar size={25} color="red" />,
    iconBgColor: "red.0",
    title: "Toyota Corolla - Maintenance reminder",
    subTitle: "2 hours ago",
    status: "warning",
    statusBgColor: "red.0",
    statusColor: "red.4",
  },
  {
    icon: <IconCalendarEventFilled size={25} color="blue" />,
    iconBgColor: "blue.1",
    title: "Booking completed - Suzuki Alto",
    subTitle: "3 hours ago",
    status: "completed",
    statusBgColor: "blue.1",
    statusColor: "blue",
  },
];

const quickAccessButton = [
  {
    bgColor: "#366fc5ff",
    color: "white",
    title: "Add New Vehicle",
  },
  {
    bgColor: "green",
    color: "white",
    title: "Withdraw Funds",
  },
  {
    bgColor: "transparent",
    color: "black",
    title: "View All Bookings",
  },
];

export default function VehicleOwnerDashboardSection() {
  const [user, setUser] = useState<UserModel | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchUserId = async (id: string) => {
      const userData = await getUserDocument(id);
      setUser(userData);
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserId(user.uid);
      }
    });
  }, []);

  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Welcome {user?.fullName ?? ""} !
        </Text>
        <Text fz="12px">Here's what's happening with your vehicles</Text>
      </Stack>
      <SimpleGrid cols={4}>
        {ownerFeatures.map((data, index) => {
          return (
            <Card
              key={index}
              w="100%"
              p="lg"
              radius="md"
              style={{ filter: "drop-shadow(1px 1px 2px #5d5d5dab)" }}
            >
              <Stack gap="xl">
                <Group align="center" justify="space-between">
                  <Center
                    h={60}
                    w={60}
                    bg={data.iconBgColor}
                    style={{ borderRadius: "10px" }}
                  >
                    {data.icon}
                  </Center>
                  <IconTrendingUp size={20} color="green" />
                </Group>
                <Stack gap="xs">
                  <Text fz="lg" fw={600} c="black">
                    {data.title}
                  </Text>
                  <Text fz="xs" fw={600} c="gray.8">
                    {data.subTitle}
                  </Text>
                  <Text fz="12px">{data.description}</Text>
                </Stack>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
      <Grid gutter="xxl">
        <Grid.Col span={8}>
          <Card
            w="100%"
            radius="md"
            p="lg"
            style={{ filter: "drop-shadow(1px 1px 2px #5d5d5dab)" }}
          >
            <Text fz="lg" c="black" fw={500} mb="xl">
              Recent Activity
            </Text>
            <Stack gap="lg" pb="lg">
              {recentActivites.map((data, i) => {
                return (
                  <Card
                    key={i}
                    px="lg"
                    py="md"
                    style={{
                      borderRadius: "10px",
                      filter: "drop-shadow(1px 1px 2px #5d5d5d3e)",
                    }}
                  >
                    <Group justify="space-between">
                      <Flex align="center" gap="md">
                        <Center
                          h={50}
                          w={50}
                          bg={data.iconBgColor}
                          style={{ borderRadius: "10px" }}
                        >
                          {data.icon}
                        </Center>
                        <Stack gap="xxs">
                          <Text fz="xs" c="black" fw={500}>
                            {data.title}
                          </Text>
                          <Text fz="12px">{data.subTitle}</Text>
                        </Stack>
                      </Flex>
                      <Center
                        px="md"
                        bg={data.statusBgColor}
                        style={{ borderRadius: "10px" }}
                      >
                        <Text fz="12px" c={data.statusColor}>
                          {data.status}
                        </Text>
                      </Center>
                    </Group>
                  </Card>
                );
              })}
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card
            w="100%"
            radius="md"
            p="lg"
            px="xl"
            style={{ filter: "drop-shadow(1px 1px 2px #5d5d5dab)" }}
          >
            <Text fz="lg" c="black" fw={500} mb="xl">
              Quick Actions
            </Text>
            <Stack gap="lg">
              {quickAccessButton.map((data, i) => {
                return (
                  <Button
                    key={i}
                    size="md"
                    bg={data.bgColor}
                    variant="outline"
                    color={data.color}
                    fz="sm"
                    fw={400}
                  >
                    {data.title}
                  </Button>
                );
              })}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
