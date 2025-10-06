import {
  Card,
  Center,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconAlertTriangle, IconArrowRight } from "@tabler/icons-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";
import { getUserDocument } from "../../../../features/user";
import { UserModel } from "../../../../features/user/models/user.model";
import EmergencyModal from "../EmergencyModal";
import { data } from "@/constants/Data";
import RecentBookingCard from "./RecentBookingCard";

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
      <Group justify="space-between">
        <Stack gap={0}>
          <Text fz="xl" c="black" fw={600}>
            Welcome {user?.fullName ?? ""}!
          </Text>
          <Text fz="12px">Here's what's happening with your rentals</Text>
        </Stack>
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
            onClick={() => {
              EmergencyModal();
            }}
          >
            <IconAlertTriangle size={30} color="white" />
          </Center>
        </Flex>
      </Group>
      <SimpleGrid cols={4} spacing="lg">
        {data.renter.dashboard.overView.DashFeatures.map((data, index) => {
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
          <Stack gap="xl" pb="lg">
            <RecentBookingCard />
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
