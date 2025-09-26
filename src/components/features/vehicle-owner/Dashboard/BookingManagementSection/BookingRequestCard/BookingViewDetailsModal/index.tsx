import { modals } from "@mantine/modals";
import ModalContent from "./ModalContent";

interface BookingViewDetailModalProps {
  userName: string;
  number: number;
  vehicleName: string;
  vehicleStatus: string;
  startDate: string;
  endDate: string;
  price: number;
  location: string;
}
export default function BookingViewDetailModal({
  userName,
  number,
  vehicleName,
  vehicleStatus,
  startDate,
  endDate,
  price,
  location,
}: BookingViewDetailModalProps) {
  return modals.open({
    title: "Booking Details",
    size: "50%",
    radius: "lg",
    padding: "xl",
    children: (
      <ModalContent
        userName={userName}
        number={number}
        vehicleName={vehicleName}
        vehicleStatus={vehicleStatus}
        price={price}
        location={location}
        startDate={startDate}
        endDate={endDate}
      />
    ),
  });
}
