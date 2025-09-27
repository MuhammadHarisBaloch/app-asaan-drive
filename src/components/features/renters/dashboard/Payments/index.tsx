import { Button, Card, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import PaymentCard from "./PaymentCard";
import TransactionsCard from "./TransactionsCard";
import { data } from "@/constants/Data";

export default function Payments() {
  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Payments
        </Text>
        <Text fz="12px">Manage your payments and transaction history</Text>
      </Stack>
      <SimpleGrid cols={3} spacing="xl">
        {data.renter.dashboard.payments.PaymentCards.map((data, i) => {
          return <PaymentCard key={i} {...data} />;
        })}
      </SimpleGrid>
      <Card
        radius="md"
        p="xl"
        style={{ filter: "drop-shadow(1px 1px 2px #8e8e8e77)" }}
      >
        <Stack gap="xl">
          <Group justify="space-between">
            <Text c="black" fw={500} fz="md">
              Transaction History
            </Text>
            <Button
              variant="outline"
              color="red.4"
              fz="xs"
              fw={500}
              leftSection={<IconDownload size={15} color="red" />}
            >
              Export
            </Button>
          </Group>
          <Stack gap="lg">
            {data.renter.dashboard.payments.transactionsCard.map((data, i) => {
              return <TransactionsCard key={i} {...data} />;
            })}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
