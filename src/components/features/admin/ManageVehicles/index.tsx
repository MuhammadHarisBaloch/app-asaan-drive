"use client";
import { useEffect, useState, useMemo } from "react";
import {
  Badge,
  Card,
  CardSection,
  Divider,
  Flex,
  Group,
  Input,
  Menu,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconBan,
  IconCheck,
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconDots,
  IconPointFilled,
  IconRefresh,
  IconSearch,
  IconTrashX,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import {
  activateVehicle,
  approveVehicle,
  deactivateVehicle,
  deleteVehicle,
  listAllVehicleDocs,
  rejectVehicle,
} from "@/features/vehicle";
import { useDisclosure } from "@mantine/hooks";
import RejectVehicleModal from "./Modal";

// ✅ Helper for status colors
function getStatusColors(status: string) {
  switch (status) {
    case "available":
      return { color: "green", bgColor: "green.1" };
    case "pending":
      return { color: "orange.4", bgColor: "orange.0" };
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

export default function ManageVehiclesSection() {
  const [vehicles, setVehicles] = useState<VehicleModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [reason, setReason] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  );
  const [opened, { open, close }] = useDisclosure(false);
  const [actionType, setActionType] = useState<"reject" | "delete" | null>(
    null
  );

  // ✅ Fetch data once
  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        const data = await listAllVehicleDocs();
        setVehicles(data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, []);

  // ✅ Filtered Vehicles
  const filteredVehicles = useMemo(() => {
    if (!search.trim()) return vehicles;
    const term = search.toLowerCase();
    return vehicles.filter(
      (v) =>
        v.vehicleModel.toLowerCase().includes(term) ||
        v.ownerName?.toLowerCase().includes(term)
    );
  }, [vehicles, search]);

  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" fw={600} c="black">
          Manage Vehicles
        </Text>
        <Text fz="md">
          View, approve, and manage vehicles listed on the platform.
        </Text>
      </Stack>

      {/* 🔍 Search */}
      <Card
        py="lg"
        px="xl"
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 2px #48484848)" }}
      >
        <Input
          w="100%"
          size="md"
          radius="md"
          placeholder="Search Vehicles and Owners..."
          leftSection={<IconSearch color="gray" size={20} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Card>

      {/* 🚘 Vehicle Cards */}
      <SimpleGrid cols={4} spacing="lg">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height={280} radius="md" />
          ))
        ) : filteredVehicles.length === 0 ? (
          <Text c="dimmed" ta="center" py="xl">
            No vehicles found.
          </Text>
        ) : (
          filteredVehicles.map((vehicle, i) => {
            const { color, bgColor } = getStatusColors(vehicle.status ?? "-");

            return (
              <Card
                key={i}
                shadow="sm"
                radius="md"
                withBorder
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "22rem",
                }}
              >
                {/* Image + Badges */}
                <CardSection
                  style={{
                    position: "relative",
                    height: 200,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={vehicle.vehiclePhotos?.[0] || "/placeholder.jpg"}
                    alt={vehicle.vehicleModel}
                    fill
                    style={{ objectFit: "cover" }}
                  />

                  {/* Status badge */}
                  <Badge
                    variant="light"
                    size="sm"
                    fw={600}
                    c={color}
                    bg={bgColor}
                    leftSection={
                      vehicle.status === "available" ? (
                        <IconCircleCheck size={15} color="green" />
                      ) : vehicle.status === "pending" ? (
                        <IconClock size={15} color="orange" />
                      ) : vehicle.status === "inactive" ? (
                        <IconBan size={15} color="red" />
                      ) : vehicle.status === "booked" ? (
                        <IconCircleCheck size={15} color="blue" />
                      ) : null
                    }
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      zIndex: 2,
                      textTransform: "capitalize",
                      minWidth: 80,
                      textAlign: "center",
                    }}
                  >
                    {vehicle.status || "Unknown"}
                  </Badge>

                  {/* Vehicle type badge */}
                  <Badge
                    variant="light"
                    size="sm"
                    c="white"
                    bg="#3e3e3ec4"
                    fw={600}
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 10,
                      zIndex: 2,
                      textTransform: "capitalize",
                      minWidth: 80,
                      textAlign: "center",
                    }}
                  >
                    {vehicle.vehicleType}
                  </Badge>
                </CardSection>

                {/* Content */}
                <Stack w="100%" gap="sm" mt="xs">
                  <Flex align="center" justify="space-between">
                    <Text fz="xs" c="black" fw={500}>
                      {vehicle.vehicleModel}
                    </Text>
                    <Menu>
                      <Menu.Target>
                        <IconDots size={18} style={{ cursor: "pointer" }} />
                      </Menu.Target>

                      <Menu.Dropdown
                        py="sm"
                        px="md"
                        style={{ borderRadius: 10 }}
                      >
                        <Stack gap="sm">
                          {vehicle.status === "pending" && (
                            <>
                              <Menu.Item
                                onClick={async () => {
                                  await approveVehicle(vehicle.id!);
                                  setVehicles(await listAllVehicleDocs());
                                }}
                              >
                                <Group gap="sm">
                                  <IconCheck size={15} color="green" />
                                  <Text size="12px" c="green">
                                    Approve Vehicle
                                  </Text>
                                </Group>
                              </Menu.Item>

                              <Menu.Item
                                onClick={() => {
                                  setSelectedVehicleId(vehicle.id!);
                                  setActionType("reject");
                                  open();
                                }}
                              >
                                <Group gap="sm">
                                  <IconX size={15} color="red" />
                                  <Text size="12px" c="red.4">
                                    Reject Vehicle
                                  </Text>
                                </Group>
                              </Menu.Item>
                            </>
                          )}

                          {vehicle.status === "available" && (
                            <>
                              <Menu.Item
                                onClick={async () => {
                                  await deactivateVehicle(vehicle.id!);
                                  setVehicles(await listAllVehicleDocs());
                                }}
                              >
                                <Group gap="sm">
                                  <IconBan size={15} color="orange" />
                                  <Text size="12px" c="orange.4">
                                    Deactivate Vehicle
                                  </Text>
                                </Group>
                              </Menu.Item>

                              <Menu.Item
                                onClick={() => {
                                  setSelectedVehicleId(vehicle.id!);
                                  setActionType("delete");
                                  open();
                                }}
                              >
                                <Group gap="sm">
                                  <IconTrashX size={15} color="red" />
                                  <Text size="12px" c="red.4">
                                    Delete Vehicle
                                  </Text>
                                </Group>
                              </Menu.Item>
                            </>
                          )}

                          {vehicle.status === "inactive" && (
                            <>
                              <Menu.Item
                                onClick={async () => {
                                  await activateVehicle(vehicle.id!);
                                  setVehicles(await listAllVehicleDocs());
                                }}
                              >
                                <Group gap="sm">
                                  <IconRefresh size={15} color="green" />
                                  <Text size="12px" c="green">
                                    Activate Vehicle
                                  </Text>
                                </Group>
                              </Menu.Item>

                              <Menu.Item
                                onClick={() => {
                                  setSelectedVehicleId(vehicle.id!);
                                  setActionType("delete");
                                  open();
                                }}
                              >
                                <Group gap="sm">
                                  <IconTrashX size={15} color="red" />
                                  <Text size="12px" c="red.4">
                                    Delete Vehicle
                                  </Text>
                                </Group>
                              </Menu.Item>
                            </>
                          )}
                        </Stack>
                      </Menu.Dropdown>
                    </Menu>
                  </Flex>

                  <Flex gap="xxs" align="center">
                    <Text fz="12px">{vehicle.pickupLocation}</Text>
                    <IconPointFilled color="gray" size={8} />
                    <Text fz="12px">{vehicle.ownerName || "Unknown"}</Text>
                  </Flex>

                  <Flex align="center" justify="space-between">
                    <Stack gap={0}>
                      <Text fz="12px">Daily</Text>
                      <Text fz="xs" c="black" fw={500}>
                        Rs. {vehicle.dailyRate}
                      </Text>
                    </Stack>
                    <Stack gap={0}>
                      <Text fz="12px">Weekly</Text>
                      <Text fz="xs" c="black" fw={500}>
                        Rs. {vehicle.weeklyRate}
                      </Text>
                    </Stack>
                  </Flex>

                  <Divider w="100%" />

                  <Flex align="center" justify="space-between">
                    <Text fz="12px">Monthly</Text>
                    <Text fz="12px" c="red.4" fw={500}>
                      Rs. {vehicle.monthlyRate}
                    </Text>
                  </Flex>
                </Stack>
              </Card>
            );
          })
        )}
      </SimpleGrid>
      <RejectVehicleModal
        opened={opened}
        onClose={close}
        actionType={actionType}
        onConfirm={async (reason) => {
          if (!selectedVehicleId) return;
          try {
            if (actionType === "reject") {
              await rejectVehicle(selectedVehicleId, reason);
            } else if (actionType === "delete") {
              await deleteVehicle(selectedVehicleId, reason);
            }

            // refresh vehicle list
            setVehicles(await listAllVehicleDocs());
          } catch (err) {
            console.error("Error performing action:", err);
          } finally {
            close();
          }
        }}
      />
    </Stack>
  );
}
