"use client";

import BookingConfirmation from "@/components/features/renters/vehicle/BookingConfirmation";
import BookingDetails from "@/components/features/renters/vehicle/BookingDetails";
import PaymentBilling from "@/components/features/renters/vehicle/PaymentBilling";
import VehicleDetails from "@/components/features/renters/vehicle/VehicleDetails";
import { Stepper } from "@mantine/core";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import {
  IconCalendarPlus,
  IconCarFilled,
  IconClipboardCheck,
  IconCreditCard,
} from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { db } from "@/networking/firebase";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import dayjs from "dayjs";
import PaymentAutoHandler from "@/utils/PaymentWatcher";

export interface RenterBookingForm {
  rentalType: string;
  duration: number;
  totalPrice: number;
  pickUpDate: string | null;
  returnDate: string | null;
  pickUpTime: number | null;
}

export default function Vehicle() {
  const params = useParams<{ id: string }>();
  const id: string = params.id;

  const [vehicle, setVehicle] = useState<VehicleModel | null>(null);
  const [active, setActive] = useState(0);
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState<
    Partial<RenterBookingForm>
  >({});

  // vehicle fetch
  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) return;
      const docRef = doc(db, "vehicles", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setVehicle({
          id: docSnap.id,
          ...(docSnap.data() as Omit<VehicleModel, "id">),
        });
      }
    };
    fetchVehicle();
  }, [id]);

  const updateBookingDetails = useCallback(
    (updates: Partial<RenterBookingForm>) => {
      setBookingDetails((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const handleBookingDetailsSubmit = useCallback(
    (values: Partial<RenterBookingForm>) => {
      updateBookingDetails(values);
      setActive(2);
    },
    [updateBookingDetails]
  );

  const rentalCost = useMemo(() => {
    if (!vehicle || !bookingDetails?.duration) return 0;
    switch (bookingDetails.rentalType) {
      case "Daily":
        return vehicle.dailyRate * bookingDetails.duration;
      case "Weekly":
        return vehicle.weeklyRate * bookingDetails.duration;
      case "Monthly":
        return vehicle.monthlyRate * bookingDetails.duration;
      default:
        return 0;
    }
  }, [vehicle, bookingDetails?.rentalType, bookingDetails?.duration]);

  const tax = useMemo(() => rentalCost * 0.05, [rentalCost]);
  const total = useMemo(() => rentalCost + tax, [rentalCost, tax]);

  const computedReturnDate = useMemo(() => {
    if (!bookingDetails?.duration || !bookingDetails?.pickUpDate) return null;
    switch (bookingDetails.rentalType) {
      case "Daily":
        return dayjs(bookingDetails.pickUpDate)
          .add(bookingDetails.duration, "day")
          .format("YYYY-MM-DD");
      case "Weekly":
        return dayjs(bookingDetails.pickUpDate)
          .add(bookingDetails.duration, "week")
          .format("YYYY-MM-DD");
      case "Monthly":
        return dayjs(bookingDetails.pickUpDate)
          .add(bookingDetails.duration, "month")
          .format("YYYY-MM-DD");
      default:
        return null;
    }
  }, [
    bookingDetails?.rentalType,
    bookingDetails?.duration,
    bookingDetails?.pickUpDate,
  ]);

  if (!vehicle) return <p>Loading...</p>;

  return (
    <>
      <Stepper
        px="xl"
        pt="3xl"
        color="red.4"
        size="xs"
        active={active}
        onStepClick={(stepIndex) => {
          if (stepIndex > active) return;
          if (active >= 3 && stepIndex < active) return;
          setActive(stepIndex);
        }}
      >
        <Stepper.Step label="Select Ride" icon={<IconCarFilled color="red" />}>
          <VehicleDetails bookNow={() => setActive(1)} vehicle={vehicle} />
        </Stepper.Step>

        <Stepper.Step
          label="Book Details"
          icon={<IconCalendarPlus color="red" />}
        >
          <BookingDetails
            vehicle={vehicle}
            onFormSubmit={handleBookingDetailsSubmit}
          />
        </Stepper.Step>

        <Stepper.Step label="Payment" icon={<IconCreditCard color="red" />}>
          <PaymentBilling
            vehicle={vehicle}
            formValues={{ ...bookingDetails, returnDate: computedReturnDate }}
            paymentSummary={{
              returnDate: computedReturnDate,
              rentalCost,
              tax,
              total,
              baseRate: `${rentalCost}`,
              vehicleDurationLabel:
                bookingDetails?.duration === 1
                  ? "1 Day"
                  : `${bookingDetails?.duration} Days`,
            }}
            onBookingSuccess={(id) => {
              setCreatedBookingId(id);
              setActive(3);
            }}
          />
        </Stepper.Step>

        <Stepper.Step
          label="Confirmation"
          icon={<IconClipboardCheck color="red" />}
        >
          <BookingConfirmation
            vehicle={vehicle}
            bookingValues={bookingDetails}
            bookingId={createdBookingId}
          />
        </Stepper.Step>
      </Stepper>
      <PaymentAutoHandler bookingId={id} />
    </>
  );
}
