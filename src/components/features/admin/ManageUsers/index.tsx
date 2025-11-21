"use client";
import {
  Stack,
  Card,
  Center,
  Text,
  ScrollArea,
  Table,
  Skeleton,
  Flex,
  Badge,
  Menu,
  Group,
  Modal,
  Textarea,
  Button,
} from "@mantine/core";
import { useEffect, useState, useMemo } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/networking/firebase";
import { firebaseConstants } from "@/constants/Firestore";
import { showNotification } from "@mantine/notifications";
import UserSearchInput from "./UserSearchInput";
import UserProfileModal from "./UserProfileModal";
import { UserModel } from "@/features/user/models/user.model";
import dayjs from "dayjs";
import {
  IconDotsVertical,
  IconEye,
  IconBan,
  IconUserCircle,
} from "@tabler/icons-react";

export default function ManageUsersSection() {
  const [queryText, setQueryText] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rawUsers, setRawUsers] = useState<
    (UserModel & { docId: string; joined: string; activity: string })[] | null
  >(null);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [mounted, setMounted] = useState(false);

  // New states for block modal
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState<
    (UserModel & { docId: string }) | null
  >(null);
  const [blockReason, setBlockReason] = useState("");

  // 🧠 Compute activity based on user type - ONLY ON CLIENT SIDE
  async function computeUserActivity(user: UserModel) {
    // Don't run during build/SSR
    if (typeof window === "undefined") return "—";

    try {
      // Dynamically import to avoid server-side dependencies
      const { fetchBookingDocs, fetchOwnerVehicleBookings } = await import(
        "@/features/booking"
      );
      const { listOwnerVehicleDocs } = await import("@/features/vehicle");

      // renter → count completed bookings
      if (user.userType === "renter") {
        const bookings = await fetchBookingDocs(user.id);
        const completed = bookings.filter((b) => b.status === "completed");
        return `${completed.length} bookings`;
      }

      // vehicle-owner → count vehicles + completed bookings
      if (user.userType === "vehicles-owner") {
        const vehicles = await listOwnerVehicleDocs(user.id);
        const bookings = await fetchOwnerVehicleBookings(user.id);
        const completed = bookings.filter((b) => b.status === "completed");
        return `${vehicles.length} vehicles | ${completed.length} bookings`;
      }

      // fallback
      return "—";
    } catch (err) {
      console.error("Error computing activity for user:", user.id, err);
      return "—";
    }
  }

  // 🟢 Firestore snapshot listener (async)
  useEffect(() => {
    setMounted(true);

    // Don't run Firestore operations during build
    if (typeof window === "undefined") return;

    const usersRef = collection(db, firebaseConstants.collections.users);

    const unsub = onSnapshot(
      usersRef,
      async (snapshot) => {
        const userPromises = snapshot.docs.map(async (d) => {
          const data = d.data() as UserModel;

          // 🕒 Format joined date
          let joinedStr = "—";
          const created = data.createdAt;
          if (created) {
            if (created instanceof Timestamp) {
              joinedStr = dayjs(created.toDate()).format("MMM D, YYYY");
            } else if (typeof (created as any)?.toDate === "function") {
              joinedStr = dayjs((created as any).toDate()).format(
                "MMM D, YYYY"
              );
            } else {
              joinedStr = dayjs(created).format("MMM D, YYYY");
            }
          }

          // 🧩 Compute activity for this user
          const activity = await computeUserActivity(data);

          return {
            ...data,
            docId: d.id,
            joined: joinedStr,
            activity,
          };
        });

        const users = await Promise.all(userPromises);

        // Filter out admins
        const filtered = users.filter(
          (u) => (u.userType || "").toLowerCase() !== "admin"
        );

        setRawUsers(filtered);
      },
      (err) => {
        console.error("users snapshot error:", err);
        showNotification({
          title: "Error",
          message: "Failed to load users.",
          color: "red",
        });
        setRawUsers([]);
      }
    );

    return () => unsub();
  }, []);

  // 🔍 Search filtering
  const users = useMemo(() => {
    if (!rawUsers) return null;
    const q = queryText.trim().toLowerCase();
    if (!q) return rawUsers;
    return rawUsers.filter((u) => {
      const email = (u.email || "").toLowerCase();
      const name = (u.fullName || "").toLowerCase();
      return email.includes(q) || name.includes(q);
    });
  }, [rawUsers, queryText]);

  // 🚫 Open block confirmation modal
  const openBlockModal = (user: UserModel & { docId: string }) => {
    const isBlocked = ["blocked", "inactive"].includes(
      (user.status || "Active").toLowerCase()
    );

    if (isBlocked) {
      // Direct unblock without modal
      toggleBlock(user);
    } else {
      // Open modal for blocking with reason
      setUserToBlock(user);
      setBlockReason("");
      setBlockModalOpen(true);
    }
  };

  // 🚫 Toggle user block/unblock
  const toggleBlock = async (
    u: UserModel & { docId: string },
    reason?: string
  ) => {
    try {
      setProcessingId(u.docId);
      const current = (u.status || "Active").toString();
      const isBlocked = ["blocked", "inactive"].includes(current.toLowerCase());
      const newStatus = isBlocked ? "Active" : "Blocked";

      const userRef = doc(db, firebaseConstants.collections.users, u.docId);
      await updateDoc(userRef, { status: newStatus });

      // ✅ Use existing notification system
      const { sendNotification } = await import("@/features/notification");

      const notificationData = {
        userId: u.id,
        title: isBlocked ? "Account Unblocked" : "Account Blocked",
        message: isBlocked
          ? "Your AsaanDrive account has been unblocked. You can now access all features."
          : `Your AsaanDrive account has been blocked.${
              reason ? ` Reason: ${reason}` : ""
            }`,
        type: "account",
      };

      // Send notification (automatically sends email too)
      await sendNotification(notificationData);

      showNotification({
        title: isBlocked ? "User unblocked" : "User blocked",
        message: `${
          u.fullName || u.email
        } is now ${newStatus} - Notification sent`,
        color: "green",
      });

      // Close modal if open
      if (blockModalOpen) {
        setBlockModalOpen(false);
        setUserToBlock(null);
        setBlockReason("");
      }
    } catch (err) {
      console.error(err);
      showNotification({
        title: "Error",
        message: "Failed to update user status",
        color: "red",
      });
    } finally {
      setProcessingId(null);
    }
  };

  // Handle block confirmation
  const handleConfirmBlock = () => {
    if (userToBlock) {
      toggleBlock(userToBlock, blockReason);
    }
  };

  // User Row Skeleton Component
  const UserRowSkeleton = () => {
    return (
      <Table.Tr style={{ borderTop: "1px solid #f1f1f1" }}>
        <Table.Td style={{ padding: "16px 24px" }}>
          <Flex align="center" gap="xs">
            <IconUserCircle size={30} color="gray" />
            <div>
              <Skeleton height={12} width={100} radius="sm" mb={4} />
              <Skeleton height={10} width={120} radius="sm" />
            </div>
          </Flex>
        </Table.Td>

        <Table.Td style={{ textAlign: "center", padding: "16px 24px" }}>
          <Skeleton height={20} width={60} radius="sm" />
        </Table.Td>

        <Table.Td style={{ textAlign: "center", padding: "16px 24px" }}>
          <Skeleton height={12} width={80} radius="sm" />
        </Table.Td>

        <Table.Td style={{ textAlign: "center", padding: "16px 24px" }}>
          <Skeleton height={20} width={60} radius="sm" />
        </Table.Td>

        <Table.Td style={{ textAlign: "center", padding: "16px 24px" }}>
          <Skeleton height={12} width={90} radius="sm" />
        </Table.Td>

        <Table.Td style={{ textAlign: "center", padding: "16px 24px" }}>
          <Skeleton height={12} width={100} radius="sm" />
        </Table.Td>

        <Table.Td style={{ textAlign: "center", padding: "16px 24px" }}>
          <Skeleton height={18} width={18} radius="sm" />
        </Table.Td>
      </Table.Tr>
    );
  };

  // User Table Row Component
  const UserTableRow = ({
    user,
    onViewProfile,
    onToggleBlock,
    processingId,
  }: any) => {
    const status = (user.status || "Active").toString();
    const isBlocked = ["blocked", "inactive"].includes(status.toLowerCase());

    return (
      <Table.Tr style={{ borderTop: "1px solid #f1f1f1" }}>
        {/* User Info */}
        <Table.Td style={{ padding: "16px 24px" }}>
          <Flex align="center" gap="xs">
            <IconUserCircle size={30} color="gray" />
            <div>
              <Text fz="12px" c="black">
                {user.fullName || "—"}
              </Text>
              <Text fz="10px" c="dimmed">
                {user.email || "—"}
              </Text>
            </div>
          </Flex>
        </Table.Td>

        {/* Role */}
        <Table.Td style={{ textAlign: "center", padding: "16px 24px" }}>
          <Badge
            variant="light"
            size="xs"
            c={user.userType === "renter" ? "blue" : "green"}
            bg={user.userType === "renter" ? "blue.1" : "green.1"}
            fw={600}
            style={{
              textTransform: "capitalize",
              minWidth: 80,
              textAlign: "center",
            }}
          >
            {user.userType || "user"}
          </Badge>
        </Table.Td>

        {/* City */}
        <Table.Td style={{ textAlign: "center", padding: "16px 24px" }}>
          <Text fz="12px">{user.city || "—"}</Text>
        </Table.Td>

        {/* Status */}
        <Table.Td style={{ textAlign: "center", padding: "16px 24px" }}>
          <Badge
            variant="light"
            size="xs"
            c={isBlocked ? "red" : "green"}
            bg={isBlocked ? "pink.1" : "green.1"}
            fw={600}
            style={{
              textTransform: "capitalize",
              minWidth: 80,
              textAlign: "center",
            }}
          >
            {status || "—"}
          </Badge>
        </Table.Td>

        {/* Joined */}
        <Table.Td style={{ textAlign: "center", padding: "16px 24px" }}>
          <Text fz="12px">{user.joined || "—"}</Text>
        </Table.Td>

        {/* Activity */}
        <Table.Td style={{ textAlign: "center", padding: "16px 24px" }}>
          <Text fz="12px" style={{ whiteSpace: "nowrap" }}>
            {user.activity || "—"}
          </Text>
        </Table.Td>

        {/* Actions */}
        <Table.Td style={{ textAlign: "center", padding: "16px 24px" }}>
          <Menu>
            <Menu.Target>
              <IconDotsVertical size={18} style={{ cursor: "pointer" }} />
            </Menu.Target>
            <Menu.Dropdown py="sm" px="md" style={{ borderRadius: "10px" }}>
              <Menu.Item onClick={() => onViewProfile(user)}>
                <Group gap="sm">
                  <IconEye size={15} color="gray" />
                  <Text size="sm" c="black">
                    View Profile
                  </Text>
                </Group>
              </Menu.Item>
              <Menu.Item
                onClick={() => onToggleBlock(user)}
                disabled={processingId === user.docId}
              >
                <Group gap="sm">
                  <IconBan size={15} color="gray" />
                  <Text size="sm" c="black">
                    {isBlocked ? "Unblock User" : "Block User"}
                  </Text>
                </Group>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    );
  };

  // Don't render during build/SSR
  if (!mounted) {
    return (
      <Stack p="lg" gap="xxl">
        <Stack gap={0}>
          <Text fz="xl" fw={600} c="black">
            Manage Users
          </Text>
          <Text fz="md">Loading users...</Text>
        </Stack>
        <Card
          py="lg"
          px="xl"
          radius="md"
          style={{ filter: "drop-shadow(1px 1px 2px #48484848)" }}
        >
          <UserSearchInput value={queryText} onChange={setQueryText} />
        </Card>
        <Card
          p={0}
          radius="md"
          style={{ filter: "drop-shadow(1px 1px 2px #48484848)" }}
        >
          <Table
            horizontalSpacing="md"
            verticalSpacing="xs"
            style={{ minWidth: 800 }}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ textAlign: "left", paddingLeft: "8px" }}>
                  <Text fz="xs" fw={600}>
                    User
                  </Text>
                </Table.Th>
                <Table.Th style={{ textAlign: "center" }}>
                  <Text fz="xs" fw={600}>
                    Role
                  </Text>
                </Table.Th>
                <Table.Th style={{ textAlign: "center" }}>
                  <Text fz="xs" fw={600}>
                    City
                  </Text>
                </Table.Th>
                <Table.Th style={{ textAlign: "center" }}>
                  <Text fz="xs" fw={600}>
                    Status
                  </Text>
                </Table.Th>
                <Table.Th style={{ textAlign: "center" }}>
                  <Text fz="xs" fw={600}>
                    Joined Date
                  </Text>
                </Table.Th>
                <Table.Th style={{ textAlign: "center" }}>
                  <Text fz="xs" fw={600}>
                    Activity
                  </Text>
                </Table.Th>
                <Table.Th style={{ textAlign: "center" }}>
                  <Text fz="xs" fw={600}>
                    Action
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <UserRowSkeleton key={i} />
                ))}
            </Table.Tbody>
          </Table>
        </Card>
      </Stack>
    );
  }

  return (
    <>
      <Stack p="lg" gap="xxl">
        {/* 🔹 Header */}
        <Stack gap={0}>
          <Text fz="xl" fw={600} c="black">
            Manage Users
          </Text>
          <Text fz="md">
            View and manage all registered users on the platform.
          </Text>
        </Stack>

        {/* 🔹 Search Card */}
        <Card
          py="lg"
          px="xl"
          radius="md"
          style={{ filter: "drop-shadow(1px 1px 2px #48484848)" }}
        >
          <UserSearchInput value={queryText} onChange={setQueryText} />
        </Card>

        {/* 🔹 Users Table */}
        <Card
          p={0}
          radius="md"
          style={{
            filter: "drop-shadow(1px 1px 2px #48484848)",
            overflow: "hidden",
          }}
        >
          <ScrollArea>
            <Table
              horizontalSpacing="md"
              verticalSpacing="xs"
              style={{ minWidth: 800 }}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ textAlign: "left", paddingLeft: "3rem" }}>
                    <Text fz="xs" fw={600}>
                      User
                    </Text>
                  </Table.Th>
                  <Table.Th style={{ textAlign: "center" }}>
                    <Text fz="xs" fw={600}>
                      Role
                    </Text>
                  </Table.Th>
                  <Table.Th style={{ textAlign: "center" }}>
                    <Text fz="xs" fw={600}>
                      City
                    </Text>
                  </Table.Th>
                  <Table.Th style={{ textAlign: "center" }}>
                    <Text fz="xs" fw={600}>
                      Status
                    </Text>
                  </Table.Th>
                  <Table.Th style={{ textAlign: "center" }}>
                    <Text fz="xs" fw={600}>
                      Joined Date
                    </Text>
                  </Table.Th>
                  <Table.Th style={{ textAlign: "center" }}>
                    <Text fz="xs" fw={600}>
                      Activity
                    </Text>
                  </Table.Th>
                  <Table.Th style={{ textAlign: "center" }}>
                    <Text fz="xs" fw={600}>
                      Action
                    </Text>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {users === null &&
                  Array(4)
                    .fill(0)
                    .map((_, i) => <UserRowSkeleton key={i} />)}

                {users !== null && users.length === 0 && (
                  <Table.Tr>
                    <Table.Td
                      colSpan={7}
                      style={{ textAlign: "center", padding: "40px" }}
                    >
                      <Text>No users found.</Text>
                    </Table.Td>
                  </Table.Tr>
                )}

                {users !== null &&
                  users.map((u) => (
                    <UserTableRow
                      key={u.docId}
                      user={u}
                      onViewProfile={(user: any) => {
                        setSelectedUser(user);
                        setProfileOpen(true);
                      }}
                      onToggleBlock={openBlockModal}
                      processingId={processingId}
                    />
                  ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Card>

        {/* 🔹 User Profile Modal */}
        <UserProfileModal
          opened={profileOpen}
          onClose={() => setProfileOpen(false)}
          user={selectedUser}
        />
      </Stack>

      {/* 🔹 Block User Confirmation Modal */}
      <Modal
        opened={blockModalOpen}
        onClose={() => {
          setBlockModalOpen(false);
          setUserToBlock(null);
          setBlockReason("");
        }}
        title="Block User"
        size="lg"
        centered
      >
        <Stack>
          <Text>
            You are about to block{" "}
            <strong>{userToBlock?.fullName || userToBlock?.email}</strong>.
            Please provide a reason for blocking this user.
          </Text>

          <Textarea
            label="Reason for blocking"
            placeholder="Enter the reason for blocking this user..."
            value={blockReason}
            onChange={(event) => setBlockReason(event.currentTarget.value)}
            minRows={3}
            required
          />

          <Text fz="sm" c="dimmed">
            This reason will be sent to the user via email notification.
          </Text>

          <Group justify="flex-end" mt="md">
            <Button
              variant="light"
              onClick={() => {
                setBlockModalOpen(false);
                setUserToBlock(null);
                setBlockReason("");
              }}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleConfirmBlock}
              disabled={
                !blockReason.trim() || processingId === userToBlock?.docId
              }
              loading={processingId === userToBlock?.docId}
            >
              Block User
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
