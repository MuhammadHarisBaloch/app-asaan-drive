import {
  Button,
  Card,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconArrowDownLeft,
  IconCreditCard,
  IconCurrencyDollar,
  IconDownload,
} from "@tabler/icons-react";
import PaymentCard from "./PaymentCard";
import TransactionsCard from "./TransactionsCard";
import { data } from "@/constants/Data";
import BookingsSection, { BookingStats } from "../Bookings";
import { useState } from "react";

export default function Payments() {
  const [stats, setStats] = useState<BookingStats>({
    activeRentals: 0,
    upcomingBookings: 0,
    pendingRequests: 0,
    totalSpent: 0,
    totalRefund: 0,
  });
  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Payments
        </Text>
        <Text fz="12px">Manage your payments and transaction history</Text>
      </Stack>
      <Flex gap="md">
        <PaymentCard
          icon={<IconCreditCard size="30" color="purple" />}
          iconBg="purple.0"
          title="Total Spent This Month"
          price={stats.totalSpent.toFixed(0)}
          subTitle="Your total rental expenses"
        />

        <PaymentCard
          icon={<IconArrowDownLeft size="30" color="blue" />}
          iconBg="blue.1"
          title="Refunds"
          price={stats.totalRefund.toFixed(0)}
          subTitle="Cancelled ride refunds"
        />
      </Flex>
      <Card
        radius="md"
        p="xl"
        style={{ filter: "drop-shadow(1px 1px 2px #8e8e8e77)" }}
      >
        <Stack gap="xl">
          <Group justify="space-between">
            <Text c="black" fw={500} fz="md">
              Transaction History
            </Text>
            <Button
              variant="outline"
              color="red.4"
              fz="xs"
              fw={500}
              leftSection={<IconDownload size={15} color="red" />}
            >
              Export
            </Button>
          </Group>
          <Stack gap="lg">
            {data.renter.dashboard.payments.transactionsCard.map((data, i) => {
              return <TransactionsCard key={i} {...data} />;
            })}
          </Stack>
        </Stack>
      </Card>
      {/* Hidden bookings fetcher for stats update */}
      <div style={{ display: "none" }}>
        <BookingsSection onStatsUpdate={setStats} />
      </div>
    </Stack>
  );
}
