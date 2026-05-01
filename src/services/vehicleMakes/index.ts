import type { VehicleMakesResponse } from "@/types/vpic";
import { VehicleType } from "@/types/vpic";

const VPIC_BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";

const makesUrl = (type: VehicleType) =>
  `${VPIC_BASE_URL}/GetMakesForVehicleType/${type}?format=json`;

export const VehicleMakesService = {
  async getMakes(): Promise<VehicleMakesResponse> {
    const res = await fetch(makesUrl(VehicleType.Car));
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
