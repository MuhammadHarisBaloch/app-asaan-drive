import { Button, Flex, Stack, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

export default function CreditCardSection({
  onConfirm,
}: {
  onConfirm: () => void;
}) {
  return (
    <Stack py="lg" gap="lg">
      <TextInput
        w="100%"
        label="Card Number"
        placeholder="1234 567 890 1122 "
        radius="md"
        size="md"
        maxLength={14}
        styles={{
          label: {
            fontSize: "16px",
            fontWeight: 400,
          },
          input: {
            fontSize: "16px",
          },
        }}
      />
      <TextInput
        w="100%"
        label="Card Holder Name"
        placeholder="Enter account holder name"
        radius="md"
        size="md"
        styles={{
          label: {
            fontWeight: 400,
            fontSize: "16px",
          },
          input: {
            fontSize: "16px",
          },
        }}
      />
      <Flex gap="lg">
        <DatePickerInput
          w="100%"
          radius="md"
          size="md"
          valueFormat="MMM , YYYY "
          label="Expiry Date (MM/YY)"
          placeholder="MM/YY"
          styles={{
            label: {
              fontWeight: 400,
              fontSize: "16px",
            },
            input: {
              fontSize: "16px",
            },
          }}
        />
        <TextInput
          w="100%"
          label="CVV"
          placeholder="123"
          radius="md"
          size="md"
          maxLength={3}
          styles={{
            label: {
              fontWeight: 400,
              fontSize: "16px",
            },
            input: {
              fontSize: "16px",
            },
          }}
        />
      </Flex>
      <Button mt="lg" size="md" onClick={onConfirm}>
        Pay Now - Rs.2650
      </Button>
    </Stack>
  );
}
