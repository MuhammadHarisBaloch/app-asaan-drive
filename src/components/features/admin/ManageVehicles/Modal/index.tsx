"use client";
import { useState } from "react";
import { Modal, Textarea, Button, Group, Stack, Text } from "@mantine/core";

interface RejectVehicleModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  actionType: "reject" | "delete" | null;
}

export default function RejectVehicleModal({
  opened,
  onClose,
  onConfirm,
  actionType,
}: RejectVehicleModalProps) {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) return; // Only reject/delete require reason
    onConfirm(reason);
    setReason("");
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        actionType === "reject"
          ? "Reject Vehicle"
          : actionType === "delete"
          ? "Delete Vehicle"
          : ""
      }
      centered
      size="md"
    >
      <Stack>
        {actionType === "reject" && (
          <>
            <Text>Please provide a reason for rejecting this vehicle:</Text>
            <Textarea
              placeholder="Enter rejection reason..."
              value={reason}
              onChange={(e) => setReason(e.currentTarget.value)}
              autosize
              minRows={3}
            />
          </>
        )}

        {actionType === "delete" && (
          <>
            <Text>Please provide a reason for deleting this vehicle:</Text>
            <Textarea
              placeholder="Enter delete reason..."
              value={reason}
              onChange={(e) => setReason(e.currentTarget.value)}
              autosize
              minRows={3}
            />
          </>
        )}

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color={actionType === "reject" ? "red" : "red"}
            onClick={handleSubmit}
          >
            {actionType === "reject"
              ? "Reject Vehicle"
              : actionType === "delete"
              ? "Delete Vehicle"
              : "Confirm"}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
