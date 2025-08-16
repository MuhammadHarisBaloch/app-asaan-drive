import { data } from "@/constants/Data";
import Images from "@/constants/Images";
import { Card, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import { IconExclamationCircle, IconMapPin } from "@tabler/icons-react";
import Image from "next/image";

export default function BookingSummaryCard() {
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
        {data.renter.vehicle.bookingDetails.vehicleDetails.map(
          (data, index) => {
            return (
              <Group key={index} justify="space-between">
                <Text fz="12px ">{data.title}</Text>
                <Text fz="12px " c="black">
                  {data.subTitle}
                </Text>
              </Group>
            );
          }
        )}
        <Divider w="100%" />
        {data.renter.vehicle.bookingDetails.paymentDetails.map(
          (data, index) => {
            return (
              <Group key={index} justify="space-between">
                <Text fz="12px " c={data.titleColor}>
                  {data.title}
                </Text>
                <Text fz="12px " c={data.subTitleColor}>
                  {data.subTitle}
                </Text>
              </Group>
            );
          }
        )}
        <Card bg="white.4" radius="lg">
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
        </Card>
      </Stack>
    </Card>
  );
}
