import { useState } from "react";
import { Button, Flex, Stack, Textarea } from "@mantine/core";
import { modals } from "@mantine/modals";

interface RejectReasonModalProps {
  onSubmit: (reason: string) => void;
}

export function RejectReasonModal({ onSubmit }: RejectReasonModalProps) {
  const [reason, setReason] = useState("");

  return (
    <Stack>
      <Textarea
        placeholder="Enter rejection reason"
        value={reason}
        onChange={(e) => setReason(e.currentTarget.value)}
        minRows={3}
      />

      <Flex gap="md">
        <Button fullWidth onClick={() => modals.closeAll()}>
          Cancel
        </Button>
        <Button
          fullWidth
          color="red"
          onClick={() => {
            onSubmit(reason); // ✅ Pass reason here
            modals.closeAll();
          }}
        >
          Submit Reason & Reject
        </Button>
      </Flex>
    </Stack>
  );
}
