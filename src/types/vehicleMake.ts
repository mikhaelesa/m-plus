import type { VpicApiResponse } from "./vpic";

export enum VehicleType {
  Car        = "car",
  Motorcycle = "motorcycle",
  Mpv        = "mpv",
  Truck      = "truck",
  Bus        = "bus",
  Trailer    = "trailer",
  Incomplete = "incomplete",
  Invalid    = "invalid",
}

export const VEHICLE_TYPE_LABELS: Record<VehicleType, string> = {
  [VehicleType.Car]:        "Car",
  [VehicleType.Motorcycle]: "Motorcycle",
  [VehicleType.Mpv]:        "MPV",
  [VehicleType.Truck]:      "Truck",
  [VehicleType.Bus]:        "Bus",
  [VehicleType.Trailer]:    "Trailer",
  [VehicleType.Incomplete]: "Incomplete Vehicle",
  [VehicleType.Invalid]:    "Invalid",
};

export const VEHICLE_TYPE_OPTIONS = [
  VehicleType.Car,
  VehicleType.Motorcycle,
  VehicleType.Mpv,
  VehicleType.Truck,
  VehicleType.Bus,
  VehicleType.Trailer,
  VehicleType.Incomplete,
] as const;

export enum VehicleMakeColumnId {
  MakeId = "MakeId",
  MakeName = "MakeName",
  VehicleTypeId = "VehicleTypeId",
  VehicleTypeName = "VehicleTypeName",
}

export enum VehicleMakesQueryKey {
  VehicleMakes = "vehicleMakes",
  VehicleMakesError = "vehicleMakesError",
}

export interface VehicleMake {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export type VehicleMakesResponse = VpicApiResponse<VehicleMake>;
