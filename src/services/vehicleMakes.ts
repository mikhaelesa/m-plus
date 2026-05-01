import type { VehicleMakesResponse, VehicleType } from "@/types/vehicleMake";
import type { VpicApiFormat } from "@/types/vpic";

const VPIC_BASE_URL = process.env.NEXT_PUBLIC_VPIC_BASE_URL;

const makesUrl = (type: VehicleType, format: VpicApiFormat = "json") =>
  `${VPIC_BASE_URL}/GetMakesForVehicleType/${type}?format=${format}`;

export const VehicleMakesService = {
  async getMakes(type: VehicleType): Promise<VehicleMakesResponse> {
    const res = await fetch(makesUrl(type));
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json() as Promise<VehicleMakesResponse>;
  },
  getCsvUrl(type: VehicleType): string {
    return makesUrl(type, "csv");
  },
};
