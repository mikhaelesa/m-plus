import type { VehicleModelsResponse } from "@/types/vehicleModel";

const VPIC_BASE_URL = process.env.NEXT_PUBLIC_VPIC_BASE_URL;

export const VehicleModelsService = {
  async getModelsByMakeId(makeId: number): Promise<VehicleModelsResponse> {
    const res = await fetch(
      `${VPIC_BASE_URL}/GetModelsForMakeId/${makeId}?format=json`,
    );
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json() as Promise<VehicleModelsResponse>;
  },
};
