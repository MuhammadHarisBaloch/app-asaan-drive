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
import { useState, useEffect, useRef } from "react";
import { BookingModel } from "@/features/booking/models/booking.model";
import { fetchOwnerVehicleBookings } from "@/features/booking";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserModel } from "@/features/user/models/user.model";
import { getUserDocument, updateUserDocumentField } from "@/features/user";
import dayjs from "dayjs";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { db } from "@/networking/firebase";

export default function EarningAndPayoutSection() {
  const [openMainModal, setOpenMainModal] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);
  const [bookings, setBookings] = useState<BookingModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableBalance, setAvailableBalance] = useState<number>(0);

  // Track processed booking IDs
  const processedBookingIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) return;

      try {
        // Get user data first
        const userData = await getUserDocument(firebaseUser.uid);
        setUser(userData);
        setAvailableBalance(userData?.availableBalance || 0);

        // Fetch all bookings for display
        const ownerBookings = await fetchOwnerVehicleBookings(firebaseUser.uid);
        setBookings(ownerBookings || []);

        // Add existing released bookings to processed set
        ownerBookings?.forEach((booking) => {
          if (booking.payment?.status === "released" && booking.bookingId) {
            processedBookingIds.current.add(booking.bookingId);
          }
        });

        setLoading(false);

        // Real-time listener for user document
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const unsubscribeUser = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const updatedUser = docSnapshot.data() as UserModel;
            setAvailableBalance(updatedUser.availableBalance || 0);
          }
        });

        // Real-time listener for bookings
        const bookingsQuery = query(
          collection(db, "bookings"),
          where("vehicleOwnerId", "==", firebaseUser.uid)
        );

        const unsubscribeBookings = onSnapshot(
          bookingsQuery,
          async (snapshot) => {
            const allBookings = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as unknown as BookingModel[];

            setBookings(allBookings);

            // Find NEW released bookings (not processed before)
            const newReleasedBookings = allBookings.filter((booking) => {
              const isReleased = booking.payment?.status === "released";
              const hasBookingId = !!booking.bookingId;
              const isNew = !processedBookingIds.current.has(
                booking.bookingId!
              );

              return isReleased && hasBookingId && isNew;
            });

            // Process only NEW bookings
            if (newReleasedBookings.length > 0) {
              let totalNewEarnings = 0;

              newReleasedBookings.forEach((booking) => {
                const earning =
                  (booking.totalPrice || 0) - (booking.platformFee || 0);
                totalNewEarnings += earning;

                // Mark this booking as processed
                processedBookingIds.current.add(booking.bookingId!);
              });

              if (totalNewEarnings > 0) {
                // Get CURRENT balance from Firestore to ensure we have latest value
                const currentUserData = await getUserDocument(firebaseUser.uid);
                const currentBalance = currentUserData?.availableBalance || 0;

                // Add new earnings to CURRENT balance
                const newBalance = currentBalance + totalNewEarnings;

                // Update Firestore
                await updateUserDocumentField(firebaseUser.uid, {
                  availableBalance: newBalance,
                });

                console.log(
                  `Added ${totalNewEarnings} to current balance ${currentBalance}. New balance: ${newBalance}`
                );
              }
            }
          }
        );

        return () => {
          unsubscribeUser();
          unsubscribeBookings();
        };
      } catch (error) {
        console.error("Error in earnings section:", error);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Calculate total earnings for display
  const totalEarnings = bookings
    .filter((b) => b.payment?.status === "released")
    .reduce((sum, b) => sum + ((b.totalPrice || 0) - (b.platformFee || 0)), 0);

  // Calculate this month earnings for display
  const currentMonthEarnings = bookings
    .filter((b) => b.payment?.status === "released" && b.pickUpDate)
    .filter((b) => dayjs(b.pickUpDate).isSame(dayjs(), "month"))
    .reduce((sum, b) => sum + ((b.totalPrice || 0) - (b.platformFee || 0)), 0);

  // Chart data for display
  const chartData = [...Array(6)].map((_, i) => {
    const month = dayjs().subtract(5 - i, "month");
    const monthlyEarnings = bookings
      .filter((b) => b.payment?.status === "released" && b.pickUpDate)
      .filter((b) => dayjs(b.pickUpDate).isSame(month, "month"))
      .reduce(
        (sum, b) => sum + ((b.totalPrice || 0) - (b.platformFee || 0)),
        0
      );

    return { month: month.format("MMM"), Sales: monthlyEarnings };
  });

  // Withdraw handler
  const handleWithdrawComplete = async (amount: number) => {
    if (!user) return;

    const newBalance = Math.max(0, availableBalance - amount);
    await updateUserDocumentField(user.id, { availableBalance: newBalance });
  };

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

          <Card radius="md" p="xl">
            <Stack gap="lg">
              <Flex align="center" gap="md">
                <Center
                  h={50}
                  w={50}
                  bg="blue.1"
                  style={{ borderRadius: "10px" }}
                >
                  <IconCurrencyDollar size={25} color="blue" />
                </Center>
                <Stack gap={0}>
                  <Text fz="xs" fw={500}>
                    Total Earnings
                  </Text>
                  <Text fz="xl" fw={600}>
                    Rs {totalEarnings.toLocaleString()}
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
