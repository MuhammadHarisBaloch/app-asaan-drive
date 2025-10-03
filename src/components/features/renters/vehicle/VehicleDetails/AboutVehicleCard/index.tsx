import { data } from "@/constants/Data";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { Card, Stack, Group, Divider, Text } from "@mantine/core";
import {
  IconMotorbikeFilled,
  IconCalendarWeek,
  IconMapPin,
  IconCircleCheck,
  IconBike,
  IconCar,
  IconCircle,
  IconTruck,
} from "@tabler/icons-react";
interface AboutVehicleCardProps {
  vehicle: VehicleModel;
}
const getVehicleIcon = (type: string) => {
  switch (type) {
    case "Bike":
      return <IconMotorbikeFilled color="red" size={60} />;
    case "Cycle":
      return <IconBike color="red" size={60} />;
    case "Rakshaw":
      return <IconTruck color="red" size={60} />;
    case "Car":
      return <IconCar color="red" size={60} />;
    default:
      return <IconCircle color="gray" size={60} />; // fallback icon
  }
};
export default function AboutVehicleCard({ vehicle }: AboutVehicleCardProps) {
  const vehicleFeatures = [
    {
      icon: getVehicleIcon(vehicle.vehicleType),
      title: "Type",
      subTitle: `${vehicle.vehicleType}`,
    },
    {
      icon: <IconCalendarWeek color="red" size={60} />,
      title: "Year",
      subTitle: `${vehicle.vehicleYear}`,
    },
    {
      icon: <IconMapPin color="red" size={60} />,
      title: "Location",
      subTitle: `${vehicle.pickupLocation}`,
    },
    {
      icon: <IconCircleCheck color="green" size={60} />,
      title: "Status",
      subTitle: "Available",
      textColor: "green",
    },
  ];
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
              {vehicle.vehicleModel}
            </Text>
            <Text fz="md">
              {vehicle.vehicleType} . {vehicle.vehicleYear}
            </Text>
          </Stack>
          <Stack gap="xxs">
            <Text fz="xl" fw={600} c="red.5">
              Rs {vehicle.dailyRate}/day
            </Text>
            <Text fz="md">Starting from</Text>
          </Stack>
        </Group>
        <Group justify="space-between">
          {vehicleFeatures.map((data, index) => {
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
          })}
        </Group>
        <Stack gap="xxs">
          <Text fz="md" c="black" fw={600}>
            About this vehicle
          </Text>
          <Text fz="xs">
            Well-maintained {vehicle.vehicleModel} perfect for city rides. fuel
            efficient and comfortable
          </Text>
        </Stack>
        <Divider w="100%" />
        <Text fz="md" c="black" fw={600}>
          Pricing
        </Text>
        <Group>
          {[
            { option: "Daily", price: vehicle.dailyRate },
            { option: "Weekly", price: vehicle.weeklyRate },
            { option: "Monthly", price: vehicle.monthlyRate },
          ].map((data, index) => {
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
          })}
        </Group>
      </Stack>
    </Card>
  );
}
