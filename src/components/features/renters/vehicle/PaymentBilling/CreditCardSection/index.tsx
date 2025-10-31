"use client";

import { useState } from "react";
import { Button, Stack, Text } from "@mantine/core";
import { CardElement } from "@stripe/react-stripe-js";
import { notifications } from "@mantine/notifications";
import { getAuth } from "firebase/auth";
import { collection, doc } from "firebase/firestore";
import { db } from "@/networking/firebase";
import { firebaseConstants } from "@/constants/Firestore";
import { createBookingDocument } from "@/features/booking";
import { BookingModel } from "@/features/booking/models/booking.model";

export default function CreditCardSection({
  amount,
  vehicle,
  formValues,
  onSuccess,
}: any) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 🧠 DEMO MODE: simulate payment delay
      await new Promise((r) => setTimeout(r, 1500));

      const renterID = getAuth().currentUser?.uid;
      if (!renterID) throw new Error("Please log in first");

      // simulate Stripe PaymentIntent ID
      const fakePaymentIntentId =
        "pi_demo_" + Math.random().toString(36).substring(2, 8);

      const bookingRef = doc(
        collection(db, firebaseConstants.collections.bookings)
      );
      const bookingId = bookingRef.id;

      const bookingPayload: BookingModel = {
        bookingId,
        vehicleOwnerId: vehicle.ownerID,
        renterId: renterID,
        vehicleId: vehicle.id,
        vehicleName: vehicle.vehicleModel,
        vehiclePhotos: vehicle.vehiclePhotos ?? [],
        vehicleType: vehicle.vehicleType,
        totalPrice: amount,
        status: "pending",
        rentalType: formValues?.rentalType ?? "",
        duration: formValues?.duration ?? 0,
        pickUpDate: formValues?.pickUpDate ?? null,
        returnDate: formValues?.returnDate ?? null,
        pickUpTime: formValues?.pickUpTime ?? null,
        payment: {
          method: "card",
          stripePaymentIntentId: fakePaymentIntentId,
          amount,
          currency: "pkr",
          status: "succeeded",
        },
      };

      await createBookingDocument(bookingPayload);

      notifications.show({
        title: "Payment Successful",
        message: "Booking created successfully!",
        color: "green",
      });

      onSuccess?.(bookingId);
    } catch (error: any) {
      notifications.show({
        title: "Payment Failed",
        message: error?.message || "Something went wrong",
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

      <Button mt="lg" onClick={handlePayment} loading={loading}>
        Pay Now - Rs.{amount}
      </Button>

      <Text size="xs" c="dimmed">
        Test card: 4242 4242 4242 4242 — any future expiry / any CVC
      </Text>
    </Stack>
  );
}
