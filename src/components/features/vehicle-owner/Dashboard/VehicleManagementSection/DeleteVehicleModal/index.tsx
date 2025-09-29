import { modals } from "@mantine/modals";
import ModalContent from "./ModalContent";
interface DeleteVehicleModalProps {
  vehicleName: string;
  vehicleLicensePlate: string;
}
export default function DeleteVehicleModal({
  vehicleLicensePlate,
  vehicleName,
}: DeleteVehicleModalProps) {
  return modals.open({
    title: "Delete Vehicle",
    radius: "lg",
    padding: "1.5rem",
    children: (
      <>
        <ModalContent
          vehicleLicensePlate={vehicleLicensePlate}
          vehicleName={vehicleName}
        />
      </>
    ),
  });
}
