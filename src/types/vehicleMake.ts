import type { VpicApiResponse } from "./vpic";

export enum VehicleType {
  Car = "car",
  Invalid = "invalid",
}

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
