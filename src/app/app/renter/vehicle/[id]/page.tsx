"use client";

import BookingConfirmation from "@/components/features/renters/vehicle/BookingConfirmation";
import BookingDetails, {
  BookingFormValues,
} from "@/components/features/renters/vehicle/BookingDetails";
import DocumentVerification from "@/components/features/renters/vehicle/DocumentVerification";
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
  IconRosetteDiscountCheck,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { db } from "@/networking/firebase";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { useForm } from "@mantine/form";
import { FileWithPath } from "@mantine/dropzone";

export interface RenterBookingForm {
  rentalType: string;
  duration: number;
  pickUpDate: string | null;
  returnDate: string | null;
  pickUpTime: number | null;
  cnicFrontSide: FileWithPath[];
  cnicBackSide: FileWithPath[];
  driversLicenseFrontSide: FileWithPath[];
  driversLicenseBackSide: FileWithPath[];
}

export default function Vehicle() {
  //GET URL ID OF THE VEHICLE :

  const { id } = useParams<{ id: string }>();

  //STRORE THE VEHICLE DATA IN STATE :

  const [vehicle, setVehicle] = useState<VehicleModel | null>(null);

  const [active, setActive] = useState(0);

  const [bookingDetails, setBookingDetails] =
    useState<Partial<RenterBookingForm> | null>(null);

  //FETCH THE VEHICLE DATA :

  useEffect(() => {
    console.log("Active step changed to:", bookingDetails);
  }, [active]);

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

  if (!vehicle) return <p>Loading...</p>;

  const incrementStep = () => {
    setActive((prev) => prev + 1);
  };

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
          <VehicleDetails bookNow={incrementStep} vehicle={vehicle} />
        </Stepper.Step>
        <Stepper.Step
          label="Book Details"
          icon={<IconCalendarPlus color="red" />}
        >
          <BookingDetails
            vehicle={vehicle}
            onFormSubmit={(values) => {
              setBookingDetails((prev) => ({ ...prev, ...values }));
              incrementStep();
            }}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Verification"
          icon={<IconRosetteDiscountCheck color="red" />}
        >
          <DocumentVerification
            vehicle={vehicle}
            onFormSubmit={(values) => {
              setBookingDetails((prev) => ({ ...prev, ...values }));
              incrementStep();
            }}
            formValues={bookingDetails}
          />
        </Stepper.Step>
        <Stepper.Step label="Payment" icon={<IconCreditCard color="red" />}>
          <PaymentBilling
            bookNow={incrementStep}
            vehicle={vehicle}
            formValues={bookingDetails}
            onFormSubmit={(returnDate) => {
              setBookingDetails((prev) => ({ ...prev, returnDate }));
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
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
    </>
  );
}
