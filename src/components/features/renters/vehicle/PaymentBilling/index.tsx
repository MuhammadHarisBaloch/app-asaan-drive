// file: components/features/renters/vehicle/PaymentBilling.tsx
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
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { RenterBookingForm } from "@/app/app/renter/vehicle/[id]/page";

interface PaymentSummary {
  returnDate: string | null;
  rentalCost: number;
  tax: number;
  total: number;
  baseRate: string;
  vehicleDurationLabel: string;
}

interface PaymentBillingProps {
  formValues: Partial<RenterBookingForm>;
  // bookNow optionally accepts returnDate, but we'll call without args
  bookNow: (returnDate?: string | null) => Promise<void>;
  vehicle: VehicleModel;
  paymentSummary: PaymentSummary;
}

export default function PaymentBilling({
  bookNow,
  formValues,
  vehicle,
  paymentSummary,
}: PaymentBillingProps) {
  const [value, setValue] = useState<string | null>("Debit/Credit Card");

  return (
    <Stack w="100%" align="center" py="3xl" gap="xxl">
      <Stack align="center" gap="xxs">
        <Text fz="30px" fw={600} c="black">
          Payment
        </Text>
        <Text fz="md">Complete your payment for {vehicle.vehicleModel}</Text>
      </Stack>
      <Grid w="100%" gutter="xxl">
        <Grid.Col span={8}>
          <Card withBorder radius="lg" p="lg">
            <Stack>
              <Text fz="lg" c="black" fw={500}>
                Payment Method
              </Text>
              <Tabs variant="none" value={value} onChange={setValue}>
                <Tabs.List grow className="list">
                  <Tabs.Tab value="Debit/Credit Card" className="tab">
                    <Flex align="center" justify="center" gap="sm">
                      <IconCreditCardFilled size={20} />
                      Debit/Credit Card
                    </Flex>
                  </Tabs.Tab>
                  <Tabs.Tab value="Mobile Wallet" className="tab">
                    <Flex align="center" justify="center" gap="sm">
                      <IconDeviceMobile size={20} />
                      Mobile Wallet
                    </Flex>
                  </Tabs.Tab>
                  <Tabs.Tab value="Cash on Pickup" className="tab">
                    <Flex align="center" justify="center" gap="sm">
                      <IconCash size={20} />
                      Cash on Pickup
                    </Flex>
                  </Tabs.Tab>
                </Tabs.List>
                <Divider w="100%" />
                {/* NOTE: call bookNow() only on user click (Confirm/Pay inside sections) */}
                <Tabs.Panel value="Debit/Credit Card">
                  <CreditCardSection onConfirm={() => bookNow()} />
                </Tabs.Panel>
                <Tabs.Panel value="Mobile Wallet">
                  <MobileWallet onConfirm={() => bookNow()} />
                </Tabs.Panel>
                <Tabs.Panel value="Cash on Pickup">
                  <CashOnPickupSection onConfirm={() => bookNow()} />
                </Tabs.Panel>
              </Tabs>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          {/* pass the computed summary (stateless) */}
          <OrderSummarySection
            vehicle={vehicle}
            formValues={formValues}
            paymentSummary={paymentSummary}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
