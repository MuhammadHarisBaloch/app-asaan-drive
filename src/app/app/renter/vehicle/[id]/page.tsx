// file: app/app/renter/vehicle/[id]/page.tsx  (ya jahan bhi tumhara Vehicle component hai)
"use client";

import BookingConfirmation from "@/components/features/renters/vehicle/BookingConfirmation";
import BookingDetails from "@/components/features/renters/vehicle/BookingDetails";
import DocumentVerification from "@/components/features/renters/vehicle/DocumentVerification";
import PaymentBilling from "@/components/features/renters/vehicle/PaymentBilling";
import VehicleDetails from "@/components/features/renters/vehicle/VehicleDetails";
import { Stepper } from "@mantine/core";
import { useParams } from "next/navigation";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import {
  IconCalendarPlus,
  IconCarFilled,
  IconClipboardCheck,
  IconCreditCard,
  IconRosetteDiscountCheck,
} from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useMemo, useState } from "react";
import { db } from "@/networking/firebase";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { FileWithPath } from "@mantine/dropzone";
import { getAuth } from "firebase/auth";
import { notifications } from "@mantine/notifications";
import { createBookingDocument } from "@/features/booking";
import dayjs from "dayjs";

export interface RenterBookingForm {
  rentalType: string;
  duration: number;
  totalPrice: number;
  pickUpDate: string | null;
  returnDate: string | null;
  pickUpTime: number | null;
  cnicFrontSide: FileWithPath[];
  cnicBackSide: FileWithPath[];
  driversLicenseFrontSide: FileWithPath[];
  driversLicenseBackSide: FileWithPath[];
}

