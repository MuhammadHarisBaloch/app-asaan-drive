import { Card, Group, Stack, Badge, Text } from "@mantine/core";

interface TransactionHistoryCardProps {
  title: string;
  subTitle: string;
  paymentAmount: number;
  status: string;
}
export default function TransactionHistoryCard({
  title,
  subTitle,
  paymentAmount,
  status,
}: TransactionHistoryCardProps) {
  let color: string;
  let textColor: string;
  switch (status) {
    case "completed":
      color = "green.0";
      textColor = "green.6";
      break;
    case "pending":
      color = "orange.1";
      textColor = "orange.3";
      break;
    default:
      color = "transparent";
      textColor = "transparent";
  }
  return (
    <Card
      radius="md"
      p="lg"
      px="xxl"
      style={{ filter: "drop-shadow(1px 1px 2px #8e8e8e77)" }}
    >
      <Group justify="space-between">
        <Stack gap="xxs">
          <Text fz="xs" c="black" fw={600}>
            {title}
          </Text>
          <Text fz="12px" c="black">
            {subTitle}
          </Text>
        </Stack>
        <Stack gap="xxs">
          <Text fz="xs" c={paymentAmount >= 0 ? "green.6" : "red.4"} fw={600}>
            Pkr {paymentAmount >= 0 ? `+${paymentAmount}` : `${paymentAmount}`}
          </Text>
          <Badge
            color={color}
            c={textColor}
            fw={500}
            styles={{
              root: {
                textTransform: "lowercase",
                minWidth: 80,
                textAlign: "center",
              },
            }}
          >
            {status}
          </Badge>
        </Stack>
      </Group>
    </Card>
  );
}
