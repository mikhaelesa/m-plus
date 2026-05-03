import { useMemo } from "react";
import type { ChartConfig } from "@/components/ui/chart";
import { useWmis } from "@/hooks/query/useWmis";
import type { VehicleType } from "@/types/vehicleMake";
import type { CountryDistribution, WmiItem } from "@/types/wmi";

const EMPTY_WMI: WmiItem[] = [];

export function useWmiDistribution(vehicleType: VehicleType) {
  const { data, isPending, isError } = useWmis(vehicleType);

  const computed = useMemo(() => {
    const map = new Map<string, Set<string>>();

    // 1. Group & Count Uniques
    (data?.Results ?? EMPTY_WMI).forEach(({ Country, Name }) => {
      if (Country) map.set(Country, (map.get(Country) || new Set()).add(Name));
    });

    // 2. Map to Array & Sort
    const sorted = Array.from(map, ([country, set]) => ({
      country,
      count: set.size,
    })).sort((a, b) => b.count - a.count);

    const chartConfig: ChartConfig = { count: { label: "WMIs" } };

    // 3. Generate Top 5
    const chartData: CountryDistribution[] = sorted
      .slice(0, 5)
      .map(({ country, count }, i) => {
        const key = `top${i + 1}`;
        chartConfig[key] = { label: country, color: `var(--chart-${i + 1})` };
        return { key, country, count, fill: `var(--color-${key})` };
      });

    // 4. Generate "Others" Category
    const others = sorted.slice(5);
    if (others.length) {
      chartConfig.others = {
        label: "Others",
        color: "var(--muted-foreground)",
      };
      chartData.push({
        key: "others",
        country: "Others",
        count: others.reduce((sum, item) => sum + item.count, 0),
        fill: "var(--color-others)",
      });
    }

    return { chartData, chartConfig, totalWmis: data?.Count ?? 0 };
  }, [data]);

  return { ...computed, isPending, isError };
}
