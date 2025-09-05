"use client";
import { data } from "@/constants/Data";
import { createVehicleDocument } from "@/features/vehicle";
import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconPhoto } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
interface VehicleRegistrationForm {
  vehicleType: string;
  vehicleModel: string;
  vehicleYear: string;
  licensePlate: string;
  pickupLocation: string;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
}

export default function ListYourVehicle() {
  const [loader, { open: startLoading, close: stopLoading }] =
    useDisclosure(false);
  const formSubmitHandler = async (values: VehicleRegistrationForm) => {
    const vehicle = await createVehicleDocument(values);
    stopLoading();
    if (vehicle) {
      notifications.show({
        title: "Vehicle listed successfully",
        message: "",
      });
      return;
    }
    notifications.show({
      title: "Listing Failed",
      message: "",
    });
  };

  const form = useForm<VehicleRegistrationForm>({
    mode: "uncontrolled",
    initialValues: {
      vehicleType: "",
      vehicleModel: "",
      vehicleYear: "",
      licensePlate: "",
      pickupLocation: "",
      dailyRate: 0,
      weeklyRate: 0,
      monthlyRate: 0,
    },
    validate: {
      vehicleType: isNotEmpty("please select vehicle type"),
      vehicleModel: isNotEmpty("please enter vehicle model"),
      vehicleYear: isNotEmpty("please enter vehicle year"),
      licensePlate: isNotEmpty("please enter license plate"),
      pickupLocation: isNotEmpty("please enter pickup location"),
      dailyRate: (value) => (value <= 0 ? "please enter the daily rate" : null),
      weeklyRate: (value) =>
        value <= 0 ? "please enter the weekly rate" : null,
      monthlyRate: (value) =>
        value <= 0 ? "please enter the monthly rate" : null,
    },
  });

  return (
    <Stack align="center" py="xxl" px="6rem" gap="3xl">
      <Stack align="center" gap="sm">
        <Text fz="lg" c="red.4" fw={500}>
          Vehicle Registration
        </Text>
        <Title order={3}> List Your Vehicle</Title>
        <Text fz="lg">
          Turn your idle vehicle into a source of income by listing it on
          AsaanDrive.
        </Text>
      </Stack>
      <Card w="100%" withBorder radius="lg">
        <form
          onSubmit={form.onSubmit((values) => {
            startLoading();
            formSubmitHandler(values);
            console.log("Vehicle Registration form ", values);
            form.reset();
          })}
        >
          <Stack p="xxl" gap="3xl">
            <Stack gap="xl">
              <Text fz="lg" fw={500} c="black">
                Vehicle Details
              </Text>
              <Flex gap="xxl">
                <Select
                  w="100%"
                  label="Vehicle Type"
                  placeholder="Select Vehicle Type"
                  radius="md"
                  data={data.vehicleOwner.vehicleRegistration.vehicleTypes}
                  key={form.key("vehicleType")}
                  {...form.getInputProps("vehicleType")}
                />
                <TextInput
                  w="100%"
                  label="Make/Model"
                  placeholder="e.g., Honda CD 70"
                  radius="md"
                  key={form.key("vehicleModel")}
                  {...form.getInputProps("vehicleModel")}
                />
              </Flex>
              <Flex gap="xxl">
                <YearPickerInput
                  w="100%"
                  label="Year"
                  placeholder="e.g., 2025"
                  radius="md"
                  key={form.key("vehicleYear")}
                  {...form.getInputProps("vehicleYear")}
                />
                <TextInput
                  w="100%"
                  label="License Plate"
                  placeholder="e.g., KHI-123"
                  radius="md"
                  key={form.key("licensePlate")}
                  {...form.getInputProps("licensePlate")}
                />
              </Flex>
              <TextInput
                w="100%"
                label="Pickup Location"
                placeholder="e.g., Khairpur Mir's"
                radius="md"
                key={form.key("pickupLocation")}
                {...form.getInputProps("pickupLocation")}
              />
            </Stack>
            <Divider w="100%" />
            <Stack gap="xl">
              <Text fz="lg" fw={500} c="black">
                Pricing & Availability
              </Text>
              <Flex gap="xxl">
                <NumberInput
                  w="100%"
                  label="Daily Rate (PKR)"
                  placeholder="e.g., 500"
                  radius="md"
                  min={0}
                  key={form.key("dailyRate")}
                  {...form.getInputProps("dailyRate")}
                />
                <NumberInput
                  w="100%"
                  label="Weekly Rate (PKR)"
                  placeholder="e.g., 2000"
                  radius="md"
                  min={0}
                  key={form.key("weeklyRate")}
                  {...form.getInputProps("weeklyRate")}
                />
                <NumberInput
                  w="100%"
                  label="Monthly Rate (PKR)"
                  placeholder="e.g., 8000"
                  min={0}
                  radius="md"
                  key={form.key("monthlyRate")}
                  {...form.getInputProps("monthlyRate")}
                />
              </Flex>
            </Stack>
            <Divider w="100%" />
            <Stack gap="xl">
              <Text fz="lg" fw={500} c="black">
                Vehicle Photos
              </Text>
              <Dropzone
                onDrop={(files) => console.log("accepted files", files)}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
              >
                <Stack align="center" py="xl" gap="xxs">
                  <Dropzone.Idle>
                    <IconPhoto
                      size={52}
                      color="var(--mantine-color-dimmed)"
                      stroke={1.5}
                    />
                  </Dropzone.Idle>
                  <div>
                    <Stack align="center" py="xl" gap="xxs">
                      <Text fz="xs" fw={500}>
                        <span style={{ color: "red", fontWeight: 500 }}>
                          Upload Photos
                        </span>{" "}
                        or drag and drop
                      </Text>
                      <Text fz="12px">PNG, JPG, GIF up to 5MB</Text>
                    </Stack>
                  </div>
                </Stack>
              </Dropzone>
            </Stack>
            <Divider w="100%" />
            <Stack gap="xl">
              <Stack gap="sm">
                <Text fz="lg" fw={500} c="black">
                  Vehicle Documents
                </Text>
                <Text fz="xs" c="black">
                  Upload required documents including registration, license, and
                  insurance papers.
                </Text>
              </Stack>
              <Dropzone
                onDrop={(files) => console.log("accepted files", files)}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
              >
                <Stack align="center" py="xl" gap="xxs">
                  <Dropzone.Idle>
                    <IconPhoto
                      size={52}
                      color="var(--mantine-color-dimmed)"
                      stroke={1.5}
                    />
                  </Dropzone.Idle>
                  <div>
                    <Stack align="center" py="xl" gap="xxs">
                      <Text fz="xs" fw={500}>
                        <span style={{ color: "red", fontWeight: 500 }}>
                          upload documents
                        </span>{" "}
                        or drag and drop
                      </Text>
                      <Text fz="12px" ta="center" lh="2">
                        PDF, JPG, PNG up to 5MB each <br />
                        Required: Registration, License, Insurance
                      </Text>
                    </Stack>
                  </div>
                </Stack>
              </Dropzone>
            </Stack>
            <Divider w="100%" />
            <Stack gap="xl">
              <Text fz="lg" fw={500} c="black">
                Vehicle Description
              </Text>
              <Textarea
                w="100%"
                radius="md"
                label="Description"
                placeholder="Describe your vehicle, its condition, feature, etc"
                rows={6}
              />
            </Stack>
            <Divider w="100%" />
            <Group justify="space-between">
              <Box />
              <Button type="submit" loading={loader}>
                Submit Listing
              </Button>
            </Group>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
}
