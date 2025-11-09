// BookingList component - users prop remove karo
import { BookingModel } from "@/features/booking/models/booking.model";
import BookingRequestCard from "../BookingRequestCard";

interface BookingListProps {
  bookings: BookingModel[];
  statusFilter: string | string[];
  onApprove: (bookingId: string) => void;
  onDecline: (bookingId: string) => void;
}

export default function BookingList({
  bookings,
  statusFilter,
  onApprove,
  onDecline,
}: BookingListProps) {
  const filtered = bookings.filter((b) =>
    Array.isArray(statusFilter)
      ? statusFilter.includes(b.status)
      : b.status === statusFilter
  );

  return (
    <>
      {filtered.map((booking, i) => (
        <BookingRequestCard
          key={i}
          renterName={booking.renter?.fullName ?? ""} // ✅ Directly use booking.renter
          vehicleName={booking.vehicleName ?? ""}
          pickUpDate={booking.pickUpDate ?? ""}
          returnDate={booking.returnDate ?? ""}
          city={booking.renter?.city ?? ""}
          phoneNumber={booking.renter?.phoneNumber ?? ""}
          status={booking.status}
          bookingId={booking.bookingId!} // Use bookingId instead of id
          totalPrice={booking.totalPrice}
          duration={booking.duration}
          onApprove={onApprove}
          onDecline={onDecline}
        />
      ))}
    </>
  );
}
