import Images from "@/constants/Images";
import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCurrentLocationFilled,
  IconMapPin,
  IconPrinter,
  IconShare,
  IconStarFilled,
  IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import BookingIdCard from "./BookingIdCard";
import ContactInfoSection from "./ContactInfoSection";
import { data } from "@/constants/Data";

export default function BookingConfirmation() {
  return (
    <Stack py="3xl" px="8rem" gap="xl">
      <BookingIdCard />
      <Card
        w="100%"
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 2px #42424242)" }}
        px={0}
      >
        <Stack>
          <Flex gap="lg" p="lg">
            <Image
              height={100}
              width={100}
              src={Images.listedVehicles.cd125}
              alt="cd-125"
              sizes="100vw"
              style={{ width: "15%", height: "auto" }}
            />
            <Stack gap="md">
              <Text fz="xl" c="black " fw={600} lh={0.8}>
                Honda 125
              </Text>
              <Text fz="lg">Bike . 2025</Text>
              <Flex align="center" gap="xs">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStarFilled key={i} size={18} color="yellow" />
                ))}
                <Text fz="xs">4.8 (24 reviews)</Text>
              </Flex>
              <Flex gap="md">
                <Box
                  bg="green.1"
                  px="lg"
                  py="xs"
                  style={{ borderRadius: "20px" }}
                >
                  <Text c="green" fz="xs" fw={500}>
                    Confirmed
                  </Text>
                </Box>
                <Box
                  bg="blue.1"
                  px="lg"
                  py="xs"
                  style={{ borderRadius: "20px" }}
                >
                  <Text c="blue.6" fz="xs" fw={500}>
                    Paid Online
                  </Text>
                </Box>
              </Flex>
            </Stack>
          </Flex>
          <Divider w="100%" />
          <Stack p="lg" gap="xl">
            <Text fz="lg" c="black" fw={500}>
              Booking Details
            </Text>
            <SimpleGrid cols={2} spacing="lg" verticalSpacing="xxl">
              {data.renter.vehicle.bookingConfirmation.bookingTimeDetails.map(
                (data, i) => {
                  return (
                    <Flex key={i} gap="md" align="flex-start">
                      {data.icon}
                      <Stack gap="xxs">
                        <Text fz="xs" fw={500}>
                          {data.title}
                        </Text>
                        <Text fz="sm" c="black">
                          {data.subTitle}
                        </Text>
                      </Stack>
                    </Flex>
                  );
                }
              )}
            </SimpleGrid>
          </Stack>
          <Divider w="100%" />
          <Stack p="lg" gap="xl">
            <Text fz="lg" c="black" fw={500}>
              Pickup Location
            </Text>
            <Image
              height={100}
              width={100}
              src={Images.Map.pickupLocationMap}
              alt="cd-125"
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <Flex gap="md" align="flex-start">
              <IconMapPin size={20} color="gray" />
              <Stack gap="xxs">
                <Text fz="xs" fw={500}>
                  Address
                </Text>
                <Text fz="sm" c="black">
                  Karachi, Pakistan
                </Text>
                <Text fz="12px">
                  Please contact the owner for exact location details
                </Text>
              </Stack>
            </Flex>
          </Stack>
          <Divider w="100%" />
          <Stack p="lg" gap="xl">
            <Text fz="lg" c="black" fw={500}>
              Payment Summary
            </Text>
            {data.renter.vehicle.bookingConfirmation.paymentSummary.map(
              (data, i) => {
                return (
                  <Flex key={i} justify="space-between">
                    <Text fz="sm" c="black" fw={500}>
                      {data.title}
                    </Text>
                    <Text fz="sm" c="black">
                      {data.subTitle}
                    </Text>
                  </Flex>
                );
              }
            )}
            <Divider w="100%" />
            <Flex justify="space-between">
              <Text fz="lg" c="black" fw={500}>
                Total Paid
              </Text>
              <Text fz="lg" c="red.4">
                Rs: 3600
              </Text>
            </Flex>
          </Stack>
        </Stack>
        <Divider w="100%" />
        <ContactInfoSection />
      </Card>
      <Flex px="lg" gap="xl">
        <Button
          size="lg"
          fz="md"
          fw={500}
          w="100%"
          leftSection={<IconCurrentLocationFilled size={20} color="white" />}
        >
          Track Your Ride
        </Button>
        <Button
          size="lg"
          bg="white"
          fz="md"
          fw={500}
          w="100%"
          c="gray"
          leftSection={<IconUser size={20} color="gray" />}
          style={{ filter: "drop-shadow(1px 1px 2px #8c8c8cb3)" }}
        >
          Go to Dashboard
        </Button>
      </Flex>
      <Flex justify="center" gap="xl">
        <Button
          variant="transparent"
          size="lg"
          fz="md"
          fw={400}
          c="gray"
          leftSection={<IconPrinter size={25} color="gray" />}
        >
          Print Receipt
        </Button>
        <Button
          variant="transparent"
          size="lg"
          fz="md"
          fw={400}
          c="gray"
          leftSection={<IconShare size={25} color="gray" />}
        >
          Share Booking
        </Button>
      </Flex>
    </Stack>
  );
}
