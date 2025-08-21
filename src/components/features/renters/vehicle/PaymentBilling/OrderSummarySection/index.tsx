import { data } from "@/constants/Data";
import Images from "@/constants/Images";
import { Card, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import Image from "next/image";

interface orderDetails {
  title: string;
  subTitle: string;
  titleColor?: string;
  subTitleColor?: string;
}
[];
const orderDetails = [
  {
    title: "Rental Type:",
    subTitle: "Daily",
  },
  {
    title: "Days",
    subTitle: "2 Days",
  },
  {
    title: "Rate",
    subTitle: "Rs. 1200 / daily",
  },
  {
    title: "Return Date (Est.):",
    subTitle: "July 28, 2025",
  },
];
const subTotal = [
  {
    title: "Subtotal",
    subTitle: "Rs. 2400",
  },
  {
    title: "Tax (10%)",
    subTitle: "Rs. 240",
  },
];

export default function OrderSummarySection() {
  return (
    <Card h="100%" withBorder radius="lg" p="xl">
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
        {orderDetails.map((data, index) => {
          return (
            <Group key={index} justify="space-between">
              <Text fz="12px ">{data.title}</Text>
              <Text fz="12px " c="black">
                {data.subTitle}
              </Text>
            </Group>
          );
        })}
        <Divider w="100%" />
        {subTotal.map((data, index) => {
          return (
            <Group key={index} justify="space-between">
              <Text fz="12px ">{data.title}</Text>
              <Text fz="12px " c="black">
                {data.subTitle}
              </Text>
            </Group>
          );
        })}
        <Divider w="100%" />
        <Group justify="space-between">
          <Text fz="xs" c="black" fw={500}>
            Total:
          </Text>
          <Text fz="xs" c="red.4" fw={500}>
            Rs. 1380.00
          </Text>
        </Group>
        {/* <Card bg="white.4" radius="lg">
          <Stack gap="xs">
            <Flex align="center" gap="sm">
              <IconExclamationCircle size={15} color="red" />
              <Text fz="12px" fw={500} c="black">
                Important Information
              </Text>
            </Flex>
            <Text fz="10px">
              You'll be charged only after the owner accepts your booking
              request. Please be on time for pickup and return the vehicle in
              the same condition.
            </Text>
          </Stack>
        </Card> */}
      </Stack>
    </Card>
  );
}
