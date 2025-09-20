import {
  Card,
  Center,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Button,
  Badge,
} from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { IconCurrencyDollar, IconDownload } from "@tabler/icons-react";
import TransactionHistoryCard from "./TransactionHistoryCards";
import WithdrawPaymentModal from "./WithdrawPaymentModal";
import { useState } from "react";
import { data } from "@/constants/Data";

export default function EarningAndPayoutSection() {
  const [openMainModal, setOpenMainModal] = useState(false);
  return (
    <>
      <Stack p="lg" gap="xl">
        <Stack gap={0}>
          <Text fz="xl" c="black" fw={600}>
            Earnings & Payouts
          </Text>
          <Text fz="12px">Track your earnings and manage withdrawals</Text>
        </Stack>
        <SimpleGrid cols={3} spacing="xxl">
          <Card
            radius="md"
            p="xl"
            style={{ filter: "drop-shadow(1px 1px 2px #8e8e8e77)" }}
          >
            <Stack gap="lg">
              <Flex align="center" gap="md">
                <Center
                  h={50}
                  w={50}
                  bg="red.0"
                  style={{ borderRadius: "10px" }}
                >
                  <IconCurrencyDollar size={25} color="red" />
                </Center>
                <Stack gap={0}>
                  <Text fz="xs" fw={500}>
                    Available Balance
                  </Text>
                  <Text fz="xl" c="black" fw={600}>
                    Pkr 12,800
                  </Text>
                </Stack>
              </Flex>
              <Button
                size="md"
                fw={500}
                fz="sm"
                onClick={() => {
                  setOpenMainModal(true);
                }}
              >
                Withdraw Funds
              </Button>
            </Stack>
          </Card>
          {data.vehicleOwner.dashboard.EarningAndPayout.paymentCard.map(
            (data, i) => {
              return (
                <Card
                  key={i}
                  radius="md"
                  p="xl"
                  style={{ filter: "drop-shadow(1px 1px 2px #8e8e8e77)" }}
                >
                  <Stack gap="lg">
                    <Flex align="center" gap="md">
                      <Center
                        h={50}
                        w={50}
                        bg={data.iconBg}
                        style={{ borderRadius: "10px" }}
                      >
                        {data.icon}
                      </Center>
                      <Stack gap={0}>
                        <Text fz="xs" fw={500}>
                          {data.title}
                        </Text>
                        <Text fz="xl" c="black" fw={600}>
                          Pkr {data.subTitle}
                        </Text>
                      </Stack>
                    </Flex>
                    <Text fz="xs" c={data.descriptionColor} fw={500}>
                      {data.description}
                    </Text>
                  </Stack>
                </Card>
              );
            }
          )}
        </SimpleGrid>
        <Card
          radius="md"
          p="xl"
          style={{ filter: "drop-shadow(1px 1px 2px #8e8e8e77)" }}
        >
          <Stack gap="xl">
            <Group justify="space-between">
              <Text c="black" fw={500} fz="md">
                Monthly Earnings
              </Text>
              <Button
                variant="transparent"
                color="blue.5"
                fz="xs"
                fw={500}
                leftSection={<IconDownload size={20} />}
              >
                Export Report
              </Button>
            </Group>
            <BarChart
              className="root"
              h="20rem"
              data={
                data.vehicleOwner.dashboard.EarningAndPayout.monthlySalesChart
              }
              dataKey="month"
              withTooltip={false}
              series={[{ name: "Sales", color: "red.4" }]}
            />
          </Stack>
        </Card>
        <Card
          radius="md"
          p="xl"
          style={{ filter: "drop-shadow(1px 1px 2px #8e8e8e77)" }}
        >
          <Stack>
            <Text c="black" fw={500} fz="md">
              Recent Transactions
            </Text>
            {data.vehicleOwner.dashboard.EarningAndPayout.recentTransactionHistory.map(
              (data, i) => {
                return <TransactionHistoryCard key={i} {...data} />;
              }
            )}
          </Stack>
        </Card>
      </Stack>
      <WithdrawPaymentModal
        openModal={openMainModal}
        onClose={() => {
          setOpenMainModal(false);
        }}
      />
    </>
  );
}
