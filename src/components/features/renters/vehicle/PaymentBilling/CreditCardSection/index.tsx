"use client";

import { useState } from "react";
import { Button, Stack, Text } from "@mantine/core";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { notifications } from "@mantine/notifications";
import { getAuth } from "firebase/auth";
import { doc, collection } from "firebase/firestore";
import { db } from "@/networking/firebase";
import { firebaseConstants } from "@/constants/Firestore";
import { createBookingDocument } from "@/features/booking";
import type { BookingModel } from "@/features/booking/models/booking.model";

export default function CreditCardSection({
  amount,
  platformFees,
  vehicle,
  formValues,
  onSuccess,
}: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const calculateReturnDate = (startDate: string, duration: number) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + duration);
    return d.toISOString().split("T")[0];
  };

  const handlePay = async () => {
    if (!stripe || !elements) {
      notifications.show({
        title: "Stripe not ready",
        message: "Try again shortly",
        color: "yellow",
      });
      return;
    }
    setLoading(true);

    try {
      // 1) ask server to create PaymentIntent
      const resp = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          metadata: {
            vehicleId: vehicle?.id ?? null,
            renterId: getAuth().currentUser?.uid ?? null,
          },
        }),
      });
      const json = await resp.json();
      if (!resp.ok || !json.clientSecret)
        throw new Error(json.error || "Failed to create payment intent");

      // 2) confirm card payment
      const card = elements.getElement(CardElement);
      if (!card) throw new Error("Card element not found");

      const confirm = await stripe.confirmCardPayment(json.clientSecret, {
        payment_method: { card },
      });
      if (confirm.error)
        throw new Error(confirm.error.message || "Payment confirmation failed");

      const pi = confirm.paymentIntent;
      if (!pi) throw new Error("No payment intent returned");

      // 3) compute return date
      const computedReturnDate =
        formValues?.returnDate ??
        (formValues?.pickUpDate && formValues?.duration
          ? calculateReturnDate(formValues.pickUpDate, formValues.duration)
          : null);

      // 4) create booking document client-side with payment.status = "hold"
      const renterID = getAuth().currentUser?.uid;
      if (!renterID) throw new Error("User not authenticated");

      const bookingRef = doc(
        collection(db, firebaseConstants.collections.bookings)
      );
      const bookingId = bookingRef.id;

      const bookingPayload: BookingModel & {
        payment?: any;
        ownerStripeAccountId?: string;
      } = {
        bookingId,
        vehicleOwnerId: vehicle.ownerID,
        renterId: renterID,
        vehicleId: vehicle.id,
        vehicleName: vehicle.vehicleModel,
        vehiclePhotos: vehicle.vehiclePhotos ?? [],
        vehicleType: vehicle.vehicleType,
        platformFee: platformFees,
        totalPrice: amount,
        status: "pending",
        rentalType: formValues?.rentalType ?? "",
        duration: formValues?.duration ?? 0,
        pickUpDate: formValues?.pickUpDate ?? null,
        returnDate: computedReturnDate,
        pickUpTime: formValues?.pickUpTime ?? null,
        payment: {
          method: "card",
          stripePaymentIntentId: pi.id,
          amount: (pi.amount ?? 0) / 100,
          currency:
            pi.currency ?? process.env.NEXT_PUBLIC_STRIPE_CURRENCY ?? "pkr",
          status: "hold",
        },
        // optional: owner connected account id for transfer (if you onboarding owners later)
        ownerStripeAccountId: (vehicle as any)?.ownerStripeAccountId ?? null,
      };

      // use your helper to persist the booking
      await createBookingDocument(bookingPayload);

      notifications.show({
        title: "Payment Received (held)",
        message: "Payment is held by admin until ride completes.",
        color: "green",
      });

      onSuccess?.(bookingId);
    } catch (err: any) {
      console.error("CreditCardSection error:", err);
      notifications.show({
        title: "Payment failed",
        message: err.message || "Something went wrong",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap="md">
      <Text fw={600}>Enter Card Details</Text>
      <div
        style={{ padding: 12, border: "1px solid #e6e6e6", borderRadius: 8 }}
      >
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <Button mt="lg" onClick={handlePay} loading={loading}>
        Pay Now - Rs.{amount}
      </Button>

      <Text size="xs">
        Test card: 4242 4242 4242 4242 — any future expiry / any CVC
      </Text>
    </Stack>
  );
}
