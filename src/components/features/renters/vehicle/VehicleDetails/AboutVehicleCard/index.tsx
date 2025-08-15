import { data } from "@/constants/Data";
import { Card, Stack, Group, Divider, Text } from "@mantine/core";

export default function AboutVehicleCard() {
  return (
    <Card
      w="100%"
      radius="lg"
      style={{ filter: "drop-shadow(1px 1px 1px #2323238c)" }}
    >
      <Stack gap="xxl" py="lg" px="md">
        <Group justify="space-between">
          <Stack gap="xxs">
            <Text fz="xl" fw={600} c="black">
              Honda 125
            </Text>
            <Text fz="md">Bike . 2025</Text>
          </Stack>
          <Stack gap="xxs">
            <Text fz="xl" fw={600} c="red.5">
              Rs 1000/day
            </Text>
            <Text fz="md">Starting from</Text>
          </Stack>
        </Group>
        <Group justify="space-between">
          {data.renter.vehicle.vehicleDetails.vehicleFeatures.map(
            (data, index) => {
              return (
                <Card
                  withBorder
                  w="20%"
                  key={index}
                  bg="white.5"
                  radius="md"
                  py="xl"
                >
                  <Stack align="center" gap={0}>
                    {data.icon}
                    <Text fz="xs" c="black">
                      {data.title}
                    </Text>
                    <Text fz="12px" c={data.textColor}>
                      {data.subTitle}
                    </Text>
                  </Stack>
                </Card>
              );
            }
          )}
        </Group>
        <Stack gap="xxs">
          <Text fz="md" c="black" fw={600}>
            About this vehicle
          </Text>
          <Text fz="xs">
            Well-maintained Honda 125 perfect for city rides. fuel efficient and
            comfortable
          </Text>
        </Stack>
        <Divider w="100%" />
        <Text fz="md" c="black" fw={600}>
          Pricing
        </Text>
        <Group>
          {data.renter.vehicle.vehicleDetails.vehiclePrices.map(
            (data, index) => {
              return (
                <Card
                  key={index}
                  w="20%"
                  bg="white.5"
                  radius="md"
                  py="md"
                  withBorder
                >
                  <Stack align="center" gap="xxs">
                    <Text fz="md" c="red.4" fw={600}>
                       {data.price}
                    </Text>
                    <Text fz="12px">{data.option}</Text>
                  </Stack>
                </Card>
              );
            }
          )}
        </Group>
      </Stack>
    </Card>
  );
}
