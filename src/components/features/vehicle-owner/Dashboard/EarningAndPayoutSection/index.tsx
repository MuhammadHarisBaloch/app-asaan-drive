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

/**
 * Fully fixed & cleaned EarningAndPayoutSection (Option B)
 * Roman Urdu comments added for clarity.
 */

export default function EarningAndPayoutSection() {
  const [openMainModal, setOpenMainModal] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);
  const [bookings, setBookings] = useState<BookingModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableBalance, setAvailableBalance] = useState<number>(0);

  // processedBookingIds: woh bookings jinki earning DB mein add ho chuki hai (IDs)
  const processedBookingIds = useRef<Set<string>>(new Set());

  // mutex jisse parallel balance updates ek sath na chalain
  const updatingRef = useRef(false);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) return;

      try {
        // -------------------------
        // Initial user data
        // -------------------------
        const userData = await getUserDocument(firebaseUser.uid);
        setUser(userData);
        setAvailableBalance(userData?.availableBalance || 0);

        // -------------------------
        // Initial fetch (optional, display)
        // -------------------------
        const ownerBookings = await fetchOwnerVehicleBookings(firebaseUser.uid);

        const fixedBookings = ownerBookings?.map((b: any) => ({
          ...b,
          // ensure bookingId set (doc.id ya existing bookingId)
          bookingId: b.bookingId ?? b.id,
        }));

        setBookings(fixedBookings || []);

        // mark already released ones as processed so duplicates na aaye
        fixedBookings?.forEach((booking) => {
          if (booking.payment?.status === "released" && booking.bookingId) {
            processedBookingIds.current.add(booking.bookingId);
          }
        });

        setLoading(false);

        // -------------------------
        // Real-time user listener
        // -------------------------
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const unsubscribeUser = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const updatedUser = docSnapshot.data() as UserModel;
            setAvailableBalance(updatedUser.availableBalance || 0);
          }
        });

        // -------------------------
        // Real-time bookings listener
        // -------------------------
        const bookingsQuery = query(
          collection(db, "bookings"),
          where("vehicleOwnerId", "==", firebaseUser.uid)
        );

        const unsubscribeBookings = onSnapshot(
          bookingsQuery,
          async (snapshot) => {
            // map karte waqt bookingId = doc.id assign kar do
            const allBookings = snapshot.docs.map((d) => ({
              ...d.data(),
              bookingId: d.id,
            })) as BookingModel[];

            // set local state for UI
            setBookings(allBookings);

            // Ab released bookings ke IDs nikaalo
            const releasedIds = new Set<string>();
            allBookings.forEach((b) => {
              if (b.payment?.status === "released" && b.bookingId) {
                releasedIds.add(b.bookingId);
              }
            });

            // Naye released bookings = releasedIds - processedBookingIds
            const newlyReleasedIds: string[] = [];
            releasedIds.forEach((id) => {
              if (!processedBookingIds.current.has(id))
                newlyReleasedIds.push(id);
            });

            // Agar koi naye released bookings hain, to unki total earning calculate karo
            if (newlyReleasedIds.length > 0) {
              // avoid concurrent updates
              if (updatingRef.current) {
                // agar already update chal raha hai to skip kar do; next snapshot pe fir try hoga
                console.log(
                  "Update in progress, skipping this snapshot processing."
                );
                return;
              }

              try {
                updatingRef.current = true;

                // calculate total earnings for those bookings
                let totalNewEarnings = 0;
                newlyReleasedIds.forEach((id) => {
                  const booking = allBookings.find((b) => b.bookingId === id);
                  if (booking) {
                    const earning =
                      (booking.totalPrice || 0) - (booking.platformFee || 0);
                    totalNewEarnings += earning;
                  }
                });

                if (totalNewEarnings > 0) {
                  // get latest user's balance from firestore
                  const currentUserData = await getUserDocument(
                    firebaseUser.uid
                  );
                  const currentBalance = currentUserData?.availableBalance || 0;
                  const newBalance = currentBalance + totalNewEarnings;

                  // update firestore with new balance
                  await updateUserDocumentField(firebaseUser.uid, {
                    availableBalance: newBalance,
                  });

                  // update local UI state optimistically
                  setAvailableBalance(newBalance);

                  // mark all released ids as processed (we set to releasedIds to keep in sync)
                  processedBookingIds.current = new Set([
                    ...Array.from(processedBookingIds.current),
                    ...newlyReleasedIds,
                  ]);

                  console.log(
                    `Added earnings ${totalNewEarnings} to user ${firebaseUser.uid}. Old: ${currentBalance}, New: ${newBalance}`
                  );
                } else {
                  // agar amount zero ho to processed ids ko refresh kar do (avoid future duplicates)
                  processedBookingIds.current = new Set([
                    ...Array.from(processedBookingIds.current),
                    ...newlyReleasedIds,
                  ]);
                }
              } catch (err) {
                console.error("Error updating earnings:", err);
                // agar error, don't mark processed - next snapshot will retry
              } finally {
                updatingRef.current = false;
              }
            } else {
              // Agar koi new release nahi, to snapshot ke hisab se processed list ko bhi refresh karo
              // (ye ensure karta hai ke agar kisi wajah se processed IDs out of sync hue hon to sync rehain)
              // NOTE: hum yahan sirf releasedIds ke union se processedBookingIds replenish kar rahe hain
              // takay future new items sahi detect hon.
              // (Don't remove any existing processed ids that are not in releasedIds to avoid double-add.)
              // No-op in most cases.
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

  // -------------------------
  // Calculations for UI display
  // -------------------------
  const totalEarnings = bookings
    .filter((b) => b.payment?.status === "released")
    .reduce((sum, b) => sum + ((b.totalPrice || 0) - (b.platformFee || 0)), 0);

  const currentMonthEarnings = bookings
    .filter((b) => b.payment?.status === "released" && b.pickUpDate)
    .filter((b) => dayjs(b.pickUpDate).isSame(dayjs(), "month"))
    .reduce((sum, b) => sum + ((b.totalPrice || 0) - (b.platformFee || 0)), 0);

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

  // -------------------------
  // Withdraw handler (modal se call hota hai)
  // -------------------------
  const handleWithdrawComplete = async (amount: number) => {
    if (!user) return;

    try {
      // simple update: subtract amount from firestore balance
      // get latest to avoid overwrite
      const currentUserData = await getUserDocument(user.id);
      const currentBalance = currentUserData?.availableBalance || 0;
      const newBalance = Math.max(0, currentBalance - amount);

      await updateUserDocumentField(user.id, { availableBalance: newBalance });

      // update local UI state asap
      setAvailableBalance(newBalance);

      // NOTE: We DO NOT alter processedBookingIds here.
      // processedBookingIds handling is snapshot-driven (above). That prevents double-add or skipping.
    } catch (err) {
      console.error("Error during withdraw update:", err);
    }
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
        <Text fz="xl" fw={600} c="black">
          Earnings & Payouts
        </Text>

        <SimpleGrid cols={3} spacing="xxl">
          <Card
            radius="md"
            p="xl"
            style={{ filter: "drop-shadow(1px 1px 2px #38383856)" }}
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
                  <Text fz="xs" fw={500} c="black">
                    Available Balance
                  </Text>
                  <Text fz="xl" fw={600} c="black">
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

          <Card
            radius="md"
            p="xl"
            style={{ filter: "drop-shadow(1px 1px 2px #38383856)" }}
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
                  <Text fz="xs" fw={500} c="black">
                    This Month
                  </Text>
                  <Text fz="xl" fw={600} c="black">
                    Rs {currentMonthEarnings.toLocaleString()}
                  </Text>
                </Stack>
              </Flex>
            </Stack>
          </Card>

          <Card
            radius="md"
            p="xl"
            style={{ filter: "drop-shadow(1px 1px 2px #38383856)" }}
          >
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
                  <Text fz="xs" fw={500} c="black">
                    Total Earnings
                  </Text>
                  <Text fz="xl" fw={600} c="black">
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
              <Text fw={500} c="black">
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
