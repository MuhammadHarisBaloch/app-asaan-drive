"use client";
import { data } from "@/constants/Data";
import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  Group,
  Loader,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPhoto } from "@tabler/icons-react";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import DropzoneImagePreview from "../../../../components/features/core/dropzone-image-preview";
import { useRouter } from "next/navigation";
import VerificationOverlay from "@/components/features/VerificationOverlay";

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

// EXACT vehicle types with correct spelling "Rakshaw"
const PRICE_RANGES = {
  Cycle: {
    daily: { min: 200, max: 400 },
    weekly: { min: 1400, max: 1600 },
    monthly: { min: 5000, max: 6000 },
  },
  Bike: {
    daily: { min: 400, max: 600 },
    weekly: { min: 3000, max: 3500 },
    monthly: { min: 10000, max: 15000 },
  },
  Rakshaw: {
    daily: { min: 700, max: 900 },
    weekly: { min: 5000, max: 6500 },
    monthly: { min: 18000, max: 22000 },
  },
};

export default function ListYourVehicle() {
  const [vehiclePhotos, setVehiclePhotos] = useState<FileWithPath[]>([]);
  const [vehicleDocs, setVehicleDocs] = useState<FileWithPath[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loader, { open: startLoading, close: stopLoading }] =
    useDisclosure(false);
  const [userLoading, setUserLoading] = useState(true);
  const [showVerificationOverlay, setShowVerificationOverlay] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper function to get price range
  const getPriceRange = (vehicleType: string) => {
    if (!vehicleType) return null;
    return PRICE_RANGES[vehicleType as keyof typeof PRICE_RANGES] || null;
  };

  // Fetch user data and check verification status - ONLY ON CLIENT SIDE
  useEffect(() => {
    if (!mounted) return;

    const fetchUserData = async () => {
      const ownerID = getAuth().currentUser?.uid;
      if (!ownerID) {
        setUserLoading(false);
        return;
      }

      try {
        // Dynamic import for server-side code
        const { getUserDocument } = await import("@/features/user");
        const userData = await getUserDocument(ownerID);
        setUser(userData);

        // Check user verification status
        if (userData) {
          const shouldShowOverlay =
            userData.documentStatus !== "Verified" ||
            userData.status === "Blocked";

          if (shouldShowOverlay) {
            setShowVerificationOverlay(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserData();
  }, [mounted]);

  const form = useForm<VehicleRegistrationForm>({
    mode: "controlled",
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
      dailyRate: (value, values) => {
        if (value <= 0) return "please enter the daily rate";

        const range = getPriceRange(values.vehicleType);
        if (range && (value < range.daily.min || value > range.daily.max)) {
          return `Daily rate for ${values.vehicleType} must be between Rs. ${range.daily.min} and Rs. ${range.daily.max}`;
        }
        return null;
      },
      weeklyRate: (value, values) => {
        if (value <= 0) return "please enter the weekly rate";

        const range = getPriceRange(values.vehicleType);
        if (range && (value < range.weekly.min || value > range.weekly.max)) {
          return `Weekly rate for ${values.vehicleType} must be between Rs. ${range.weekly.min} and Rs. ${range.weekly.max}`;
        }
        return null;
      },
      monthlyRate: (value, values) => {
        if (value <= 0) return "please enter the monthly rate";

        const range = getPriceRange(values.vehicleType);
        if (range && (value < range.monthly.min || value > range.monthly.max)) {
          return `Monthly rate for ${values.vehicleType} must be between Rs. ${range.monthly.min} and Rs. ${range.monthly.max}`;
        }
        return null;
      },
    },
  });

  const formSubmitHandler = async (values: VehicleRegistrationForm) => {
    const ownerID = getAuth().currentUser?.uid;
    if (!ownerID) {
      notifications.show({
        title: "User not authenticated",
        message: "Please log in to list your vehicle.",
      });
      return;
    }

    // Dynamic imports for server-side code
    const { getUserDocument } = await import("@/features/user");
    const { createVehicleDocument } = await import("@/features/vehicle");
    const StorageService = (await import("@/features/storage")).default;

    const userData = await getUserDocument(ownerID);

    if (!userData) {
      notifications.show({
        title: "User data not found",
        message: "Please re-login and try again.",
      });
      return;
    }

    // Check verification status before submitting
    if (
      userData.documentStatus !== "Verified" ||
      userData.status === "Blocked"
    ) {
      notifications.show({
        title: "Account Not Verified",
        message: "Please complete your document verification to list vehicles.",
        color: "red",
      });
      return;
    }

    setUser(userData);
    console.log("Owner Data is here : ", userData);

    startLoading();

    try {
      const uploadedPhotoIds = await Promise.all(
        vehiclePhotos.map((file) => StorageService.shared.uploadFile(file))
      );
      const uploadedPhotoUrls = await Promise.all(
        uploadedPhotoIds.map((id) => StorageService.shared.downloadFile(id))
      );
      console.log("Uploaded Photo IDs: ", uploadedPhotoIds);

      const uploadedDocIds = await Promise.all(
        vehicleDocs.map((file) => StorageService.shared.uploadFile(file))
      );
      const uploadedDocUrls = await Promise.all(
        uploadedDocIds.map((id) => StorageService.shared.downloadFile(id))
      );
      console.log("Uploaded Doc IDs: ", uploadedDocIds);

      const vehicle = await createVehicleDocument({
        ...values,
        ownerID,
        ownerName: userData.fullName || "",
        ownerNumber: userData.phoneNumber || "",
        ownerEmail: userData.email || "",
        ownerType: userData.userType || "",
        vehiclePhotos: uploadedPhotoUrls,
        vehicleDocs: uploadedDocUrls,
      });

      if (vehicle) {
        notifications.show({
          title: "Vehicle listed successfully",
          message: "",
        });
        router.push(`/app/vehicles-owner`);
        stopLoading();
        return;
      }
    } catch (error) {
      console.error("Error listing vehicle:", error);
      notifications.show({
        title: "Listing Failed",
        message: "Something went wrong. Please try again.",
      });
    }

    stopLoading();
  };

  // Don't render during build/SSR
  if (!mounted) {
    return (
      <Center h="100vh">
        <Loader size="lg" color="red.4" />
      </Center>
    );
  }

  // Show loading while checking authentication and user status
  if (userLoading) {
    return (
      <Center h="100vh">
        <Loader size="lg" color="red.4" />
      </Center>
    );
  }

  return (
    <>
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
                <Select
                  w="100%"
                  label="Pickup Location"
                  placeholder="e.g., Khairpur Mir's"
                  radius="md"
                  key={form.key("pickupLocation")}
                  {...form.getInputProps("pickupLocation")}
                  data={data.availableCities}
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
                    description={(() => {
                      const range = getPriceRange(form.values.vehicleType);
                      return range
                        ? `Range: Rs. ${range.daily.min} - ${range.daily.max}`
                        : "Select vehicle type to see range";
                    })()}
                  />
                  <NumberInput
                    w="100%"
                    label="Weekly Rate (PKR)"
                    placeholder="e.g., 2000"
                    radius="md"
                    min={0}
                    key={form.key("weeklyRate")}
                    {...form.getInputProps("weeklyRate")}
                    description={(() => {
                      const range = getPriceRange(form.values.vehicleType);
                      return range
                        ? `Range: Rs. ${range.weekly.min} - ${range.weekly.max}`
                        : "Select vehicle type to see range";
                    })()}
                  />
                  <NumberInput
                    w="100%"
                    label="Monthly Rate (PKR)"
                    placeholder="e.g., 8000"
                    min={0}
                    radius="md"
                    key={form.key("monthlyRate")}
                    {...form.getInputProps("monthlyRate")}
                    description={(() => {
                      const range = getPriceRange(form.values.vehicleType);
                      return range
                        ? `Range: Rs. ${range.monthly.min} - ${range.monthly.max}`
                        : "Select vehicle type to see range";
                    })()}
                  />
                </Flex>
              </Stack>
              <Divider w="100%" />
              <Stack gap="xl">
                <Text fz="lg" fw={500} c="black">
                  Vehicle Photos
                </Text>
                <Dropzone
                  onDrop={setVehiclePhotos}
                  onReject={(files) =>
                    console.log("rejected files", files[0].file.name)
                  }
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
                <DropzoneImagePreview images={vehiclePhotos} />
              </Stack>
              <Divider w="100%" />
              <Stack gap="xl">
                <Stack gap="sm">
                  <Text fz="lg" fw={500} c="black">
                    Vehicle Documents
                  </Text>
                  <Text fz="xs" c="black">
                    Upload required documents including registration, license,
                    and insurance papers.
                  </Text>
                </Stack>
                <Dropzone
                  onDrop={setVehicleDocs}
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
                <DropzoneImagePreview images={vehicleDocs} />
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

      {showVerificationOverlay && user && (
        <VerificationOverlay isOpen={showVerificationOverlay} userData={user} />
      )}
    </>
  );
}

export const dynamic = "force-dynamic";
