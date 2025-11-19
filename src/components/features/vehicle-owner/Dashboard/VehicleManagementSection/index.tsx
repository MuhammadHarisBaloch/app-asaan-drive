import {
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  Loader,
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
import { auth } from "@/networking/firebase";

export default function VehicleManagementSection() {
  const [Vehicles, setVehicles] = useState<VehicleModel[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchVehicles() {
    const ownerID = auth.currentUser?.uid;
    if (!ownerID) return;
    const docs = await listOwnerVehicleDocs(ownerID);
    setVehicles(docs);
  }

  // Call it once when page loads
  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    const listOwnerVehicles = async () => {
      const user = getAuth().currentUser;
      if (!user) return;
      setLoading(true);
      const vehicles = await listOwnerVehicleDocs(user.uid);
      return vehicles;
    };

    listOwnerVehicles().then((vehicles) => {
      console.log(vehicles);
      setVehicles(vehicles ?? []);
      setLoading(false);
    });
  }, []);

  const getStatusColors = (status: string) => {
    let color = "gray";
    let bgColor = "gray.1";

    switch (status) {
      case "available":
        color = "green";
        bgColor = "green.1";
        break;
      case "pending":
        color = "orange.4";
        bgColor = "orange.0";
        break;
      case "booked":
        color = "blue";
        bgColor = "blue.1";
        break;
      case "inactive":
        color = "red";
        bgColor = "pink.1";
        break;
      case "active":
        color = "blue";
        bgColor = "blue.1";
        break;
      default:
        color = "transparent";
        bgColor = "transparent";
    }
    return { color, bgColor };
  };

  if (loading) {
    return (
      <Group justify="center" align="center" mt="xl">
        <Loader color="red.4" size="lg" />
      </Group>
    );
  }

  const appwriteLoader = ({ src }: { src: string }) => {
    return src; // return full Appwrite URL
  };

  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Vehicle Management
        </Text>
        <Text fz="12px">Manage your fleet and track vehicle performance</Text>
      </Stack>
      <SimpleGrid pb="xl" cols={3} spacing="lg" verticalSpacing="xxl">
        {Vehicles.map((data, i) => {
          const { color, bgColor } = getStatusColors(data.status ?? "-");
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
                    loader={appwriteLoader}
                    src={data.vehiclePhotos[0]}
                    alt={data.vehicleModel}
                    width={100}
                    height={100}
                    sizes="100vw"
                    priority
                    style={{
                      width: "100%",
                      height: "12rem",
                      objectFit: "cover",
                    }}
                    unoptimized
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
                      root: {
                        textAlign: "center",
                        textTransform: "lowercase",
                      },
                    }}
                  >
                    {data.status ?? "-"}
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
                <Button
                  fullWidth
                  leftSection={<IconTrashX size={20} />}
                  bg="pink.1"
                  c="red.4"
                  mt="sm"
                  fz="xs"
                  onClick={() => {
                    DeleteVehicleModal({
                      vehicleId: data.id!,
                      vehicleName: data.vehicleModel,
                      vehicleLicensePlate: data.licensePlate,
                      onRefresh: fetchVehicles,
                    });
                  }}
                >
                  Remove
                </Button>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
