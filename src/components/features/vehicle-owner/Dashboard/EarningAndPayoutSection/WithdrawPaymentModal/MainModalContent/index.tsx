import {
  Stack,
  Text,
  Box,
  Flex,
  Button,
  Divider,
  NumberInput,
} from "@mantine/core";
import { useState, useEffect } from "react";

interface MainModalContentProps {
  onContinue: (method: string, amount: number) => void;
  onCancel: () => void;
  availableBalance: number;
}

export default function MainModalContent({
  onContinue,
  onCancel,
  availableBalance,
}: MainModalContentProps) {
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(
    availableBalance > 0 ? Math.min(availableBalance, 50000) : 0
  );
  const [selectedMethod, setSelectedMethod] = useState<string>("JazzCash");

  useEffect(() => {
    setWithdrawalAmount(
      availableBalance > 0 ? Math.min(availableBalance, 50000) : 0
    );
  }, [availableBalance]);

  const handleAmountChange = (value: string | number) => {
    if (typeof value === "number") setWithdrawalAmount(value);
    else if (value === "") setWithdrawalAmount(0);
    else {
      const parsed = parseFloat(value);
      setWithdrawalAmount(isNaN(parsed) ? 0 : parsed);
    }
  };

  const canContinue =
    withdrawalAmount >= 500 &&
    withdrawalAmount <= availableBalance &&
    availableBalance > 0;

  return (
    <Stack px="md" pt="xl" pb="sm" gap="xl">
      <Text fz="md" fw={500} ta="center">
        Select Withdrawal Method
      </Text>

      <Box>
        <Flex direction="column" gap="sm">
          {["JazzCash", "Easypaisa", "Bank Transfer"].map((method) => (
            <Button
              key={method}
              variant={selectedMethod === method ? "filled" : "outline"}
              color={selectedMethod === method ? "red" : "gray"}
              fullWidth
              onClick={() => setSelectedMethod(method)}
            >
              {method}
            </Button>
          ))}
        </Flex>
      </Box>

      <Divider />

      <Box>
        <NumberInput
          label="Withdrawal Amount"
          value={withdrawalAmount}
          onChange={handleAmountChange}
          min={500}
          max={availableBalance}
          leftSection={<Text fz="xs">Pkr</Text>}
          disabled={availableBalance === 0}
        />
        <Text fz="xs" c="dimmed">
          Maximum: PKR {availableBalance.toLocaleString()} • Minimum: PKR 500
        </Text>
      </Box>

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
        <Button fullWidth variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          fullWidth
          disabled={!canContinue}
          onClick={() => onContinue(selectedMethod, withdrawalAmount)}
        >
          Continue
        </Button>
      </Flex>
    </Stack>
  );
}
