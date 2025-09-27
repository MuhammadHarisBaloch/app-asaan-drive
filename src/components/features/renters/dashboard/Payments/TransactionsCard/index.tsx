import { Card, Group, Flex, Center, Stack, Badge, Text } from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";
import { JSX } from "react";

interface TransactionsCardProps {
  icon: JSX.Element;
  iconBg: string;
  transactionType: string;
  bookingId: string;
  walletType: string;
  price: string;
  date: string;
  time: string;
  status: string;
}
export default function TransactionsCard({
  icon,
  iconBg,
  transactionType,
  bookingId,
  walletType,
  price,
  date,
  time,
  status,
}: TransactionsCardProps) {
  let color: string;
  let bgColor: string;

  switch (status) {
    case "completed":
      color = "green";
      bgColor = "green.0";
      break;
    case "Processing":
      color = "orange";
      bgColor = "orange.0";
      break;
    default:
      color = "transparent";
      bgColor = "transparent";
  }
  return (
    <Card bg="white.2" radius="md" p="lg">
      <Group justify="space-between" align="center">
        <Flex align="center" gap="md">
          <Center h={40} w={40} bg={iconBg} style={{ borderRadius: "10px" }}>
            {icon}
          </Center>
          <Stack gap={0}>
            <Text fz="sm" c="black" fw={500}>
              {transactionType}
            </Text>
            <Flex align="center" gap="xs">
              <Text fz="xs">Booking {bookingId}</Text>
              <IconPointFilled color="gray" size={10} />
              <Text fz="xs">{walletType}</Text>
            </Flex>
          </Stack>
        </Flex>
        <Flex align="center" gap="md">
          <Stack gap={0} align="flex-end">
            <Text fz="sm" c="black" fw={500}>
              Pkr {price}
            </Text>
            <Flex align="center" gap="xs">
              <Text fz="xs">{date}</Text>
              <IconPointFilled color="gray" size={10} />
              <Text fz="xs">{time}</Text>
            </Flex>
          </Stack>
          <Badge
            c={color}
            bg={bgColor}
            fw={500}
            styles={{
              root: { textTransform: "lowercase", textAlign: "center" },
            }}
          >
            {status}
          </Badge>
        </Flex>
      </Group>
    </Card>
  );
}
