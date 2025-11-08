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
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconWallet } from "@tabler/icons-react";

interface BankTransferModalContentProps {
  onClose: () => void;
  onBack: () => void;
  availableBalance: number;
  onWithdrawSuccess: (amount: number) => void;
}

export default function BankTransferModalContent({
  onClose,
  onBack,
  availableBalance,
  onWithdrawSuccess,
}: BankTransferModalContentProps) {
  const form = useForm({
    initialValues: {
      bankName: "",
      accountNumber: "",
      iban: "",
      accountTitle: "",
      amount: availableBalance > 0 ? Math.min(availableBalance, 50000) : 0,
    },
  });

  const withdrawalFee = 25;
  const netAmount = Math.max(0, form.values.amount - withdrawalFee);

  return (
    <form
      onSubmit={() => {
        notifications.show({
          title: "Withdrawal Request Submitted",
          message: `Rs. ${netAmount.toLocaleString()} will be transferred to your bank account within 1-24 hours.`,
          color: "green",
        });
        onWithdrawSuccess(form.values.amount);
        onClose();
      }}
    >
      <Stack gap="xl">
        <Text>Bank Transfer Details</Text>

        <NumberInput
          label="Amount"
          value={form.values.amount}
          disabled
          leftSection={<Text>Pkr</Text>}
        />
        <TextInput label="Bank Name" {...form.getInputProps("bankName")} />
        <TextInput
          label="Account Number"
          {...form.getInputProps("accountNumber")}
        />
        <TextInput label="IBAN" {...form.getInputProps("iban")} />
        <TextInput
          label="Account Title"
          {...form.getInputProps("accountTitle")}
        />

        <Divider />

        <Flex gap="md">
          <Button fullWidth variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button fullWidth type="submit">
            Confirm Withdrawal
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}
