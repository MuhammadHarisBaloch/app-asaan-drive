import { Button, Divider, Flex, Stack, Text, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
interface JazzCashModalContentProps {
  onClose: () => void;
  onBack: () => void;
}
export default function JazzCashModalContent({
  onClose,
  onBack,
}: JazzCashModalContentProps) {
  const [jazzcashNumber, setJazzcashNumber] = useState<string>("");
  return (
    <Stack px="md" pt="xl" pb="sm" gap="xl">
      <Stack align="center" gap={0}>
        <Text fz="md" c="black" fw={500}>
          Enter Account Details
        </Text>
        <Text fz="xs">Please provide your JazzCash details</Text>
      </Stack>
      <TextInput
        required
        size="md"
        radius="md"
        label="Phone Number"
        placeholder="03XXXXXXXXX"
        value={jazzcashNumber}
        onChange={(event) => setJazzcashNumber(event.currentTarget.value)}
        styles={{
          label: {
            fontSize: "14px",
          },
          input: {
            fontSize: "14px",
          },
        }}
      />
      <Divider />
      <Flex gap="md">
        <Button
          fullWidth
          size="md"
          fw={500}
          variant="outline"
          color="black"
          onClick={onBack}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          size="md"
          fw={500}
          onClick={() => {
            if (jazzcashNumber.length === 11) {
              onClose();
              notifications.show({
                title: "Successfully Done ",
                message: "withdrawal amount Processing time: 1-24 hours.",
                color: "green",
              });
              console.log("Jazzcash Number is :", jazzcashNumber);
            } else {
              notifications.show({
                title: "Something wrong",
                message: "Invalid Jazzcash number",
                color: "red",
              });
            }
          }}
        >
          Continue
        </Button>
      </Flex>
    </Stack>
  );
}
