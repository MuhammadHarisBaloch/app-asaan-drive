import { Text, Stack, Card, Grid, Flex, Divider } from "@mantine/core";
import { IconCreditCardFilled } from "@tabler/icons-react";
import CreditCardSection from "./CreditCardSection";
import OrderSummarySection from "./OrderSummarySection";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { RenterBookingForm } from "@/app/app/renter/vehicle/[id]/page";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

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
  vehicle: VehicleModel;
  paymentSummary: PaymentSummary;
  onBookingSuccess?: (id: string) => void;
}

export default function PaymentBilling({
  formValues,
  vehicle,
  paymentSummary,
  onBookingSuccess,
}: PaymentBillingProps) {
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
              <Flex align="center" gap="sm" mb="sm">
                <IconCreditCardFilled size={20} />
                <Text fz="lg" c="black" fw={500}>
                  Debit / Credit Card
                </Text>
              </Flex>
              <Divider w="100%" />
              <Elements stripe={stripePromise}>
                <CreditCardSection
                  amount={paymentSummary.total}
                  vehicle={vehicle}
                  formValues={formValues}
                  onSuccess={(id: string) => onBookingSuccess?.(id)}
                />
              </Elements>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={4}>
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
