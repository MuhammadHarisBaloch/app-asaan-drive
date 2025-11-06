import { data } from "@/constants/Data";
import {
  Stack,
  Box,
  Flex,
  Center,
  NumberInput,
  Card,
  Divider,
  Button,
  Text,
  Group,
  Badge,
} from "@mantine/core";
import {
  IconCurrencyDollar,
  IconRosetteDiscountCheck,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";

interface MainModalContentProps {
  onCancel?: () => void;
  onContinue?: (method: string | null) => void;
  availableBalance: number;
}

export default function MainModalContent({
  onCancel,
  onContinue,
  availableBalance,
}: MainModalContentProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(
    availableBalance > 0 ? Math.min(availableBalance, 50000) : 0
  );

  // 🔹 Processing fees for different methods
  const getProcessingFee = (method: string | null) => {
    switch (method) {
      case "JazzCash":
      case "Easypaisa":
        return 10;
      case "Bank Transfer":
        return 25;
      default:
        return 50; // Default fee
    }
  };

  // 🔹 Handle NumberInput change (fix type issue)
  const handleAmountChange = (value: string | number) => {
    // Convert string to number, handle empty values
    const numValue =
      typeof value === "string" ? (value === "" ? 0 : Number(value)) : value;
    setWithdrawalAmount(numValue);
  };

  const processingFee = getProcessingFee(selected);
  const netAmount = Math.max(0, withdrawalAmount - processingFee);

  // 🔹 Update amount when balance changes
  useEffect(() => {
    if (availableBalance > 0 && withdrawalAmount === 0) {
      setWithdrawalAmount(Math.min(availableBalance, 50000));
    }
  }, [availableBalance]);

  // 🔹 Validate amount
  const isAmountValid =
    withdrawalAmount >= 500 && withdrawalAmount <= availableBalance;
  const canContinue = selected && isAmountValid;

  return (
    <Stack px="md" pt="xl" pb="sm" gap="xl">
      {/* 🔹 Available Balance */}
      <Box bg="#ff00001c" p="lg" style={{ borderRadius: "20px" }}>
        <Flex align="center" gap="md">
          <Center h={40} w={40} bg="red.0" style={{ borderRadius: "10px" }}>
            <IconCurrencyDollar size={20} color="red" />
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
          onChange={handleAmountChange} // ✅ Fixed type issue
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

      {/* 🔹 Payment Methods */}
      <Stack>
        <Text fz="xs" c="black" fw={500}>
          Select Payment Method
        </Text>
        {data.vehicleOwner.dashboard.EarningAndPayout.cashWithdrawPaymentMethods.map(
          (data, i) => {
            const methodFee = getProcessingFee(data.method);
            const methodProcessingTime =
              data.method === "Bank Transfer" ? "1-24 hours" : "2-5 minutes";

            return (
              <Card
                className="hover-pointer"
                key={i}
                radius="lg"
                p="lg"
                bg={selected == data.method ? "#ff000014" : "transparent"}
                style={{
                  border: `1px solid ${
                    selected == data.method ? "red" : "#e0e0e0"
                  }`,
                  cursor: availableBalance > 0 ? "pointer" : "not-allowed",
                  opacity: availableBalance > 0 ? 1 : 0.6,
                }}
                onClick={() => availableBalance > 0 && setSelected(data.method)}
              >
                <Group align="center" justify="space-between">
                  <Flex align="center" gap="md">
                    <Center
                      h={40}
                      w={40}
                      bg={data.iconBg}
                      style={{ borderRadius: "10px" }}
                    >
                      {data.icon}
                    </Center>
                    <Stack gap={2}>
                      <Text fz="sm" fw={500} c="black">
                        {data.method}
                      </Text>
                      <Text fz="xs" c="dimmed">
                        Fee: Rs. {methodFee} • {methodProcessingTime}
                      </Text>
                    </Stack>
                  </Flex>
                  {selected == data.method && (
                    <IconRosetteDiscountCheck color="red" size={30} />
                  )}
                </Group>
              </Card>
            );
          }
        )}
      </Stack>

      {/* 🔹 Processing Fee & Net Amount */}
      {selected && withdrawalAmount > 0 && (
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
                Rs. {processingFee}
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
              <IconInfoCircle size={12} style={{ marginRight: "4px" }} />
              Processing time:{" "}
              {selected === "Bank Transfer" ? "1-24 hours" : "2-5 minutes"}
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

      <Divider w="100%" />

      <Flex gap="md">
        <Button
          fullWidth
          size="md"
          fw={500}
          variant="outline"
          color="black"
          onClick={() => onCancel?.()}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          size="md"
          fw={500}
          disabled={!canContinue}
          onClick={() => onContinue?.(selected)}
        >
          {selected ? `Withdraw via ${selected}` : "Continue"}
        </Button>
      </Flex>
    </Stack>
  );
}
