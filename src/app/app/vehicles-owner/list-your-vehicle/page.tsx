import {
  Box,
  Button,
  Card,
  Divider,
  FileInput,
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
import { IconCamera, IconFile } from "@tabler/icons-react";

export default function ListYourVehicle() {
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
                data={["Bike", "Cycle", "Rakshaw"]}
              />
              <TextInput
                w="100%"
                label="Make/Model"
                placeholder="e.g., Honda CD 70"
                radius="md"
              />
            </Flex>
            <Flex gap="xxl">
              <YearPickerInput
                w="100%"
                label="Year"
                placeholder="e.g., 2025"
                radius="md"
              />
              <TextInput
                w="100%"
                label="License Plate"
                placeholder="e.g., KHI-123"
                radius="md"
              />
            </Flex>
            <TextInput
              w="100%"
              label="Pickup Location"
              placeholder="e.g., Khairpur Mir's"
              radius="md"
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
              />
              <NumberInput
                w="100%"
                label="Weekly Rate (PKR)"
                placeholder="e.g., 2000"
                radius="md"
              />
              <NumberInput
                w="100%"
                label="Monthly Rate (PKR)"
                placeholder="e.g., 8000"
                radius="md"
              />
            </Flex>
          </Stack>
          <Divider w="100%" />
          <Stack gap="xl">
            <Text fz="lg" fw={500} c="black">
              Vehicle Photos
            </Text>
            <Box
              w="100%"
              style={{
                borderRadius: "10px",
                borderStyle: "dashed",
                borderColor: " gray",
              }}
            >
              <Stack align="center" py="xl" gap="xxs">
                <IconCamera size={45} color="gray" />
                <Flex align="center" gap="sm">
                  <FileInput
                    variant="unstyled"
                    placeholder="Upload Photos"
                    multiple
                    styles={{
                      placeholder: {
                        color: "red",
                        fontWeight: 500,
                        fontSize: "14px",
                      },
                    }}
                  />
                  <Text fz="xs" fw={500}>
                    or drag and drop
                  </Text>
                </Flex>
                <Text fz="12px">PNG, JPG, GIF up to 10MB</Text>
              </Stack>
            </Box>
          </Stack>
          <Divider w="100%" />
          <Stack gap="xl">
            <Text fz="lg" fw={500} c="black">
              Vehicle Documents
            </Text>
            <Text fz="xs" c="black">
              Upload required documents including registration, license, and
              insurance papers.
            </Text>
            <Box
              w="100%"
              style={{
                borderRadius: "10px",
                borderStyle: "dashed",
                borderColor: " gray",
              }}
            >
              <Stack align="center" py="xl" gap="xxs">
                <IconFile size={45} color="gray" />
                <Flex align="center" gap="sm">
                  <FileInput
                    variant="unstyled"
                    placeholder="Upload Documents"
                    multiple
                    styles={{
                      placeholder: {
                        color: "red",
                        fontWeight: 500,
                        fontSize: "14px",
                      },
                    }}
                  />
                  <Text fz="xs" fw={500}>
                    or drag and drop
                  </Text>
                </Flex>
                <Text fz="12px" ta="center" lh="2">
                  PDF, JPG, PNG up to 10MB each <br />
                  Required: Registration, License, Insurance
                </Text>
              </Stack>
            </Box>
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
            <Button>Submit Listing</Button>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}
