"use client";
import { useEffect, useState, useMemo } from "react";
import { Card, Input, SimpleGrid, Skeleton, Stack, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import {
  listAllVehicleDocs,
  approveVehicle,
  rejectVehicle,
  activateVehicle,
  deactivateVehicle,
  deleteVehicle,
} from "@/features/vehicle";
import VehicleCard from "./VehicleCard";
import VehicleDetailsModal from "./VehicleDetailsModal";
import RejectVehicleModal from "./RejectVehicleModal";

export default function ManageVehiclesSection() {
  const [vehicles, setVehicles] = useState<VehicleModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel | null>(
    null
  );
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  );
  const [actionType, setActionType] = useState<"reject" | "delete" | null>(
    null
  );

  const [viewOpen, { open: openView, close: closeView }] = useDisclosure(false);
  const [rejectOpen, { open: openReject, close: closeReject }] =
    useDisclosure(false);

  // 🔹 Fetch Vehicles
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

  // 🔹 Filtered Vehicles
  const filteredVehicles = useMemo(() => {
    if (!search.trim()) return vehicles;
    const term = search.toLowerCase();
    return vehicles.filter(
      (v) =>
        v.vehicleModel.toLowerCase().includes(term) ||
        v.ownerName?.toLowerCase().includes(term)
    );
  }, [vehicles, search]);

  // 🔹 Refresh function
  const refreshList = async () => {
    setVehicles(await listAllVehicleDocs());
  };

  return (
    <Stack p="lg" gap="xl">
      {/* Header */}
      <Stack gap={0}>
        <Text fz="xl" fw={600} c="black">
          Manage Vehicles
        </Text>
        <Text fz="sm" c="dimmed">
          View, approve, and manage vehicles listed on the platform.
        </Text>
      </Stack>

      {/* Search Bar */}
      <Card
        py="md"
        px="xl"
        radius="md"
        style={{
          filter: "drop-shadow(1px 1px 2px #48484848)",
          backgroundColor: "white",
        }}
      >
        <Input
          w="100%"
          size="md"
          radius="md"
          placeholder="Search Vehicles or Owners..."
          leftSection={<IconSearch color="gray" size={20} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Card>

      {/* Vehicle Cards Grid */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height={280} radius="md" />
          ))
        ) : filteredVehicles.length === 0 ? (
          <Text c="dimmed" ta="center" py="xl">
            No vehicles found.
          </Text>
        ) : (
          filteredVehicles.map((vehicle, i) => (
            <VehicleCard
              key={i}
              vehicle={vehicle}
              onView={() => {
                setSelectedVehicle(vehicle);
                openView();
              }}
              onApprove={async () => {
                await approveVehicle(vehicle.id!);
                await refreshList();
              }}
              onReject={() => {
                setSelectedVehicleId(vehicle.id!);
                setActionType("reject");
                openReject();
              }}
              onActivate={async () => {
                await activateVehicle(vehicle.id!);
                await refreshList();
              }}
              onDeactivate={async () => {
                await deactivateVehicle(vehicle.id!);
                await refreshList();
              }}
              onDelete={() => {
                setSelectedVehicleId(vehicle.id!);
                setActionType("delete");
                openReject();
              }}
            />
          ))
        )}
      </SimpleGrid>

      {/* View Vehicle Modal */}
      <VehicleDetailsModal
        opened={viewOpen}
        onClose={closeView}
        vehicle={selectedVehicle}
        onApprove={async () => {
          if (!selectedVehicle?.id) return;
          await approveVehicle(selectedVehicle.id);
          await refreshList();
          closeView();
        }}
        onReject={() => {
          if (!selectedVehicle?.id) return;
          setSelectedVehicleId(selectedVehicle.id);
          setActionType("reject");
          closeView();
          openReject();
        }}
        onActivate={async () => {
          if (!selectedVehicle?.id) return;
          await activateVehicle(selectedVehicle.id);
          await refreshList();
          closeView();
        }}
        onDeactivate={async () => {
          if (!selectedVehicle?.id) return;
          await deactivateVehicle(selectedVehicle.id);
          await refreshList();
          closeView();
        }}
      />

      {/* Reject/Delete Modal */}
      <RejectVehicleModal
        opened={rejectOpen}
        onClose={closeReject}
        actionType={actionType}
        onConfirm={async (reason) => {
          if (!selectedVehicleId) return;
          try {
            if (actionType === "reject") {
              await rejectVehicle(selectedVehicleId, reason);
            } else if (actionType === "delete") {
              await deleteVehicle(selectedVehicleId, reason);
            }
            await refreshList();
          } catch (err) {
            console.error("Error performing action:", err);
          } finally {
            closeReject();
          }
        }}
      />
    </Stack>
  );
}
