import { deleteVehicle, listOwnerVehicleDocs } from "@/features/vehicle";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { auth } from "@/networking/firebase";
import { Stack, Center, Card, Flex, Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications, showNotification } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useState } from "react";

interface ModalContentProps {
  vehicleId: string;
  vehicleName: string;
  vehicleLicensePlate: string;
  onRefresh: () => Promise<void>;
}
export default function ModalContent({
  vehicleId,
  vehicleName,
  vehicleLicensePlate,
  onRefresh,
}: ModalContentProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteVehicle(vehicleId);
      modals.closeAll();

      notifications.show({
        title: "Deleted",
        message: `${vehicleName} has been successfully deleted.`,
        color: "green",
      });

      // Try refreshing but don’t block or trigger error notification if it fails
      try {
        await onRefresh();
      } catch (refreshError) {
        console.warn("Vehicle deleted, but refresh failed:", refreshError);
      }
    } catch (error) {
      console.error("Delete vehicle error:", error);
      notifications.show({
        title: "Error",
        message: "Failed to delete vehicle. Please try again.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack align="center" px="md" pb="lg">
      <Center h={60} w={60} bg="pink.1" style={{ borderRadius: "50%" }}>
        <IconAlertTriangle size={30} color="red" />
      </Center>
      <Text fz="md" c="black" fw={500}>
        Are you sure?
      </Text>
      <Text fz="sm" ta="center">
        You are about to delete{" "}
        <span style={{ fontWeight: 500, color: "#424242ff" }}>
          {vehicleName}
        </span>{" "}
        with plate number
        <span style={{ fontWeight: 500, color: "#424242ff" }}>
          {" "}
          {vehicleLicensePlate}
        </span>
      </Text>
      <Card radius="md" bg="pink.1" px="xl" py="lg">
        <Text fz="xs" ta="center" c="red">
          <span style={{ fontWeight: 500 }}> Warning: </span> This action cannot
          be undone. All booking history and data associated with this vehicle
          will be permanently removed.
        </Text>
      </Card>
      <Flex gap="md" w="100%">
        <Button
          fullWidth
          h="2.5rem"
          variant="outline"
          color="black"
          onClick={() => {
            modals.closeAll();
          }}
        >
          Cancel
        </Button>
        <Button fullWidth h="2.5rem" loading={loading} onClick={handleDelete}>
          Delete Vehicle
        </Button>
      </Flex>
    </Stack>
  );
}
