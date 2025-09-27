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
import { IconTrendingUp } from "@tabler/icons-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import RecentActivityCard from "./RecentActivityCard";

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
        {data.vehicleOwner.dashboard.overviewSection.ownerFeatures.map(
          (data, index) => {
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
          }
        )}
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
