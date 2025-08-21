import { Button, Flex, Stack, Text } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

export default function CashOnPickupSection() {
  return (
    <Stack py="xl" gap="lg">
      <Flex
        bg="white.2"
        p="lg"
        gap="md"
        style={{ filter: "drop-shadow(1px 1px 2px #b5b5b559)" }}
      >
        <IconExclamationCircle size={25} color="#22c55e" />
        <Text fz="sm">
          Pay with cash when you pick up the vehicle. Please bring the exact
          amount.
        </Text>
      </Flex>
      <Button mt="lg" size="md">
        Continue
      </Button>
    </Stack>
  );
}
