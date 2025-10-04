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

interface RenterBookingForm {
  rentalType: string;
  duration: number;
  pickUpDate: number | null;
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

  const form = useForm<RenterBookingForm>({
    mode: "uncontrolled",
    initialValues: {
      rentalType: "",
      duration: 0,
      pickUpDate: null,
      pickUpTime: null,
      cnicFrontSide: [],
      cnicBackSide: [],
      driversLicenseFrontSide: [],
      driversLicenseBackSide: [],
    },
  });

  //FETCH THE VEHICLE DATA :

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

  const handleBookNow = () => {
    setActive((prev) => prev + 1);
  };

  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));

  return (
    <>
      <form>
        <Stepper
          px="xl"
          pt="3xl"
          color="red.4"
          size="xs"
          active={active}
          onStepClick={setActive}
        >
          <Stepper.Step
            label="Select Ride"
            icon={<IconCarFilled color="red" />}
          >
            <VehicleDetails bookNow={handleBookNow} vehicle={vehicle} />
          </Stepper.Step>
          <Stepper.Step
            label="Book Details"
            icon={<IconCalendarPlus color="red" />}
          >
            <BookingDetails
              bookNow={handleBookNow}
              vehicle={vehicle}
              onFormSubmit={(values) => {
                form.setFieldValue("rentalType", values.rentalType);
                form.setFieldValue("duration", values.duration);
                form.setFieldValue("pickUpDate", values.pickUpDate);
                form.setFieldValue("pickUpTime", values.pickUpTime);
              }}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Verification"
            icon={<IconRosetteDiscountCheck color="red" />}
          >
            <DocumentVerification
              bookNow={handleBookNow}
              vehicle={vehicle}
              onFormSubmit={(values) => {
                form.setFieldValue("cnicFrontSide", values.cnicFrontSide);
                form.setFieldValue("cnicBackSide", values.cnicBackSide);
                form.setFieldValue(
                  "driversLicenseFrontSide",
                  values.driversLicenseFrontSide
                );
                form.setFieldValue(
                  "driversLicenseBackSide",
                  values.driversLicenseBackSide
                );
              }}
            />
          </Stepper.Step>
          <Stepper.Step label="Payment" icon={<IconCreditCard color="red" />}>
            <PaymentBilling bookNow={handleBookNow} vehicle={vehicle} />
          </Stepper.Step>
          <Stepper.Step
            label="Confirmation"
            icon={<IconClipboardCheck color="red" />}
          >
            <BookingConfirmation vehicle={vehicle} />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </form>
    </>
  );
}
