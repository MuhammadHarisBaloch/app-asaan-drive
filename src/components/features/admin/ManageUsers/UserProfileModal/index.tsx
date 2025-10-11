import { UserModel } from "@/features/user/models/user.model";
import {
  Modal,
  Stack,
  Group,
  Button,
  Center,
  Text,
  Divider,
  SimpleGrid,
  Badge,
} from "@mantine/core";

import {
  IconUserCircle,
  IconMapPin,
  IconPhone,
  IconWallet,
  IconUser,
} from "@tabler/icons-react";
import dayjs from "dayjs";

function formatJoined(user: UserModel | null) {
  if (!user) return "—";
  const c = user.createdAt;
  if (c) {
    // Firestore Timestamp (has toDate)
    if (typeof (c as any)?.toDate === "function") {
      return dayjs((c as any).toDate()).format("MMM D, YYYY");
    }
    // plain date string/number
    return dayjs(c).format("MMM D, YYYY");
  }
  if (user.joined) return dayjs(user.joined).format("MMM D, YYYY");
  return "—";
}

interface UserProfileModalProps {
  opened: boolean;
  onClose: () => void;
  user: UserModel | null;
}

export default function UserProfileModal({
  opened,
  onClose,
  user,
}: UserProfileModalProps) {
  // Inside UserProfileModal.tsx

  if (!user) {
    return (
      <Modal
        opened={opened}
        onClose={onClose}
        title="User Profile"
        size="lg"
        centered
      >
        <Center style={{ height: 200 }}>
          <Text>Loading...</Text>
        </Center>
      </Modal>
    );
  }

  const joinedDate = user.createdAt
    ? "toDate" in user.createdAt
      ? dayjs(user.createdAt.toDate()).format("MMM D, YYYY")
      : dayjs(user.createdAt).format("MMM D, YYYY")
    : "—";

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="User Profile"
      size="lg"
      centered
      overlayProps={{ blur: 3, opacity: 0.55 }}
    >
      <Stack gap="lg">
        {/* Avatar + Name */}
        <Group gap="md" align="center">
          <IconUserCircle size={60} color="black" />
          <Stack gap={0}>
            <Text fw={700} fz="lg" c="black">
              {user.fullName || user.email}
            </Text>
            <Text>{user.email}</Text>
          </Stack>
        </Group>

        <Divider />

        {/* Info Grid */}
        <SimpleGrid
          cols={3}
          spacing="md"
          // @ts-ignore
          breakpoints={[{ maxWidth: 768, cols: 1 }]}
        >
          <Stack gap={4}>
            <Group gap={4} align="center">
              <IconUser size={16} color="#6b6b6b" />
              <Text fz="xs">Role</Text>
            </Group>
            <Badge
              variant="light"
              size="sm"
              c={user.userType === "renter" ? "blue" : "green"}
              bg={user.userType === "renter" ? "blue.1" : "green.1"}
              fw={600}
              styles={{
                root: {
                  textTransform: "capitalize",
                  minWidth: 80,
                  textAlign: "center",
                  justifySelf: "center",
                },
              }}
            >
              {user.userType}
            </Badge>
          </Stack>

          <Stack gap={4}>
            <Group gap={4} align="center">
              <IconMapPin size={16} color="#6b6b6b" />
              <Text fz="xs">City</Text>
            </Group>
            <Text fw={600}>{user.city || "—"}</Text>
          </Stack>

          <Stack gap={4}>
            <Group gap={4} align="center">
              <IconPhone size={16} color="#6b6b6b" />
              <Text fz="xs">Phone</Text>
            </Group>
            <Text fw={600}>{user.phoneNumber || "—"}</Text>
          </Stack>

          <Stack gap={4}>
            <Group gap={4} align="center">
              <IconWallet size={16} color="#6b6b6b" />
              <Text fz="xs">Wallet</Text>
            </Group>
            <Text fw={600}>{user.walletBalance ?? "0"}</Text>
          </Stack>

          <Stack gap={4}>
            <Text fz="xs">Status</Text>
            <Badge
              // color={user.status === "Blocked" ? "red" : "green"}
              // variant="light"
              variant="light"
              size="sm"
              c={user.status === "Blocked" ? "red" : "green"}
              bg={user.status === "Blocked" ? "pink.1" : "green.1"}
              fw={600}
              styles={{
                root: {
                  textTransform: "capitalize",
                  minWidth: 80,
                  textAlign: "center",
                  justifySelf: "center",
                },
              }}
            >
              {user.status || "Active"}
            </Badge>
          </Stack>

          <Stack gap={4}>
            <Text fz="xs">Joined</Text>
            <Text fw={600}>{formatJoined(user)}</Text>
          </Stack>
        </SimpleGrid>

        <Divider />

        {/* Close Button */}
        <Group justify="flex-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
