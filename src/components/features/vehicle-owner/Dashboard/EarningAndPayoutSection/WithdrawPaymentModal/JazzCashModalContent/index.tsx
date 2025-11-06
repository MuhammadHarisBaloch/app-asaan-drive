import {
  Button,
  Divider,
  Flex,
  Stack,
  Text,
  TextInput,
  Box,
  Center,
  Badge,
  NumberInput,
  Group,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { IconWallet } from "@tabler/icons-react";

interface JazzCashModalContentProps {
  onClose: () => void;
  onBack: () => void;
  availableBalance: number;
}

export default function JazzCashModalContent({
  onClose,
  onBack,
  availableBalance,
}: JazzCashModalContentProps) {
  const [jazzcashNumber, setJazzcashNumber] = useState<string>("");
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(
    availableBalance > 0 ? Math.min(availableBalance, 50000) : 0
  );

  // 🔹 Handle amount change
  const handleAmountChange = (value: string | number) => {
    const numValue =
      typeof value === "string" ? (value === "" ? 0 : Number(value)) : value;
    setWithdrawalAmount(numValue);
  };

  const withdrawalFee = 10;
  const netAmount = Math.max(0, withdrawalAmount - withdrawalFee);
  const canSubmit =
    jazzcashNumber.length === 11 &&
    withdrawalAmount >= 500 &&
    withdrawalAmount <= availableBalance;

  return (
    <Stack px="md" pt="xl" pb="sm" gap="xl">
      <Stack align="center" gap={0}>
        <Text fz="md" c="black" fw={500}>
          Enter Account Details
        </Text>
        <Text fz="xs">Please provide your JazzCash details</Text>
      </Stack>

      {/* 🔹 Available Balance - Your Design Style */}
      <Box bg="#ff00001c" p="lg" style={{ borderRadius: "20px" }}>
        <Flex align="center" gap="md">
          <Center h={40} w={40} bg="red.0" style={{ borderRadius: "10px" }}>
            <IconWallet size={20} color="red" />
          </Center>
          <Stack gap={0}>
            <Text fz="12px" c="red.4" fw={500}>
              Available Balance
            </Text>
            <Text fz="lg" c="red.4" fw={600}>
              Rs {availableBalance.toLocaleString()}
            </Text>
          </Stack>
          {availableBalance === 0 && (
            <Badge color="red" variant="light">
              No Funds
            </Badge>
          )}
        </Flex>
      </Box>

      {/* 🔹 Withdrawal Amount */}
      <Stack gap={0}>
        <NumberInput
          size="md"
          radius="md"
          label="Withdrawal Amount"
          placeholder="0"
          value={withdrawalAmount}
          onChange={handleAmountChange}
          min={500}
          max={availableBalance}
          disabled={availableBalance === 0}
          leftSection={<Text fz="xs">Pkr</Text>}
          error={
            withdrawalAmount > availableBalance
              ? "Amount exceeds available balance"
              : withdrawalAmount < 500
              ? "Minimum withdrawal is Rs. 500"
              : null
          }
          styles={{
            label: {
              fontSize: "14px",
            },
            input: {
              fontSize: "14px",
            },
          }}
        />
        <Text fz="12px" c="dimmed">
          Maximum: PKR {availableBalance.toLocaleString()} • Minimum: PKR 500
        </Text>
      </Stack>

      <TextInput
        required
        size="md"
        radius="md"
        label="JazzCash Number"
        placeholder="03XXXXXXXXX"
        value={jazzcashNumber}
        onChange={(event) => setJazzcashNumber(event.currentTarget.value)}
        error={
          jazzcashNumber && jazzcashNumber.length !== 11
            ? "JazzCash number must be 11 digits"
            : null
        }
        styles={{
          label: {
            fontSize: "14px",
          },
          input: {
            fontSize: "14px",
          },
        }}
      />

      {/* 🔹 Transaction Summary - Your Design Style */}
      {withdrawalAmount > 0 && (
        <Box p="lg" bg="#FFFBEB" style={{ borderRadius: "20px" }}>
          <Stack gap="xs">
            <Text fz="xs" c="brown" fw={600}>
              Transaction Summary
            </Text>

            <Group justify="space-between">
              <Text fz="xs" c="brown">
                Withdrawal Amount:
              </Text>
              <Text fz="xs" c="brown" fw={500}>
                Rs. {withdrawalAmount.toLocaleString()}
              </Text>
            </Group>

            <Group justify="space-between">
              <Text fz="xs" c="brown">
                Processing Fee:
              </Text>
              <Text fz="xs" c="brown" fw={500}>
                Rs. {withdrawalFee}
              </Text>
            </Group>

            <Group justify="space-between">
              <Text fz="xs" c="brown" fw={600}>
                You'll Receive:
              </Text>
              <Text fz="xs" c={netAmount > 0 ? "green" : "red"} fw={600}>
                Rs. {netAmount.toLocaleString()}
              </Text>
            </Group>

            <Text fz="xs" c="brown" mt="xs">
              Processing time: 2-5 minutes
            </Text>
          </Stack>
        </Box>
      )}

      {availableBalance === 0 && (
        <Box p="md" bg="yellow.0" style={{ borderRadius: "10px" }}>
          <Text fz="xs" c="orange" ta="center">
            You need available balance to withdraw funds. Complete more rides to
            earn money.
          </Text>
        </Box>
      )}

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
          Back
        </Button>
        <Button
          fullWidth
          size="md"
          fw={500}
          disabled={!canSubmit || availableBalance === 0}
          onClick={() => {
            if (canSubmit) {
              console.log("JazzCash Withdrawal:", {
                number: jazzcashNumber,
                amount: withdrawalAmount,
                fee: withdrawalFee,
                netAmount: netAmount,
              });

              notifications.show({
                title: "Withdrawal Request Submitted",
                message: `Rs. ${netAmount.toLocaleString()} will be transferred to your JazzCash account within 2-5 minutes.`,
                color: "green",
              });
              onClose();
            } else {
              notifications.show({
                title: "Invalid Details",
                message:
                  "Please check your JazzCash number and withdrawal amount",
                color: "red",
              });
            }
          }}
        >
          Confirm Withdrawal
        </Button>
      </Flex>
    </Stack>
  );
}
