import type { VpicApiResponse } from "./vpic";

export interface WmiItem {
  Id: number;
  WMI: string;
  Name: string;
  Country: string | null;
  VehicleType: string;
}

export interface ValidWmiItem extends WmiItem {
  Country: string;
}

export type WmiResponse = VpicApiResponse<WmiItem>;

export interface CountryDistribution {
  key: string;
  country: string;
  count: number;
  fill: string;
}

export enum WmiQueryKey {
  WmiDistribution = "wmiDistribution",
}
