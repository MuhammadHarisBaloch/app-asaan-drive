"use client";
import { Menu, Stack, Group, Text } from "@mantine/core";
import {
  IconCheck,
  IconX,
  IconBan,
  IconTrashX,
  IconEye,
  IconDots,
} from "@tabler/icons-react";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";

interface VehicleMenuProps {
  vehicle: VehicleModel;
  onView: () => void;
  onApprove: () => Promise<void>;
  onReject: () => void;
  onActivate: () => Promise<void>;
  onDeactivate: () => Promise<void>;
  onDelete: () => void;
}

export default function VehicleMenu({
  vehicle,
  onView,
  onApprove,
  onReject,
  onActivate,
  onDeactivate,
  onDelete,
}: VehicleMenuProps) {
  return (
    <Menu shadow="md" width={180} radius="md">
      <Menu.Target>
        <IconDots size={18} style={{ cursor: "pointer" }} />
      </Menu.Target>

      <Menu.Dropdown py="sm" px="md">
        <Stack gap="sm">
          <Menu.Item onClick={onView}>
            <Group gap="sm">
              <IconEye size={15} color="blue" />
              <Text size="12px" c="blue">
                View Details
              </Text>
            </Group>
          </Menu.Item>

          {vehicle.status === "pending" && (
            <>
              <Menu.Item onClick={onApprove}>
                <Group gap="sm">
                  <IconCheck size={15} color="green" />
                  <Text size="12px" c="green">
                    Approve Vehicle
                  </Text>
                </Group>
              </Menu.Item>
              <Menu.Item onClick={onReject}>
                <Group gap="sm">
                  <IconX size={15} color="red" />
                  <Text size="12px" c="red.4">
                    Reject Vehicle
                  </Text>
                </Group>
              </Menu.Item>
            </>
          )}

          {vehicle.status === "inactive" && (
            <>
              <Menu.Item onClick={onActivate}>
                <Group gap="sm">
                  <IconCheck size={15} color="green" />
                  <Text size="12px" c="green">
                    Activate
                  </Text>
                </Group>
              </Menu.Item>
              <Menu.Item onClick={onDelete}>
                <Group gap="sm">
                  <IconTrashX size={15} color="red" />
                  <Text size="12px" c="red.4">
                    Delete
                  </Text>
                </Group>
              </Menu.Item>
            </>
          )}

          {vehicle.status === "available" && (
            <>
              <Menu.Item onClick={onDeactivate}>
                <Group gap="sm">
                  <IconBan size={15} color="orange" />
                  <Text size="12px" c="orange">
                    Inactivate
                  </Text>
                </Group>
              </Menu.Item>
              <Menu.Item onClick={onDelete}>
                <Group gap="sm">
                  <IconTrashX size={15} color="red" />
                  <Text size="12px" c="red.4">
                    Delete
                  </Text>
                </Group>
              </Menu.Item>
            </>
          )}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
