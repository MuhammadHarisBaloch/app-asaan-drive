import { modals } from "@mantine/modals";
import ModalContent from "./ModalContent";
interface DeleteVehicleModalProps {
  vehicleId: string;
  vehicleName: string;
  vehicleLicensePlate: string;
  onRefresh: () => Promise<void>;
}
export default function DeleteVehicleModal({
  vehicleId,
  vehicleLicensePlate,
  vehicleName,
  onRefresh,
}: DeleteVehicleModalProps) {
  return modals.open({
    title: "Delete Vehicle",
    radius: "lg",
    padding: "1.5rem",
    children: (
      <>
        <ModalContent
          vehicleId={vehicleId}
          vehicleLicensePlate={vehicleLicensePlate}
          vehicleName={vehicleName}
          onRefresh={onRefresh}
        />
      </>
    ),
  });
}
