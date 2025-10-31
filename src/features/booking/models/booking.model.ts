import { UserModel } from "@/features/user/models/user.model";
import { FileWithPath } from "@mantine/dropzone";

export interface BookingModel {
  bookingId?: string;
  vehicleId?: string;
  vehicleOwnerId: string;
  renterId: string;
  vehicleName?: string;
  vehiclePhotos: string[];
  vehicleType?: string;
  rentalType: string;
  totalPrice: number;
  status: string;
  duration: number;
  pickUpDate: string | null;
  returnDate: string | null;
  pickUpTime: number | null;

  // NEW optional payment info:
  payment?: {
    method?: "card";
    stripePaymentIntentId?: string;
    amount?: number; // main currency units
    currency?: string;
    status?: string; // e.g., "succeeded", "requires_action", "pending"
  };
}
