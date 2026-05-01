import type {
  GetModelsParams,
  VehicleModelsResponse,
} from "@/types/vehicleModel";

const VPIC_BASE_URL = process.env.NEXT_PUBLIC_VPIC_BASE_URL;

function buildModelsUrl({
  makeId,
  modelYear,
  vehicleType,
  format = "json",
}: GetModelsParams): string {
  if (modelYear && vehicleType)
    return `${VPIC_BASE_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${modelYear}/vehicletype/${vehicleType}?format=${format}`;

  if (vehicleType)
    return `${VPIC_BASE_URL}/GetModelsForMakeIdYear/makeId/${makeId}/vehicletype/${vehicleType}?format=${format}`;

  return `${VPIC_BASE_URL}/GetModelsForMakeId/${makeId}?format=${format}`;
}

export const VehicleModelsService = {
  async getModels(params: GetModelsParams): Promise<VehicleModelsResponse> {
    const res = await fetch(buildModelsUrl(params));
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json() as Promise<VehicleModelsResponse>;
  },
  getCsvUrl(params: Omit<GetModelsParams, "format">): string {
    return buildModelsUrl({ ...params, format: "csv" });
  },
};
