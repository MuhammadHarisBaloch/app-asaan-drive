import {
  Card,
  Center,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Button,
  Badge,
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
import { data } from "@/constants/Data";
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

  // 🔹 Real-time data fetch
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

  // 🔹 Calculate dynamic earnings
  const calculateEarnings = () => {
    // ✅ Available Balance: All released payments minus platform fees
    const availableBalance = bookings
      .filter((b) => b.payment?.status === "released")
      .reduce((sum, b) => {
        const paymentAmount = b.payment?.amount || 0;
        const platformFees = b.platformFee || 0;
        return sum + (paymentAmount - platformFees);
      }, 0);

    // ✅ This Month Earnings: Current month ke released payments
    const currentMonthEarnings = bookings
      .filter((b) => {
        if (b.payment?.status !== "released") return false;
        if (!b.pickUpDate) return false;

        const bookingDate = dayjs(b.pickUpDate);
        const currentMonth = dayjs();
        return bookingDate.isSame(currentMonth, "month");
      })
      .reduce((sum, b) => {
        const paymentAmount = b.payment?.amount || 0;
        const platformFees = b.platformFee || 0;
        return sum + (paymentAmount - platformFees);
      }, 0);

    // ✅ Last Month Earnings: Comparison ke liye
    const lastMonthEarnings = bookings
      .filter((b) => {
        if (b.payment?.status !== "released") return false;
        if (!b.pickUpDate) return false;

        const bookingDate = dayjs(b.pickUpDate);
        const lastMonth = dayjs().subtract(1, "month");
        return bookingDate.isSame(lastMonth, "month");
      })
      .reduce((sum, b) => {
        const paymentAmount = b.payment?.amount || 0;
        const platformFees = b.platformFee || 0;
        return sum + (paymentAmount - platformFees);
      }, 0);

    // ✅ Monthly Growth Percentage
    const growthPercentage =
      lastMonthEarnings > 0
        ? Math.round(
            ((currentMonthEarnings - lastMonthEarnings) / lastMonthEarnings) *
              100
          )
        : currentMonthEarnings > 0
        ? 100
        : 0;

    return {
      availableBalance,
      currentMonthEarnings,
      growthPercentage,
      isPositiveGrowth: growthPercentage >= 0,
    };
  };

  // 🔹 Generate dynamic chart data (last 6 months)
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

      return {
        month: monthName,
        Sales: monthlyEarnings,
      };
    });
  };

  const {
    availableBalance,
    currentMonthEarnings,
    growthPercentage,
    isPositiveGrowth,
  } = calculateEarnings();
  const chartData = generateChartData();

  if (loading) {
    return (
      <Stack p="lg" gap="xl">
        <Stack gap={0}>
          <Text fz="xl" c="black" fw={600}>
            Earnings & Payouts
          </Text>
          <Text fz="12px">Track your earnings and manage withdrawals</Text>
        </Stack>
        <SimpleGrid cols={3} spacing="xxl">
          {[...Array(3)].map((_, i) => (
            <Card key={i} radius="md" p="xl">
              <Skeleton height={100} />
            </Card>
          ))}
        </SimpleGrid>
        <Card radius="md" p="xl">
          <Skeleton height={300} />
        </Card>
        <Card radius="md" p="xl">
          <Skeleton height={200} />
        </Card>
      </Stack>
    );
  }

  return (
    <>
      <Stack p="lg" gap="xl">
        <Stack gap={0}>
          <Text fz="xl" c="black" fw={600}>
            Earnings & Payouts
          </Text>
          <Text fz="12px">Track your earnings and manage withdrawals</Text>
        </Stack>

        <SimpleGrid cols={3} spacing="xxl">
          {/* 🔹 Available Balance Card */}
          <Card
            radius="md"
            p="xl"
            style={{ filter: "drop-shadow(1px 1px 2px #8e8e8e77)" }}
          >
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
                  <Text fz="xl" c="black" fw={600}>
                    Pkr {availableBalance.toLocaleString()}
                  </Text>
                </Stack>
              </Flex>
              <Button
                size="md"
                fw={500}
                fz="sm"
                onClick={() => setOpenMainModal(true)}
                disabled={availableBalance === 0}
              >
                {availableBalance === 0
                  ? "No Funds Available"
                  : "Withdraw Funds"}
              </Button>
            </Stack>
          </Card>

          {/* 🔹 This Month Earnings Card */}
          <Card
            radius="md"
            p="xl"
            style={{ filter: "drop-shadow(1px 1px 2px #8e8e8e77)" }}
          >
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
                  <Text fz="xl" c="black" fw={600}>
                    Rs {currentMonthEarnings.toLocaleString()}
                  </Text>
                </Stack>
              </Flex>
              <Text fz="xs" c={isPositiveGrowth ? "green" : "red"} fw={500}>
                {isPositiveGrowth ? "+" : ""}
                {growthPercentage}% from last month
              </Text>
            </Stack>
          </Card>
        </SimpleGrid>

        {/* 🔹 Monthly Earnings Chart */}
        <Card
          radius="md"
          p="xl"
          style={{ filter: "drop-shadow(1px 1px 2px #8e8e8e77)" }}
        >
          <Stack gap="xl">
            <Group justify="space-between">
              <Text c="black" fw={500} fz="md">
                Monthly Earnings
              </Text>
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
              className="root"
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
        availableBalance={availableBalance}
      />
    </>
  );
}
