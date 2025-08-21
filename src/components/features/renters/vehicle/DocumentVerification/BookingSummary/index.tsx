import Images from "@/constants/Images";
import { Card, Stack, Flex, Divider, Group, Text } from "@mantine/core";
import { IconMapPin, IconEye } from "@tabler/icons-react";
import Image from "next/image";
interface bookingPaymentDetails {
  title: string;
  subTitle: string;
  subTitleColor?: string;
}
[];
const bookingPaymentDetails: bookingPaymentDetails[] = [
  {
    title: "Rental Type:",
    subTitle: "Daily",
    subTitleColor: "black",
  },
  {
    title: "Duration:",
    subTitle: "1 Days",
    subTitleColor: "black",
  },
  {
    title: "Total Amount:",
    subTitle: "Rs. 1500.00",
    subTitleColor: "red.4",
  },
];
export default function BookingSummary() {
  return (
    <Card withBorder radius="lg" p="xl">
      <Stack>
        <Text fz="lg" c="black" fw={500}>
          Booking Summary
        </Text>
        <Flex gap="lg">
          <Image
            src={Images.listedVehicles.cd125}
            alt="cd-125"
            height={100}
            width={100}
            sizes="100vw"
            style={{
              width: "40%",
              height: "auto",
            }}
          />
          <Stack gap="xs">
            <Text fz="sm" fw={600} c="black">
              Honda 125
            </Text>
            <Text fz="12px">Bike . 2025</Text>
            <Flex align="center" gap="sm">
              <IconMapPin size={15} color="gray" />
              <Text fz="12px">Khairpur Mir’s, Pakistan</Text>
            </Flex>
          </Stack>
        </Flex>
        <Divider w="100%" />
        {bookingPaymentDetails.map((data, index) => {
          return (
            <Group key={index} justify="space-between">
              <Text fz="12px ">{data.title}</Text>
              <Text fz="12px " c={data.subTitleColor}>
                {data.subTitle}
              </Text>
            </Group>
          );
        })}
        <Card bg="blue.0" radius="lg" style={{ border: "1px solid #bfd8fc" }}>
          <Stack gap="xs">
            <Flex align="center" gap="sm">
              <IconEye size={15} color="blue" />
              <Text fz="12px" fw={500} c="blue.6">
                Document Verification
              </Text>
            </Flex>
            <Text fz="10px" c="blue.3">
              Upload valid documents to proceed with your booking. Your
              information is secure and encrypted
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  );
}
