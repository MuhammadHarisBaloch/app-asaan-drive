// components/BookingRow.tsx
import { Table, Text, Badge, Avatar, Group, Flex, Stack } from "@mantine/core";
import { BookingModel } from "@/features/booking/models/booking.model";
import { UserModel } from "@/features/user/models/user.model";

interface BookingRowProps {
  booking: BookingModel & { renter?: UserModel | null };
}

export default function BookingRow({ booking }: BookingRowProps) {
  // Format date and duration
  const formatDate = (date: string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  const formatDuration = (startDate: string | null, endDate: string | null) => {
    if (!startDate || !endDate) return "N/A";

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
  };

  // Get status badge color and background
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return { color: "green", bgColor: "green.1" };
      case "pending":
        return { color: "orange.3", bgColor: "orange.0" };
      case "active":
        return { color: "blue", bgColor: "blue.1" };
      case "completed":
        return { color: "black", bgColor: "gray.1" };
      case "cancelled":
        return { color: "red", bgColor: "pink.1" };
      default:
        return { color: "gray", bgColor: "gray.1" };
    }
  };

  // Get payment badge color and background
  const getPaymentStyle = (paymentStatus?: string) => {
    if (!paymentStatus) return { color: "gray", bgColor: "gray.1" };

    switch (paymentStatus.toLowerCase()) {
      case "paid":
      case "released":
        return { color: "green", bgColor: "green.1" };
      case "pending":
      case "hold":
        return { color: "orange.3", bgColor: "orange.0" };
      case "failed":
      case "refunded":
        return { color: "red", bgColor: "pink.1" };
      default:
        return { color: "gray", bgColor: "gray.1" };
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = (renter?: UserModel | null) => {
    if (!renter?.fullName) return "UU";

    const names = renter.fullName.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Get payment status display text
  const getPaymentStatusText = (booking: BookingModel) => {
    if (booking.payment?.status) {
      return (
        booking.payment.status.charAt(0).toUpperCase() +
        booking.payment.status.slice(1)
      );
    }
    return "Pending";
  };

  // Truncate long text
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "N/A";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const statusStyle = getStatusStyle(booking.status);
  const paymentStyle = getPaymentStyle(booking.payment?.status);

  return (
    <Table.Tr style={{ borderBottom: "1px solid #f2f2f2" }}>
      {/* Booking ID */}
      <Table.Td style={{ padding: "12px 16px", width: "140px" }}>
        <Text fz="xs" fw={600} c="black">
          #{truncateText(booking.bookingId || "N/A", 8)}
        </Text>
        <Text fz="12px">{formatDate(booking.pickUpDate)}</Text>
      </Table.Td>

      {/* User */}
      <Table.Td style={{ padding: "12px 16px", width: "200px" }}>
        <Group wrap="nowrap">
          <Avatar size="md" radius="xl" color="red.4">
            {getUserInitials(booking.renter)}
          </Avatar>
          <div style={{ minWidth: 0 }}>
            <Text fz="xs" c="black" fw={500} truncate>
              {truncateText(booking.renter?.fullName || "N/A", 20)}
            </Text>
            <Text fz="12px" truncate>
              {truncateText(booking.renter?.email || "N/A", 22)}
            </Text>
          </div>
        </Group>
      </Table.Td>

      {/* Vehicle */}
      <Table.Td style={{ padding: "12px 16px", width: "150px" }}>
        <Text fz="xs" c="black" fw={500} truncate>
          {truncateText(booking.vehicleName || "N/A", 18)}
        </Text>
        <Text fz="12px">
          {booking.vehicleType || "N/A"} • {booking.rentalType}
        </Text>
      </Table.Td>

      {/* Date & Duration */}
      <Table.Td style={{ padding: "12px 16px", width: "150px" }}>
        <Text fz="xs" c="black" ta="center" fw={500}>
          {formatDate(booking.pickUpDate)}
        </Text>
        <Text fz="12px" ta="center">
          {formatDuration(booking.pickUpDate, booking.returnDate)}
        </Text>
      </Table.Td>

      {/* Status */}
      <Table.Td style={{ padding: "12px 16px", width: "120px" }}>
        <Badge
          c={statusStyle.color}
          bg={statusStyle.bgColor}
          size="sm"
          fullWidth
          fw={500}
          styles={{ root: { textAlign: "center", textTransform: "lowercase" } }}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </Badge>
      </Table.Td>

      {/* Payment */}
      <Table.Td style={{ padding: "12px 16px", width: "130px" }}>
        <Badge
          c={paymentStyle.color}
          bg={paymentStyle.bgColor}
          size="sm"
          fullWidth
          fw={500}
          styles={{ root: { textAlign: "center", textTransform: "lowercase" } }}
          mb={4}
        >
          {getPaymentStatusText(booking)}
        </Badge>
        <Text fz="xs" ta="center" fw={600} c="green">
          Rs. {booking.totalPrice?.toLocaleString() || "0"}
        </Text>
      </Table.Td>
    </Table.Tr>
  );
}
