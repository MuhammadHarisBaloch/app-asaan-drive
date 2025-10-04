import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridCol,
  List,
  Stack,
  Text,
} from "@mantine/core";
import { IconExclamationCircle, IconShield } from "@tabler/icons-react";
import BookingSummary from "./BookingSummary";
import DocInputSection from "./DocInputSection";
import { data } from "@/constants/Data";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { FileWithPath } from "@mantine/dropzone";
import { useState } from "react";
import { RenterBookingForm } from "@/app/app/renter/vehicle/[id]/page";
interface DocPhotos {
  cnicFrontSide: FileWithPath[];
  cnicBackSide: FileWithPath[];
  driversLicenseFrontSide: FileWithPath[];
  driversLicenseBackSide: FileWithPath[];
}
interface DocumentVerificationProps {
  vehicle: VehicleModel;
  onFormSubmit: (docs: DocPhotos) => void;
  formValues: Partial<RenterBookingForm> | null;
}
export default function DocumentVerification({
  vehicle,
  onFormSubmit,
  formValues,
}: DocumentVerificationProps) {
  const cnicFrontSideState = useState<FileWithPath[]>([]);
  const cnicBackSideState = useState<FileWithPath[]>([]);
  const driversLicenseFrontSideState = useState<FileWithPath[]>([]);
  const driversLicenseBackSideState = useState<FileWithPath[]>([]);

  return (
    <Stack w="100%" align="center" py="3xl" gap="xxl">
      <Stack align="center" gap="xxs">
        <Text fz="30px" fw={600} c="black">
          Document Verification
        </Text>
        <Text fz="md">Complete the details below to finalize your booking</Text>
      </Stack>
      <Grid w="100%" gutter="xxl">
        <GridCol span={8}>
          <Card w="100%" p="lg" withBorder radius="lg">
            <Stack gap="lg">
              <Flex
                bg="blue.0"
                px="lg"
                py="md"
                gap="md"
                style={{ border: "1px solid #95b8ea", borderRadius: "10px" }}
              >
                <IconShield size={25} color="blue" />
                <Stack gap="xs">
                  <Text c="blue.6" fz="sm" fw={500}>
                    Secure Document Upload
                  </Text>
                  <Text fz="12px" c="blue.6">
                    Your documents are encrypted and securely stored. We only
                    use them for identity verification and comply with data
                    protection regulations.
                  </Text>
                </Stack>
              </Flex>
              <DocInputSection
                cnicFrontSideState={cnicFrontSideState}
                cnicBackSideState={cnicBackSideState}
                driversLicenseFrontSideState={driversLicenseFrontSideState}
                driversLicenseBackSideState={driversLicenseBackSideState}
              />
              <Box
                bg="orange.1"
                p="lg"
                style={{ border: "1px solid #fff69f", borderRadius: "10px" }}
              >
                <Flex align="flex-start" gap="sm">
                  <IconExclamationCircle size={20} color="#6D3503" />
                  <Stack>
                    <Text c="brown" fz="xs" fw={500}>
                      Important Information
                    </Text>
                    <List size="xs" withPadding>
                      {data.renter.vehicle.documentVerification.notices.map(
                        (data, index) => {
                          return (
                            <List.Item key={index} c="brown.6">
                              {data}
                            </List.Item>
                          );
                        }
                      )}
                    </List>
                  </Stack>
                </Flex>
              </Box>
              <Button
                size="md"
                onClick={() => {
                  onFormSubmit({
                    cnicFrontSide: cnicFrontSideState[0],
                    cnicBackSide: cnicBackSideState[0],
                    driversLicenseFrontSide: driversLicenseFrontSideState[0],
                    driversLicenseBackSide: driversLicenseBackSideState[0],
                  });
                }}
              >
                Continue to Payment
              </Button>
            </Stack>
          </Card>
        </GridCol>
        <GridCol
          span={4}
          style={{ position: "sticky", top: 80, alignSelf: "flex-start" }}
        >
          <BookingSummary vehicle={vehicle} formValues={formValues} />
        </GridCol>
      </Grid>
    </Stack>
  );
}