export default function Vehicle() {
  let bookingStatus: string = "pending";

  // params sai vehicle ka id nikalna
  const { id } = useParams<{ id: string }>();

  // vehicle ka data store krnai kai lyai state
  const [vehicle, setVehicle] = useState<VehicleModel | null>(null);

  // stepper ka active step track krna
  const [active, setActive] = useState(0);

  // renter booking form kai data store krnai kai lyai state
  // initialize as empty object taake null se related re-render issues na hon
  const [bookingDetails, setBookingDetails] = useState<
    Partial<RenterBookingForm>
  >({});

  // form submit kai waqt dobara submit na ho uss liye ek ref
  const isSubmittingRef = useRef(false);

  // vehicle data firestore sai fetch krna
  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) return; // agar id na mili toh kuch na karo
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

  // booking details update krnai kai liye ek stable function
  const updateBookingDetails = useCallback(
    (updates: Partial<RenterBookingForm>) => {
      setBookingDetails((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  // booking details form submit hone kai baad data update karo or step 2 par jao
  const handleBookingDetailsSubmit = useCallback(
    (values: Partial<RenterBookingForm>) => {
      updateBookingDetails(values);
      setActive(2);
    },
    [updateBookingDetails]
  );

  // document verification form submit hone kai baad sirf data update krna
  const handleDocumentVerificationSubmit = useCallback(
    (values: Partial<RenterBookingForm>) => {
      updateBookingDetails(values); // pehlay booking details update karo
      setActive(3); // next step par chalo (payment billing)
    },
    [updateBookingDetails]
  );

  // === PARENT COMPUTED SUMMARY (no side-effects) ===
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

  const baseRate = useMemo(() => {
    if (!vehicle) return "—";
    switch (bookingDetails?.rentalType) {
      case "Daily":
        return `${vehicle.dailyRate} /Day`;
      case "Weekly":
        return `${vehicle.weeklyRate} /Week`;
      case "Monthly":
        return `${vehicle.monthlyRate} /Month`;
      default:
        return "—";
    }
  }, [vehicle, bookingDetails?.rentalType]);

  const vehicleDurationLabel = useMemo(() => {
    switch (bookingDetails?.rentalType) {
      case "Daily":
        return "Day";
      case "Weekly":
        return "Week";
      case "Monthly":
        return "Month";
      default:
        return "—";
    }
  }, [bookingDetails?.rentalType]);

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

  // payment billing form mai booking create krna
  const handlePaymentBillingSubmit = useCallback(
    async (returnDate?: string | null) => {
      // use provided returnDate or computed one from parent
      const finalReturnDate = returnDate ?? computedReturnDate ?? null;

      // update parent bookingDetails with final return date (optional)
      updateBookingDetails({ returnDate: finalReturnDate });

      // agar already submitting hai toh dobara mat bhejo
      if (isSubmittingRef.current) return;
      isSubmittingRef.current = true;

      const renterID = getAuth().currentUser?.uid; // current renter ka id firebase auth sai lao

      // agar renter login nai hai toh error notification show karo
      if (!renterID) {
        notifications.show({
          title: "User not authenticated",
          message: "Please log in to rent the vehicle.",
        });
        isSubmittingRef.current = false;
        return;
      }

      try {
        // firestore mai booking create krna - finalReturnDate use karo
        const booking = await createBookingDocument({
          vehicleOwnerId: vehicle!.ownerID,
          renterId: renterID,
          vehicleName: vehicle?.vehicleModel,
          vehiclePhotos: vehicle?.vehiclePhotos ?? [],
          vehicleType: vehicle?.vehicleType,
          totalPrice: total,
          status: bookingStatus,
          rentalType: bookingDetails?.rentalType!,
          duration: bookingDetails?.duration!,
          pickUpDate: bookingDetails?.pickUpDate!,
          returnDate: finalReturnDate!,
          pickUpTime: bookingDetails?.pickUpTime!,
          cnicFrontSide: bookingDetails?.cnicFrontSide ?? [],
          cnicBackSide: bookingDetails?.cnicBackSide ?? [],
          driversLicenseFrontSide:
            bookingDetails?.driversLicenseFrontSide ?? [],
          driversLicenseBackSide: bookingDetails?.driversLicenseBackSide ?? [],
        });

        // agar booking successful ban gai toh success notification show karo or next step par jao
        if (booking) {
          notifications.show({
            title: "Booking Completed",
            message: "Please Wait for the Approval from owner side",
          });
          setActive(4); // aglay step par jao (confirmation)
        }
      } catch (error) {
        // agar koi error aaya toh failure notification show karo or step wahi rakho
        notifications.show({
          title: "Booking Failed",
          message: `${error}`,
        });
      } finally {
        isSubmittingRef.current = false; // submit khatam hogaya
      }
    },
    // dependencies: include values used inside
    [updateBookingDetails, vehicle, bookingDetails, computedReturnDate]
  );

  // agar vehicle ka data abhi load horaha hai toh loading text show karo
  if (!vehicle) return <p>Loading...</p>;

  return (
    <>
      <Stepper
        px="xl"
        pt="3xl"
        color="red.4"
        size="xs"
        active={active}
        onStepClick={setActive}
      >
        <Stepper.Step label="Select Ride" icon={<IconCarFilled color="red" />}>
          <VehicleDetails
            bookNow={() => {
              setActive(1);
            }}
            vehicle={vehicle}
          />
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

        <Stepper.Step
          label="Verification"
          icon={<IconRosetteDiscountCheck color="red" />}
        >
          <DocumentVerification
            vehicle={vehicle}
            onFormSubmit={handleDocumentVerificationSubmit}
            formValues={bookingDetails}
          />
        </Stepper.Step>

        <Stepper.Step label="Payment" icon={<IconCreditCard color="red" />}>
          <PaymentBilling
            // bookNow will create booking. It accepts optional returnDate param; we can call without args.
            bookNow={handlePaymentBillingSubmit}
            vehicle={vehicle}
            formValues={bookingDetails}
            // pass computed summary so child is pure presentational
            paymentSummary={{
              returnDate: computedReturnDate,
              rentalCost,
              tax,
              total,
              baseRate,
              vehicleDurationLabel,
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
          />
        </Stepper.Step>
      </Stepper>
    </>
  );
}
