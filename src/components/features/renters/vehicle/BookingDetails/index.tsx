import {
  Button,
  Card,
  Flex,
  Grid,
  GridCol,
  NumberInput,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import {
  IconCalendarMonthFilled,
  IconCalendarWeek,
  IconChevronDown,
  IconClockFilled,
} from "@tabler/icons-react";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import BookingSummaryCard from "./BookingSummaryCard";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";

export interface BookingFormValues {
  rentalType: string;
  duration: number;
  pickUpDate: string | null;
  pickUpTime: number;
}
interface BookingDetailsProps {
  vehicle: VehicleModel;
  onFormSubmit: (values: BookingFormValues) => void;
}
export default function BookingDetails({
  onFormSubmit,
  vehicle,
}: BookingDetailsProps) {
  const [bookingDetails, setBookingDetails] =
    useState<BookingFormValues | null>(null);

  // USE-FORM FOR VALUES :

  const form = useForm<BookingFormValues>({
    initialValues: {
      rentalType: "",
      duration: 0,
      pickUpDate: null,
      pickUpTime: 0,
    },
    validate: {
      rentalType: isNotEmpty("Please select any rental type"),
      duration: (values) =>
        values <= 0 ? "Please select the duration time" : null,
      pickUpDate: isNotEmpty("Select the pickup date"),
      pickUpTime: isNotEmpty("Select the pickup time"),
    },
  });

  return (
    <Stack py="3xl">
      <Text fz="30px" fw={600} c="black" lh={0.8}>
        Book Your Ride
      </Text>
      <Text fz="md">Complete the details below to finalize your booking</Text>
      <Grid gutter="xxl">
        <GridCol span={8}>
          <Card withBorder radius="lg">
            <form
              onSubmit={form.onSubmit((values) => {
                setBookingDetails(values);
                console.log("Booking Details Values :", values);
                onFormSubmit(values);
              })}
            >
              <Stack px="lg" py="lg" gap="xl">
                <Stack gap={0}>
                  <Text fz="lg" fw={500} c="black">
                    Rental Options
                  </Text>
                  <Flex align="flex-end" gap="xl">
                    <TextInput
                      w="100%"
                      label="Rental Type"
                      component="select"
                      rightSection={<IconChevronDown size={14} stroke={1.5} />}
                      pointer
                      mt="md"
                      radius="md"
                      key={form.key("rentalType")}
                      {...form.getInputProps("rentalType")}
                    >
                      <option value="1"></option>
                      <option value="Daily">
                        Daily (Rs: {vehicle.dailyRate}/day)
                      </option>
                      <option value="Weekly">
                        Weekly (Rs: {vehicle.weeklyRate}/week)
                      </option>
                      <option value="Monthly">
                        Monthly (Rs: {vehicle.monthlyRate}/month)
                      </option>
                    </TextInput>
                    <NumberInput
                      w="100%"
                      label="Duration (Days)"
                      radius="md"
                      min={1}
                      key={form.key("duration")}
                      {...form.getInputProps("duration")}
                    />
                  </Flex>
                </Stack>
                <Stack gap="md">
                  <Text fz="lg" fw={500} c="black">
                    Pickup Details
                  </Text>
                  <Flex align="flex-end" gap="xl">
                    <DatePickerInput
                      radius="md"
                      w="100%"
                      label="Pickup Date"
                      placeholder="7/7/2025"
                      leftSection={<IconCalendarWeek size={20} stroke={1.5} />}
                      rightSection={
                        <IconCalendarMonthFilled size={20} color="black" />
                      }
                      key={form.key("pickUpDate")}
                      {...form.getInputProps("pickUpDate")}
                    />
                    <TimeInput
                      radius="md"
                      w="100%"
                      label="Pickup Time"
                      leftSection={<IconClockFilled size={20} />}
                      key={form.key("pickUpTime")}
                      {...form.getInputProps("pickUpTime")}
                    />
                  </Flex>
                </Stack>
                <Stack>
                  <TextInput
                    radius="md"
                    disabled
                    label="Pickup Location"
                    placeholder={vehicle.pickupLocation + " ,Pakistan"}
                    styles={{
                      input: {
                        backgroundColor: "#d9d9d925",
                      },
                    }}
                  />
                  <Text fz="12px">
                    Location is set to the vehicle's registered address
                  </Text>
                </Stack>
                <Text fz="lg" c="black" fw={500}>
                  Additional Information
                </Text>
                <Textarea
                  w="100%"
                  radius="md"
                  label="Notes for Vehicle Owner (Optional)"
                  placeholder="Add any Special Request or Question......"
                  rows={4}
                />
                <Button size="md" type="submit">
                  Continue to Verification
                </Button>
              </Stack>
            </form>
          </Card>
        </GridCol>
        <GridCol
          span={4}
          style={{ position: "sticky", top: 80, alignSelf: "flex-start" }}
        >
          <BookingSummaryCard vehicle={vehicle} values={form.values} />
        </GridCol>
      </Grid>
    </Stack>
  );
}
