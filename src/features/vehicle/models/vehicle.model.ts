export interface VehicleModel {
  id: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleYear: string;
  licensePlate: string;
  pickupLocation: string;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  ownerID: string;
  vehiclePhotos: string[];
  vehicleDocs: string[];
}
