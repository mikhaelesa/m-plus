import type { VehicleMakesResponse } from "@/types/vehicleMake";
import { VehicleType } from "@/types/vehicleMake";

const VPIC_BASE_URL = process.env.NEXT_PUBLIC_VPIC_BASE_URL;

const makesUrl = (type: VehicleType) =>
  `${VPIC_BASE_URL}/GetMakesForVehicleType/${type}?format=json`;

export const VehicleMakesService = {
  async getMakes(type: VehicleType): Promise<VehicleMakesResponse> {
    const res = await fetch(makesUrl(type));
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json() as Promise<VehicleMakesResponse>;
  },
  /**
   * @description this function is for testing purpose only
   * @returns Promise<VehicleMakesResponse>
   */
  async getMakesError(): Promise<VehicleMakesResponse> {
    const res = await fetch(makesUrl(VehicleType.Invalid));
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json() as Promise<VehicleMakesResponse>;
  },
};
