export interface BookingModel {
  vehicleName: string;
  vehicleType: string;
  vehicleYear: string;
  renterId: string;
  rentalType: string;
  duration: number;
  pickUpDate: number | null;
  pickUpTime: number;
  totalCostWithTax: number;
  drivingLicense?: string[];
  cnic?: string[];
  vehiclePhotos: string[];
  rentalCost: number;
}
