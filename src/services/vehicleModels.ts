import type { VehicleType } from "@/types/vehicleMake";
import type { VehicleModelsResponse } from "@/types/vehicleModel";

const VPIC_BASE_URL = process.env.NEXT_PUBLIC_VPIC_BASE_URL;

interface GetModelsParams {
  makeId: number;
  modelYear?: string;
  vehicleType?: VehicleType;
}

function buildModelsUrl({
  makeId,
  modelYear,
  vehicleType,
}: GetModelsParams): string {
  if (modelYear && vehicleType)
    return `${VPIC_BASE_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${modelYear}/vehicletype/${vehicleType}?format=json`;

  if (vehicleType)
    return `${VPIC_BASE_URL}/GetModelsForMakeIdYear/makeId/${makeId}/vehicletype/${vehicleType}?format=json`;

  return `${VPIC_BASE_URL}/GetModelsForMakeId/${makeId}?format=json`;
}

export const VehicleModelsService = {
  async getModels(params: GetModelsParams): Promise<VehicleModelsResponse> {
    const res = await fetch(buildModelsUrl(params));
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json() as Promise<VehicleModelsResponse>;
  },
};
