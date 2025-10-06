import { UserModel } from "@/features/user/models/user.model";
import { FileWithPath } from "@mantine/dropzone";

export interface BookingModel {
  id?: string;
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
  renter?: UserModel | null;
  cnicFrontSide: FileWithPath[];
  cnicBackSide: FileWithPath[];
  driversLicenseFrontSide: FileWithPath[];
  driversLicenseBackSide: FileWithPath[];
}
