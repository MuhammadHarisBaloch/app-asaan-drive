"use client";

import { Modal, Text, Textarea, Group, Button, Stack } from "@mantine/core";
import { useState } from "react";

interface RejectVehicleModalProps {
  opened: boolean;
  onClose: () => void;
  actionType: "reject" | "delete" | null;
  onConfirm: (reason: string) => Promise<void> | void;
}

export default function RejectVehicleModal({
  opened,
  onClose,
  actionType,
  onConfirm,
}: RejectVehicleModalProps) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const title = actionType === "reject" ? "Reject Vehicle" : "Delete Vehicle";

  const confirmLabel = actionType === "reject" ? "Reject" : "Delete";

  const handleConfirm = async () => {
    if (!reason.trim()) return;
    try {
      setLoading(true);
      await onConfirm(reason);
      setReason("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={600} fz="lg" c="red.4">
          {title}
        </Text>
      }
      centered
      radius="md"
    >
      <Stack>
        <Text size="sm" c="dimmed">
          Please provide a reason for {actionType}ing this vehicle.
        </Text>

        <Textarea
          placeholder={`Enter reason for ${actionType}`}
          value={reason}
          onChange={(e) => setReason(e.currentTarget.value)}
          minRows={3}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            loading={loading}
            disabled={!reason.trim()}
          >
            {confirmLabel}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
