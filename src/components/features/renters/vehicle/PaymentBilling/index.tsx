import { Text, Stack, Card, Grid, Tabs, Flex, Divider } from "@mantine/core";
import {
  IconCash,
  IconCreditCardFilled,
  IconDeviceMobile,
} from "@tabler/icons-react";
import { useState } from "react";
import CreditCardSection from "./CreditCardSection";
import OrderSummarySection from "./OrderSummarySection";
import CashOnPickupSection from "./CashOnPickupSection";
import MobileWallet from "./MobileWallet";

export default function PaymentBilling() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>("1");
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };
  return (
    <Stack w="100%" align="center" py="3xl" gap="xxl">
      <Stack align="center" gap="xxs">
        <Text fz="30px" fw={600} c="black">
          Payment
        </Text>
        <Text fz="md">Complete your payment for Honda 125</Text>
      </Stack>
      <Grid w="100%" gutter="xxl">
        <Grid.Col span={8}>
          <Card withBorder radius="lg" p="lg">
            <Stack>
              <Text fz="lg" c="black" fw={500}>
                Payment Method
              </Text>
              <Tabs variant="none" value={value} onChange={setValue}>
                <Tabs.List grow ref={setRootRef} className="list">
                  <Tabs.Tab value="1" ref={setControlRef("1")} className="tab">
                    <Flex align="center" justify="center" gap="sm">
                      <IconCreditCardFilled size={20} />
                      Debit/Credit Card
                    </Flex>
                  </Tabs.Tab>
                  <Tabs.Tab value="2" ref={setControlRef("2")} className="tab">
                    <Flex align="center" justify="center" gap="sm">
                      <IconDeviceMobile size={20} />
                      Mobile Wallet
                    </Flex>
                  </Tabs.Tab>
                  <Tabs.Tab value="3" ref={setControlRef("3")} className="tab">
                    <Flex align="center" justify="center" gap="sm">
                      <IconCash size={20} />
                      Cash on Pickup
                    </Flex>
                  </Tabs.Tab>
                </Tabs.List>
                <Divider w="100%" />
                <Tabs.Panel value="1">
                  <CreditCardSection />
                </Tabs.Panel>
                <Tabs.Panel value="2">
                  <MobileWallet />
                </Tabs.Panel>
                <Tabs.Panel value="3">
                  <CashOnPickupSection />
                </Tabs.Panel>
              </Tabs>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <OrderSummarySection />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
