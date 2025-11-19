"use client";
import { Stack, Card, Center, Text } from "@mantine/core";
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
import UserTableHeader from "./UserTableHeader";
import UserRowSkeleton from "./UserRowSkeleton";
import UserTableRow from "./UserTableRow";
import UserProfileModal from "./UserProfileModal";
import { UserModel } from "@/features/user/models/user.model";
import dayjs from "dayjs";

export default function ManageUsersSection() {
  const [queryText, setQueryText] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rawUsers, setRawUsers] = useState<
    (UserModel & { docId: string; joined: string; activity: string })[] | null
  >(null);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [mounted, setMounted] = useState(false);

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

  // 🚫 Toggle user block/unblock
  const toggleBlock = async (u: UserModel & { docId: string }) => {
    try {
      setProcessingId(u.docId);
      const current = (u.status || "Active").toString();
      const isBlocked = ["blocked", "inactive"].includes(current.toLowerCase());
      const newStatus = isBlocked ? "Active" : "Blocked";

      const userRef = doc(db, firebaseConstants.collections.users, u.docId);
      await updateDoc(userRef, { status: newStatus });

      showNotification({
        title: isBlocked ? "User unblocked" : "User blocked",
        message: `${u.fullName || u.email} is now ${newStatus}`,
        color: "green",
      });
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
          <UserTableHeader />
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <UserRowSkeleton key={i} />
            ))}
        </Card>
      </Stack>
    );
  }

  return (
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
        style={{ filter: "drop-shadow(1px 1px 2px #48484848)" }}
      >
        <UserTableHeader />

        {users === null &&
          Array(4)
            .fill(0)
            .map((_, i) => <UserRowSkeleton key={i} />)}

        {users !== null && users.length === 0 && (
          <Center p="lg">
            <Text color="dimmed">No users found.</Text>
          </Center>
        )}

        {users !== null &&
          users.map((u) => (
            <UserTableRow
              key={u.docId}
              user={u}
              onViewProfile={(user) => {
                setSelectedUser(user);
                setProfileOpen(true);
              }}
              onToggleBlock={toggleBlock}
              processingId={processingId}
            />
          ))}
      </Card>

      {/* 🔹 User Profile Modal */}
      <UserProfileModal
        opened={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={selectedUser}
      />
    </Stack>
  );
}
