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
} from "@mantine/core";
import {
  IconCurrencyDollar,
  IconRosetteDiscountCheck,
} from "@tabler/icons-react";
import { useState } from "react";

interface MainModalContentProps {
  onCancel?: () => void;
  onContinue?: (method: string | null) => void;
}

export default function MainModalContent({
  onCancel,
  onContinue,
}: MainModalContentProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Stack px="md" pt="xl" pb="sm" gap="xl">
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
              Pkr 12,800
            </Text>
          </Stack>
        </Flex>
      </Box>
      <Stack gap={0}>
        <NumberInput
          size="md"
          radius="md"
          label="Withdrawal Amount"
          placeholder="0"
          min={1}
          leftSection={<Text fz="xs">Pkr</Text>}
          styles={{
            label: {
              fontSize: "14px",
            },
            input: {
              fontSize: "14px",
            },
          }}
        />
        <Text fz="12px">Maximum: PKR 12,800</Text>
      </Stack>
      <Stack>
        <Text fz="xs" c="black">
          Select Payment Method
        </Text>
        {data.vehicleOwner.dashboard.EarningAndPayout.cashWithdrawPaymentMethods.map(
          (data, i) => {
            return (
              <Card
                className="hover-pointer"
                key={i}
                radius="lg"
                p="lg"
                bg={selected == data.method ? "#ff000014" : "transparent"}
                style={{
                  border: `1px solid ${
                    selected == data.method ? "red" : "gray"
                  }`,
                }}
                onClick={() => {
                  setSelected(data.method);
                }}
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
                    <Text fz="sm" fw={500} c="black">
                      {data.method}
                    </Text>
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
      <Box p="lg" bg="#FFFBEB" style={{ borderRadius: "20px" }}>
        <Text fz="xs" c="brown">
          <span style={{ fontWeight: 600 }}>Processing Fee:</span> PKR 50 will
          be deducted from your withdrawal amount. Processing time: 1-24 hours.
        </Text>
      </Box>
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
          disabled={!selected}
          onClick={() => onContinue?.(selected)}
        >
          Continue
        </Button>
      </Flex>
    </Stack>
  );
}
