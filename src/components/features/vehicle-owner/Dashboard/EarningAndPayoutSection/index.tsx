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
import { getUserDocument } from "@/features/user";
import dayjs from "dayjs";

export default function EarningAndPayoutSection() {
  const [openMainModal, setOpenMainModal] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);
  const [bookings, setBookings] = useState<BookingModel[]>([]);
  const [loading, setLoading] = useState(true);

  // NEW: track total amount withdrawn client-side (simulation)
  const [localWithdrawnTotal, setLocalWithdrawnTotal] = useState<number>(0);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) return;

      const userData = await getUserDocument(firebaseUser.uid);
      setUser(userData);

      const ownerBookings = await fetchOwnerVehicleBookings(firebaseUser.uid);
      setBookings(ownerBookings ?? []);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Base computed available balance (from bookings / released payments)
  const computeBaseAvailable = () =>
    bookings
      .filter((b) => b.payment?.status === "released")
      .reduce((sum, b) => {
        const paymentAmount = b.payment?.amount || 0;
        const platformFees = b.platformFee || 0;
        return sum + (paymentAmount - platformFees);
      }, 0);

  const baseAvailable = computeBaseAvailable();

  // If new bookings come and baseAvailable goes up/down, ensure localWithdrawnTotal
  // doesn't exceed baseAvailable too much (clamp to reasonable)
  useEffect(() => {
    if (localWithdrawnTotal > baseAvailable) {
      // keep it clamped so displayed balance never negative
      setLocalWithdrawnTotal((prev) => Math.min(prev, baseAvailable));
    }
  }, [baseAvailable]);

  // Displayed balance = baseAvailable - localWithdrawnTotal (clamped >= 0)
  const displayedAvailable = Math.max(0, baseAvailable - localWithdrawnTotal);

  const calculateThisMonth = () =>
    bookings
      .filter((b) => {
        if (b.payment?.status !== "released") return false;
        if (!b.pickUpDate) return false;
        const bookingDate = dayjs(b.pickUpDate);
        return bookingDate.isSame(dayjs(), "month");
      })
      .reduce((sum, b) => {
        const paymentAmount = b.payment?.amount || 0;
        const platformFees = b.platformFee || 0;
        return sum + (paymentAmount - platformFees);
      }, 0);

  const currentMonthEarnings = calculateThisMonth();

  // chart data generation (kept same)
  const generateChartData = () => {
    const last6Months = [...Array(6)].map((_, i) =>
      dayjs().subtract(5 - i, "month")
    );

    return last6Months.map((month) => {
      const monthName = month.format("MMM");

      const monthlyEarnings = bookings
        .filter((b) => {
          if (b.payment?.status !== "released") return false;
          if (!b.pickUpDate) return false;
          const bookingDate = dayjs(b.pickUpDate);
          return bookingDate.isSame(month, "month");
        })
        .reduce((sum, b) => {
          const paymentAmount = b.payment?.amount || 0;
          const platformFees = b.platformFee || 0;
          return sum + (paymentAmount - platformFees);
        }, 0);

      return { month: monthName, Sales: monthlyEarnings };
    });
  };

  const chartData = generateChartData();

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

  // Handler called when WithdrawPaymentModal reports a completed withdrawal (amount)
  const handleWithdrawComplete = (amount: number) => {
    // add the withdrawn amount to localWithdrawnTotal so UI immediately reflects deduction
    setLocalWithdrawnTotal((prev) => prev + amount);
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
                    Pkr {displayedAvailable.toLocaleString()}
                  </Text>
                </Stack>
              </Flex>
              <Button
                size="md"
                fw={500}
                onClick={() => setOpenMainModal(true)}
                disabled={displayedAvailable === 0}
              >
                {displayedAvailable === 0
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

      <WithdrawPaymentModal
        openModal={openMainModal}
        onClose={() => setOpenMainModal(false)}
        availableBalance={displayedAvailable}
        // pass the raw withdrawn amount back to parent
        onWithdrawComplete={(amount) => handleWithdrawComplete(amount)}
      />
    </>
  );
}
