"use client";
import BookingDetails from "@/components/features/renters/vehicle/BookingDetails";
import VehicleDetails from "@/components/features/renters/vehicle/VehicleDetails";
import { Stepper } from "@mantine/core";
import {
  IconCalendarPlus,
  IconCarFilled,
  IconClipboardCheck,
  IconCreditCard,
  IconRosetteDiscountCheck,
} from "@tabler/icons-react";
import { useState } from "react";

export default function Vehicle() {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
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
          <VehicleDetails bookNow={nextStep} />
        </Stepper.Step>
        <Stepper.Step
          label="Book Details"
          icon={<IconCalendarPlus color="red" />}
        >
          <BookingDetails onClick={nextStep} />
        </Stepper.Step>
        <Stepper.Step
          label="Verification"
          icon={<IconRosetteDiscountCheck color="red" />}
        >
          Step 3 content: Verify the documents
        </Stepper.Step>
        <Stepper.Step label="Payment" icon={<IconCreditCard color="red" />}>
          Step 4 content: Pay the billing
        </Stepper.Step>
        <Stepper.Step
          label="Confirmation"
          icon={<IconClipboardCheck color="red" />}
        >
          Step 5 content: confirm your ride
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
      {/* <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group> */}
    </>
  );
}
