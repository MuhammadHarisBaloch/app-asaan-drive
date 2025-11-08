"use client";

import {
  Card,
  Center,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Button,
  Skeleton,
} from "@mantine/core";
import { BarChart } from "@mantine/charts";
import {
  IconCurrencyDollar,
  IconDownload,
  IconTrendingUp,
} from "@tabler/icons-react";
import WithdrawPaymentModal from "./WithdrawPaymentModal";
import { useState, useEffect } from "react";
import { BookingModel } from "@/features/booking/models/booking.model";
import { fetchOwnerVehicleBookings } from "@/features/booking";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserModel } from "@/features/user/models/user.model";
import { getUserDocument, updateUserDocumentField } from "@/features/user"; // helper to update firestore
import dayjs from "dayjs";

export default function EarningAndPayoutSection() {
  const [openMainModal, setOpenMainModal] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);
  const [bookings, setBookings] = useState<BookingModel[]>([]);
  const [loading, setLoading] = useState(true);

  // Available balance from Firestore
  const [availableBalance, setAvailableBalance] = useState<number>(0);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) return;

      const userData = await getUserDocument(firebaseUser.uid);
      setUser(userData);

      // Set balance from Firestore
      setAvailableBalance(userData?.availableBalance ?? 0);

      const ownerBookings = await fetchOwnerVehicleBookings(firebaseUser.uid);
      setBookings(ownerBookings ?? []);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Calculate this month earnings from released bookings
  const currentMonthEarnings = bookings
    .filter((b) => b.payment?.status === "released" && b.pickUpDate)
    .filter((b) => dayjs(b.pickUpDate).isSame(dayjs(), "month"))
    .reduce(
      (sum, b) => sum + ((b.payment?.amount ?? 0) - (b.platformFee ?? 0)),
      0
    );

  // Chart data (last 6 months)
  const chartData = [...Array(6)].map((_, i) => {
    const month = dayjs().subtract(5 - i, "month");
    const monthlyEarnings = bookings
      .filter((b) => b.payment?.status === "released" && b.pickUpDate)
      .filter((b) => dayjs(b.pickUpDate).isSame(month, "month"))
      .reduce(
        (sum, b) => sum + ((b.payment?.amount ?? 0) - (b.platformFee ?? 0)),
        0
      );

    return { month: month.format("MMM"), Sales: monthlyEarnings };
  });

  if (loading) {
    return (
      <Stack p="lg" gap="xl">
        {[...Array(3)].map((_, i) => (
          <Card key={i} radius="md" p="xl">
            <Skeleton height={100} />
          </Card>
        ))}
      </Stack>
    );
  }

  // Withdraw complete handler
  const handleWithdrawComplete = async (amount: number) => {
    if (!user) return;

    // Deduct from Firestore
    const newBalance = Math.max(0, (availableBalance ?? 0) - amount);
    await updateUserDocumentField(user.id, { availableBalance: newBalance });

    // Update local state
    setAvailableBalance(newBalance);
  };

  return (
    <>
      <Stack p="lg" gap="xl">
        <Text fz="xl" fw={600}>
          Earnings & Payouts
        </Text>

        <SimpleGrid cols={3} spacing="xxl">
          <Card radius="md" p="xl">
            <Stack gap="lg">
              <Flex align="center" gap="md">
                <Center
                  h={50}
                  w={50}
                  bg="red.0"
                  style={{ borderRadius: "10px" }}
                >
                  <IconCurrencyDollar size={25} color="red" />
                </Center>
                <Stack gap={0}>
                  <Text fz="xs" fw={500}>
                    Available Balance
                  </Text>
                  <Text fz="xl" fw={600}>
                    Pkr {availableBalance.toLocaleString()}
                  </Text>
                </Stack>
              </Flex>
              <Button
                size="md"
                fw={500}
                onClick={() => setOpenMainModal(true)}
                disabled={availableBalance === 0}
              >
                {availableBalance === 0
                  ? "No Funds Available"
                  : "Withdraw Funds"}
              </Button>
            </Stack>
          </Card>

          <Card radius="md" p="xl">
            <Stack gap="lg">
              <Flex align="center" gap="md">
                <Center
                  h={50}
                  w={50}
                  bg="green.1"
                  style={{ borderRadius: "10px" }}
                >
                  <IconTrendingUp size={25} color="green" />
                </Center>
                <Stack gap={0}>
                  <Text fz="xs" fw={500}>
                    This Month
                  </Text>
                  <Text fz="xl" fw={600}>
                    Rs {currentMonthEarnings.toLocaleString()}
                  </Text>
                </Stack>
              </Flex>
            </Stack>
          </Card>
        </SimpleGrid>

        <Card radius="md" p="xl">
          <Stack gap="xl">
            <Group justify="space-between">
              <Text fw={500}>Monthly Earnings</Text>
              <Button
                variant="transparent"
                color="blue.5"
                fz="xs"
                fw={500}
                leftSection={<IconDownload size={20} />}
              >
                Export Report
              </Button>
            </Group>
            <BarChart
              h="20rem"
              data={chartData}
              dataKey="month"
              withTooltip={false}
              series={[{ name: "Sales", color: "red.4" }]}
            />
          </Stack>
        </Card>
      </Stack>

      {user && (
        <WithdrawPaymentModal
          openModal={openMainModal}
          onClose={() => setOpenMainModal(false)}
          availableBalance={availableBalance}
          onWithdrawComplete={handleWithdrawComplete}
        />
      )}
    </>
  );
}
