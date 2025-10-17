"use client";
import { Box, Card, Flex, Stack, Text, Badge } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";

interface VehicleInfoSectionProps {
  vehicle: VehicleModel;
  setSelectedImage: (src: string) => void;
  setZoom: (open: boolean) => void;
}

export function VehicleInfoSection({
  vehicle,
  setSelectedImage,
  setZoom,
}: VehicleInfoSectionProps) {
  const { color, bgColor } = getStatusColors(vehicle.status ?? "");

  const priceRates = [
    { category: "Daily", price: vehicle.dailyRate },
    { category: "Weekly", price: vehicle.weeklyRate },
    { category: "Monthly", price: vehicle.monthlyRate },
  ];

  return (
    <Stack gap="md">
      {/* Vehicle Photos */}
      <Carousel
        height={400}
        p="md"
        withIndicators
        controlSize={40}
        withControls
        emblaOptions={{ loop: true }}
        style={{ borderRadius: "20px", border: "1px solid gray" }}
        styles={{
          control: { backgroundColor: "#0000005d", color: "white" },
          indicator: { backgroundColor: "red" },
        }}
      >
        {vehicle.vehiclePhotos.map((data, index) => (
          <Carousel.Slide key={index}>
            <Image
              src={data}
              alt={vehicle.vehicleModel}
              unoptimized
              height={100}
              width={100}
              sizes="100vw"
              style={{
                objectFit: "cover",
                borderRadius: "10px",
                width: "100%",
                height: "auto",
              }}
            />
          </Carousel.Slide>
        ))}
      </Carousel>

      {/* Vehicle Details */}
      <Text c="black" fz="lg" fw={600}>
        Vehicle Details:
      </Text>
      <Box style={{ border: "1px solid grey", borderRadius: "10px" }}>
        <Stack py="lg" px="3xl">
          <Flex align="center" justify="space-between">
            <Stack gap="md">
              {[
                ["Model", vehicle.vehicleModel],
                ["License Plate", vehicle.licensePlate],
                ["Owner", vehicle.ownerName],
                ["Year", vehicle.vehicleYear],
              ].map(([label, value], i) => (
                <Stack key={i} gap={0}>
                  <Text fz="lg" c="red.4" fw={600}>
                    {label}:
                  </Text>
                  <Text fw={500} c="black">
                    {value}
                  </Text>
                </Stack>
              ))}
            </Stack>

            <Stack>
              {[
                ["Type", vehicle.vehicleType],
                ["Location", vehicle.pickupLocation],
                ["Contact", vehicle.ownerNumber],
              ].map(([label, value], i) => (
                <Stack key={i} gap={0}>
                  <Text fz="lg" c="red.4" fw={600}>
                    {label}:
                  </Text>
                  <Text fw={500} c="black">
                    {value}
                  </Text>
                </Stack>
              ))}

              <Stack gap={0}>
                <Text fz="lg" c="red.4" fw={600}>
                  Status:
                </Text>
                <Badge
                  c={color}
                  bg={bgColor}
                  fw={500}
                  styles={{
                    root: {
                      textAlign: "center",
                      textTransform: "lowercase",
                    },
                  }}
                >
                  {vehicle.status}
                </Badge>
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      </Box>

      {/* Rates */}
      <Stack>
        <Text c="black" fz="lg" fw={600}>
          Rental Rates:
        </Text>
        <Flex w="100%" py="lg" px="3xl" align="center" gap="xl">
          {priceRates.map((data, i) => (
            <Card w="100%" key={i} bg="white.4" radius="md">
              <Stack align="center" gap={0}>
                <Text fw={600} c="black">
                  {data.category}
                </Text>
                <Text fw={500} c="red.4">
                  Rs: {data.price}
                </Text>
              </Stack>
            </Card>
          ))}
        </Flex>
      </Stack>

      {/* Documents */}
      <Stack>
        <Text c="black" fz="lg" fw={600}>
          Vehicle Documents:
        </Text>
        <Carousel
          height={300}
          p="md"
          withIndicators
          controlSize={40}
          withControls
          emblaOptions={{ loop: true }}
          style={{ borderRadius: "20px", border: "1px solid gray" }}
          styles={{
            control: { backgroundColor: "#0000005d", color: "white" },
            indicator: { backgroundColor: "red" },
          }}
        >
          {vehicle.vehicleDocs.map((data, index) => (
            <Carousel.Slide key={index}>
              <Image
                src={data}
                alt={vehicle.vehicleModel}
                unoptimized
                height={100}
                width={100}
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  borderRadius: "10px",
                  width: "100%",
                  height: "auto",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedImage(data);
                  setZoom(true);
                }}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Stack>
    </Stack>
  );
}

export function getStatusColors(status: string) {
  switch (status) {
    case "available":
      return { color: "green", bgColor: "green.1" };
    case "pending":
      return { color: "orange", bgColor: "orange.0" };
    case "booked":
      return { color: "blue", bgColor: "blue.1" };
    case "inactive":
      return { color: "red", bgColor: "pink.1" };
    case "active":
      return { color: "blue", bgColor: "blue.1" };
    default:
      return { color: "gray", bgColor: "gray.1" };
  }
}
