import type { VehicleType } from "./vehicleMake";
import type { VpicApiFormat, VpicApiResponse } from "./vpic";

export enum VehicleModelColumnId {
  ModelId = "Model_ID",
  ModelName = "Model_Name",
}

export enum VehicleModelsQueryKey {
  VehicleModels = "vehicleModels",
}

export interface VehicleModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export interface GetModelsParams {
  makeId: number;
  modelYear?: string;
  vehicleType?: VehicleType;
  format?: VpicApiFormat;
}

export type VehicleModelsResponse = VpicApiResponse<VehicleModel>;
