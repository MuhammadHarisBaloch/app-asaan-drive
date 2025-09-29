import {
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconEdit, IconMapPin, IconTrashX } from "@tabler/icons-react";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { listOwnerVehicleDocs } from "../../../../../features/vehicle";
import { VehicleModel } from "../../../../../features/vehicle/models/vehicle.model";
import DeleteVehicleModal from "./DeleteVehicleModal";
import EditVehicleModal from "./EditVehicleModal";

export default function VehicleManagementSection() {
  let color: string;
  let bgColor: string;

  const [Vehicles, setVehicles] = useState<VehicleModel[]>([]);
  const [status, setStatus] = useState("available");

  useEffect(() => {
    const listOwnerVehicles = async () => {
      const user = getAuth().currentUser;
      if (!user) return;
      const vehicles = await listOwnerVehicleDocs(user.uid);
      return vehicles;
    };

    listOwnerVehicles().then((vehicles) => {
      console.log(vehicles);
      setVehicles(vehicles ?? []);
    });
  }, []);

  switch (status) {
    case "available":
      color = "green";
      bgColor = "green.1";
      break;
    case "booked":
      color = "blue";
      bgColor = "blue.1";
      break;
    case "inactive":
      color = "black";
      bgColor = "gray.1";
      break;
  }

  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Vehicle Management
        </Text>
        <Text fz="12px">Manage your fleet and track vehicle performance</Text>
      </Stack>
      <SimpleGrid pb="xl" cols={3} spacing="xl" verticalSpacing="xxl">
        {Vehicles.map((data, i) => {
          return (
            <Card
              key={i}
              padding="lg"
              radius="lg"
              style={{
                filter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25))",
              }}
            >
              <CardSection>
                {data.vehiclePhotos.length > 0 && (
                  <Image
                    src={data.vehiclePhotos[0]}
                    alt={data.vehicleModel}
                    width={100}
                    height={100}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "12rem",
                    }}
                  />
                )}
              </CardSection>
              <Stack pt="xs" align="center" w="100%">
                <Group w="100%" align="flex-start" justify="space-between">
                  <Stack gap="xs">
                    <Text fz="md" c="black" fw={600} lh={1.2}>
                      {data.vehicleModel}
                    </Text>
                    <Text fz="xs">{data.licensePlate}</Text>
                  </Stack>
                  <Badge
                    bg={bgColor}
                    c={color}
                    fw={500}
                    styles={{
                      root: { textAlign: "center", textTransform: "lowercase" },
                    }}
                  >
                    {status}
                  </Badge>
                </Group>
                <Group w="100%" justify="space-between">
                  <Flex gap="sm" align="center">
                    <IconMapPin size={18} color="gray" />
                    <Text fz="xs">{data.pickupLocation}</Text>
                  </Flex>
                  <Text fz="xs" c="red.4" fw={500}>
                    {data.dailyRate} /Day <br />
                  </Text>
                </Group>
                <Group w="100%" align="flex-start" justify="space-between">
                  <Text fz="xs">Total Bookings</Text>
                  <Text fz="xs" c="black">
                    {0}
                  </Text>
                </Group>
                <Flex w="100%" gap="md" justify="space-between">
                  <Button
                    fullWidth
                    leftSection={<IconEdit size={20} />}
                    bg="blue.1"
                    c="blue"
                    mt="sm"
                    fz="xs"
                    onClick={() => {
                      EditVehicleModal({
                        vehicleName: data.vehicleModel,
                        vehicleNumberPlate: data.licensePlate,
                        location: data.pickupLocation,
                        status: status,
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    fullWidth
                    leftSection={<IconTrashX size={20} />}
                    bg="pink.1"
                    c="red.4"
                    mt="sm"
                    fz="xs"
                    onClick={() => {
                      DeleteVehicleModal({
                        vehicleName: data.vehicleModel,
                        vehicleLicensePlate: data.licensePlate,
                      });
                    }}
                  >
                    Remove
                  </Button>
                </Flex>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
