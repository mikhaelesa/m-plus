import type { VpicApiResponse } from "@/types/vpic";

const VPIC_BASE_URL = process.env.NEXT_PUBLIC_VPIC_BASE_URL;
const LAST_MANUFACTURERS_PAGE = 227;
const MANUFACTURERS_PER_PAGE = 100;

export const StatsService = {
  async getTotalMakes(): Promise<number> {
    const res = await fetch(`${VPIC_BASE_URL}/GetAllMakes?format=json`);
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    const data = (await res.json()) as VpicApiResponse<unknown>;
    return data.Count;
  },

  /**
   * Returns the total manufacturer count using a last-page calculation.
   * Formula: (226 * 100) + lastPage.Count
   * This avoids the overhead of paginating all 227 pages.
   */
  async getTotalManufacturers(): Promise<number> {
    const res = await fetch(
      `${VPIC_BASE_URL}/getallmanufacturers?format=json&page=${LAST_MANUFACTURERS_PAGE}`,
    );
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    const data = (await res.json()) as VpicApiResponse<unknown>;
    return (LAST_MANUFACTURERS_PAGE - 1) * MANUFACTURERS_PER_PAGE + data.Count;
  },
};
