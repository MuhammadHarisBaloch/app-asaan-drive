// UserTableRow.tsx
import React, { useMemo } from "react";
import { UserModel } from "@/features/user/models/user.model";
import { Flex, Text, Badge, Menu, Group, Stack } from "@mantine/core";
import {
  IconDotsVertical,
  IconEye,
  IconBan,
  IconUserCircle,
} from "@tabler/icons-react";
import { USER_TABLE_GRID } from "@/constants/Layout";
import type { CSSProperties } from "react";

interface UserTableRowProps {
  user: UserModel & { docId: string; joined?: string; activity?: string };
  onViewProfile: (u: UserModel & { docId: string; joined?: string }) => void;
  onToggleBlock: (u: UserModel & { docId: string; joined?: string }) => void;
  processingId: string | null;
}

function UserTableRowBase({
  user,
  onViewProfile,
  onToggleBlock,
  processingId,
}: UserTableRowProps) {
  const status = (user.status || "Active").toString();
  const isBlocked = ["blocked", "inactive"].includes(status.toLowerCase());

  // Memoize the badge styles so they are stable across renders

  const badgeStyles = useMemo(
    () => ({
      root: {
        textTransform: "capitalize",
        minWidth: 80,
        textAlign: "center",
        justifySelf: "center",
      } as CSSProperties,
    }),
    []
  );

  // Memoized container style (static)
  const containerStyle = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: USER_TABLE_GRID,
      alignItems: "center",
      borderTop: "1px solid #f1f1f1",
    }),
    []
  );

  return (
    <Flex py="md" px="lg" style={containerStyle}>
      {/* User Info */}
      <Flex align="center" gap="xs" pl="sm">
        <IconUserCircle size={30} color="gray" />
        <Stack gap={0}>
          <Text fz="12px" c="black">
            {user.fullName || "—"}
          </Text>
          <Text fz="10px" c="dimmed">
            {user.email || "—"}
          </Text>
        </Stack>
      </Flex>

      {/* Role */}
      <Badge
        variant="light"
        size="xs"
        c={user.userType === "renter" ? "blue" : "green"}
        bg={user.userType === "renter" ? "blue.1" : "green.1"}
        fw={600}
        styles={badgeStyles}
      >
        {user.userType || "user"}
      </Badge>

      {/* City */}
      <Text fz="12px" style={{ justifySelf: "center" }}>
        {user.city || "—"}
      </Text>

      {/* Status */}
      <Badge
        variant="light"
        size="xs"
        c={isBlocked ? "red" : "green"}
        bg={isBlocked ? "pink.1" : "green.1"}
        fw={600}
        styles={badgeStyles}
      >
        {status || "—"}
      </Badge>

      {/* Joined */}
      <Text fz="12px" style={{ justifySelf: "center" }}>
        {user.joined || "—"}
      </Text>

      {/* Activity — ensure this is inline and centered */}
      <Text fz="12px" style={{ justifySelf: "center", whiteSpace: "nowrap" }}>
        {user.activity || "—"}
      </Text>

      {/* Actions */}
      <Flex justify="center" style={{ justifySelf: "center" }}>
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
      </Flex>
    </Flex>
  );
}

// Memoize the row component to reduce re-renders for big lists
export default React.memo(UserTableRowBase);
