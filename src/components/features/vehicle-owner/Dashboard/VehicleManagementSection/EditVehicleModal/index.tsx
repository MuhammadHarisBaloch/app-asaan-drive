import { modals } from "@mantine/modals";
import ModalContent from "./ModalContent";
interface EditVehicleModalProps {
  vehicleName: string;
  vehicleNumberPlate: string;
  location: string;
  status: string;
}
export default function EditVehicleModal({
  vehicleName,
  vehicleNumberPlate,
  location,
  status,
}: EditVehicleModalProps) {
  return modals.open({
    title: "Edit Vehicle",
    radius: "lg",
    padding: "1.5rem",
    children: (
      <>
        <ModalContent
          vehicleName={vehicleName}
          vehicleNumberPlate={vehicleNumberPlate}
          location={location}
          status={status}
        />
      </>
    ),
  });
}
