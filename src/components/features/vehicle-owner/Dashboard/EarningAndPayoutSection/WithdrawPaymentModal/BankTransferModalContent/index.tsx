import {
  Button,
  Divider,
  Flex,
  Stack,
  Text,
  TextInput,
  Card,
  Group,
  Box,
  Center,
  NumberInput,
  Badge,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconWallet, IconInfoCircle } from "@tabler/icons-react";

interface BankTransferModalContentProps {
  onClose: () => void;
  onBack: () => void;
  availableBalance: number;
}

export default function BankTransferModalContent({
  onClose,
  onBack,
  availableBalance,
}: BankTransferModalContentProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      bankName: "",
      accountNumber: "",
      iban: "",
      accountTitle: "",
      amount: availableBalance > 0 ? Math.min(availableBalance, 50000) : 0,
    },
    validate: {
      bankName: (value) => (value.length < 1 ? "Bank name is required" : null),
      accountNumber: (value) =>
        value.length < 11 ? "Account number must be at least 11 digits" : null,
      iban: (value) => (value.length < 10 ? "Invalid IBAN format" : null),
      accountTitle: (value) =>
        value.length < 1 ? "Account title is required" : null,
      amount: (value) => {
        if (value <= 0) return "Amount must be greater than 0";
        if (value > availableBalance) return "Amount exceeds available balance";
        if (value < 500) return "Minimum withdrawal amount is Rs. 500";
        return null;
      },
    },
  });

  // 🔹 Handle amount change
  const handleAmountChange = (value: string | number) => {
    const numValue =
      typeof value === "string" ? (value === "" ? 0 : Number(value)) : value;
    form.setFieldValue("amount", numValue);
  };

  const withdrawalFee = 25;
  const netAmount = Math.max(0, form.values.amount - withdrawalFee);
  const canSubmit =
    form.values.amount >= 500 && form.values.amount <= availableBalance;

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        try {
          console.log("Withdrawal Details:", {
            ...values,
            fee: withdrawalFee,
            netAmount: netAmount,
            type: "bank_transfer",
          });

          notifications.show({
            title: "Withdrawal Request Submitted",
            message: `Rs. ${netAmount.toLocaleString()} will be transferred to your bank account within 1-24 hours.`,
            color: "green",
          });
          onClose();
        } catch (error) {
          notifications.show({
            title: "Withdrawal Failed",
            message: `${error}`,
            color: "red",
          });
        }
      })}
    >
      <Stack px="md" pt="xl" pb="sm" gap="xl">
        <Stack align="center" gap={0}>
          <Text fz="md" c="black" fw={500}>
            Enter Account Details
          </Text>
          <Text fz="xs">Please provide your BankTransfer details</Text>
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
            value={form.values.amount}
            onChange={handleAmountChange}
            min={500}
            max={availableBalance}
            disabled={availableBalance === 0}
            leftSection={<Text fz="xs">Pkr</Text>}
            error={form.errors.amount}
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

        {/* 🔹 Bank Details */}
        <TextInput
          size="md"
          radius="md"
          label="Bank Name"
          placeholder="e.g., Meezan Bank Limited"
          key={form.key("bankName")}
          {...form.getInputProps("bankName")}
          styles={{
            label: {
              fontSize: "14px",
            },
            input: {
              fontSize: "14px",
            },
          }}
        />
        <TextInput
          type="number"
          size="md"
          radius="md"
          label="Account Number"
          placeholder="Enter account number"
          key={form.key("accountNumber")}
          {...form.getInputProps("accountNumber")}
          styles={{
            label: {
              fontSize: "14px",
            },
            input: {
              fontSize: "14px",
            },
          }}
        />
        <TextInput
          size="md"
          radius="md"
          label="IBAN"
          placeholder="PK36SCBL0000001123456702"
          key={form.key("iban")}
          {...form.getInputProps("iban")}
          styles={{
            label: {
              fontSize: "14px",
            },
            input: {
              fontSize: "14px",
            },
          }}
        />
        <TextInput
          size="md"
          radius="md"
          label="Account Title"
          placeholder="Account holder name"
          key={form.key("accountTitle")}
          {...form.getInputProps("accountTitle")}
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
        {form.values.amount > 0 && (
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
                  Rs. {form.values.amount.toLocaleString()}
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
                <IconInfoCircle size={12} style={{ marginRight: "4px" }} />
                Processing time: 1-24 hours
              </Text>
            </Stack>
          </Box>
        )}

        {availableBalance === 0 && (
          <Box p="md" bg="yellow.0" style={{ borderRadius: "10px" }}>
            <Text fz="xs" c="orange" ta="center">
              You need available balance to withdraw funds. Complete more rides
              to earn money.
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
            type="submit"
            disabled={!canSubmit || availableBalance === 0}
          >
            Confirm Withdrawal
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}
