import type { VehicleType } from "@/types/vehicleMake";
import type { WmiResponse } from "@/types/wmi";

const VPIC_BASE_URL = process.env.NEXT_PUBLIC_VPIC_BASE_URL;

export const WmiService = {
  async getWmis(vehicleType: VehicleType): Promise<WmiResponse> {
    const res = await fetch(
      `${VPIC_BASE_URL}/GetWMIsForManufacturer?vehicleType=${vehicleType.toLowerCase()}&format=json`,
    );
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json() as Promise<WmiResponse>;
  },
};
