import { Button, Divider, Flex, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
interface BankTransferModalContentProps {
  onClose: () => void;
  onBack: () => void;
}
export default function BankTransferModalContent({
  onClose,
  onBack,
}: BankTransferModalContentProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      bankName: "",
      accountNumber: "",
      iban: "",
      accountTitle: "",
    },
    validate: {
      bankName: (value) => (value.length < 1 ? "Bank name is required" : null),
      accountNumber: (value) =>
        value.length < 11 ? "Account number must be at least 11 digits" : null,
      iban: (value) => (value.length < 10 ? "Invalid IBAN format" : null),
      accountTitle: (value) =>
        value.length < 1 ? "Account title is required" : null,
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        try {
          onClose();
          console.log("Account Details :", values);
          notifications.show({
            title: "Successfully Done ",
            message: "withdrawal amount Processing time: 1-24 hours.",
            color: "green",
          });
        } catch (error) {
          notifications.show({
            title: "Something wrong",
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
          <Button fullWidth size="md" fw={500} type="submit">
            Continue
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}
