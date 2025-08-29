import Images from "@/constants/Images";
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
  IconCalendarEventFilled,
  IconCar,
  IconClock,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUserDocument } from "../../../../features/user";
import { UserModel } from "../../../../features/user/models/user.model";

const DashFeatures = [
  {
    icon: <IconCar size={15} color="blue" />,
    IconBackgroundColor: "blue.1",
    title: "Active Rentals",
    subTitle: "2",
  },
  {
    icon: <IconCalendarEventFilled size={15} color="green" />,
    IconBackgroundColor: "green.1",
    title: "Upcoming Bookings",
    subTitle: "4",
  },
  {
    icon: <IconClock size={15} color="red" />,
    IconBackgroundColor: "red.1",
    title: "Pending Requests",
    subTitle: "1",
  },
  {
    icon: <IconCurrencyDollar size={15} color="purple" />,
    IconBackgroundColor: "purple.0",
    title: "Total Spent This Month",
    subTitle: "Pkr 19,500",
  },
];

const RecentBookings = [
  {
    vehicleImage: Images.listedVehicles.cd70,
    vehicleName: "Honda CD 70",
    rentingDuration: "Oct 12, 2024 - Oct 15, 2024",
    status: "Active",
    statusColor: "green",
    statusBgColor: "green.1",
    price: "Pkr 3,000",
  },
  {
    vehicleImage: Images.listedVehicles.cd125,
    vehicleName: "Honda CD 125",
    rentingDuration: "Oct 10, 2024 - Oct 11, 2024",
    status: "Confirmed",
    statusColor: "blue",
    statusBgColor: "blue.1",
    price: "Pkr 1,500",
  },
  {
    vehicleImage: Images.listedVehicles.rakshaw,
    vehicleName: "Rakshaw",
    rentingDuration: "Oct 1, 2024 - Oct 15, 2024",
    status: "Pending",
    statusColor: "red",
    statusBgColor: "red.1",
    price: "Pkr 15,000",
  },
];

export default function DashboardSection() {
  const [user, setUser] = useState<UserModel | null>(null);

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
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Welcome {user?.fullName ?? ""}!
        </Text>
        <Text fz="12px">Here's what's happening with your rentals</Text>
      </Stack>
      <SimpleGrid cols={4} spacing="lg">
        {DashFeatures.map((data, index) => {
          return (
            <Card
              key={index}
              w="100%"
              px="lg"
              radius="md"
              style={{ filter: "drop-shadow(1px 1px 2px #00000068)" }}
            >
              <Flex gap="md">
                <Center
                  h={30}
                  w={30}
                  bg={data.IconBackgroundColor}
                  style={{ borderRadius: "5px" }}
                >
                  {data.icon}
                </Center>
                <Stack gap="xs">
                  <Text fz="12px">{data.title}</Text>
                  <Text fz="xs" c="black" fw={600}>
                    {data.subTitle}
                  </Text>
                </Stack>
              </Flex>
            </Card>
          );
        })}
      </SimpleGrid>
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
          <Stack gap="xl">
            {RecentBookings.map((data, index) => {
              return (
                <Card
                  key={index}
                  w="100%"
                  px="xl"
                  py="lg"
                  radius="md"
                  bg="white.2"
                  style={{ filter: "drop-shadow(1px 1px 2px #78787846)" }}
                >
                  <Group justify="space-between">
                    <Flex gap="md" align="center">
                      <Image
                        height={100}
                        width={100}
                        src={data.vehicleImage}
                        alt="cd-70"
                        sizes="100vw"
                        style={{
                          height: "auto",
                          width: "4rem",
                        }}
                      />
                      <Stack gap="xxs">
                        <Text fz="xs" c="black" fw={600}>
                          {data.vehicleName}
                        </Text>
                        <Text fz="12px">{data.rentingDuration}</Text>
                      </Stack>
                    </Flex>
                    <Flex gap="md">
                      <Center
                        bg={data.statusBgColor}
                        px="md"
                        style={{ borderRadius: "10px" }}
                      >
                        <Text fz="12px" c={data.statusColor}>
                          {data.status}
                        </Text>
                      </Center>
                      <Text fz="xs" c="black" fw={600}>
                        {data.price}
                      </Text>
                    </Flex>
                  </Group>
                </Card>
              );
            })}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
