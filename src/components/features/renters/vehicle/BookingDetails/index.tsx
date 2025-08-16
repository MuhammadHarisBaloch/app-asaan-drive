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

interface BookingDetailsProps {
  onClick: () => void;
}

export default function BookingDetails({ onClick }: BookingDetailsProps) {
  return (
    <Stack py="3xl">
      <Text fz="30px" fw={600} c="black" lh={0.8}>
        Book Your Ride
      </Text>
      <Text fz="md">Complete the details below to finalize your booking</Text>
      <Grid gutter="xxl">
        <GridCol span={8}>
          <Card withBorder radius="lg">
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
                  >
                    <option value="1">Daily (Rs: 1000/day)</option>
                    <option value="1">Weekly (Rs: 7500/week)</option>
                    <option value="1">Monthly (Rs: 25000/month)</option>
                  </TextInput>
                  <NumberInput
                    w="100%"
                    label="Duration (Days)"
                    radius="md"
                    min={1}
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
                  />
                  <TimeInput
                    radius="md"
                    w="100%"
                    label="Pickup Time"
                    leftSection={<IconClockFilled size={20} />}
                  />
                </Flex>
              </Stack>
              <Stack>
                <TextInput
                  radius="md"
                  disabled
                  label="Pickup Location"
                  placeholder="Khairpur Mir's, Pakistan"
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
              <Button size="md" onClick={onClick}>
                Continue to Payment
              </Button>
            </Stack>
          </Card>
        </GridCol>
        <GridCol
          span={4}
          style={{ position: "sticky", top: 80, alignSelf: "flex-start" }}
        >
          <BookingSummaryCard />
        </GridCol>
      </Grid>
    </Stack>
  );
}
