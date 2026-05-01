import type { VehicleType } from "@/types/vehicleMake";
import type { VpicApiFormat } from "@/types/vpic";
import type { WmiResponse } from "@/types/wmi";

const VPIC_BASE_URL = process.env.NEXT_PUBLIC_VPIC_BASE_URL;

const wmiUrl = (vehicleType: VehicleType, format: VpicApiFormat = "json") =>
  `${VPIC_BASE_URL}/GetWMIsForManufacturer?vehicleType=${vehicleType.toLowerCase()}&format=${format}`;

export const WmiService = {
  async getWmis(vehicleType: VehicleType): Promise<WmiResponse> {
    const res = await fetch(wmiUrl(vehicleType));
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json() as Promise<WmiResponse>;
  },
  getCsvUrl(vehicleType: VehicleType): string {
    return wmiUrl(vehicleType, "csv");
  },
};
