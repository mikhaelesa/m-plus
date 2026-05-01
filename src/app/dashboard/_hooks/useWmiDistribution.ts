import { useMemo } from "react";
import type { ChartConfig } from "@/components/ui/chart";
import { useWmis } from "@/hooks/query/useWmis";
import type { VehicleType } from "@/types/vehicleMake";
import type { CountryDistribution, ValidWmiItem, WmiItem } from "@/types/wmi";

export interface WmiDistributionResult {
  chartData: CountryDistribution[];
  chartConfig: ChartConfig;
  totalWmis: number;
  isPending: boolean;
  isError: boolean;
}

const EMPTY_WMI_RESULTS: WmiItem[] = [];

export function useWmiDistribution(
  vehicleType: VehicleType,
): WmiDistributionResult {
  const { data, isPending, isError } = useWmis(vehicleType);

  const { chartData, chartConfig, totalWmis } = useMemo(() => {
    const results = data?.Results ?? EMPTY_WMI_RESULTS;
    const count = data?.Count ?? 0;

    const withCountry = results.filter(
      (item): item is ValidWmiItem => item.Country !== null,
    );

    const countryMap = new Map<string, Set<string>>();
    withCountry.forEach((item) => {
      const country = item.Country;
      if (!countryMap.has(country)) {
        countryMap.set(country, new Set());
      }
      countryMap.get(country)?.add(item.Name);
    });

    const aggregated = Array.from(countryMap.entries()).map(
      ([country, namesSet]) => ({
        country,
        count: namesSet.size,
      }),
    );

    aggregated.sort((a, b) => b.count - a.count);

    const top5Raw = aggregated.slice(0, 5);
    const remainder = aggregated.slice(5);

    const chartData: CountryDistribution[] = [];
    const chartConfig: ChartConfig = {
      count: { label: "WMIs" },
    };

    top5Raw.forEach((item, index) => {
      const key = `top${index + 1}`;
      chartData.push({
        key,
        country: item.country,
        count: item.count,
        fill: `var(--color-${key})`,
      });
      chartConfig[key] = {
        label: item.country,
        color: `var(--chart-${index + 1})`,
      };
    });

    if (remainder.length > 0) {
      const othersCount = remainder.reduce((sum, item) => sum + item.count, 0);
      chartData.push({
        key: "others",
        country: "Lainnya",
        count: othersCount,
        fill: "var(--color-others)",
      });
      chartConfig.others = {
        label: "Lainnya",
        color: "var(--muted-foreground)",
      };
    }

    return {
      chartData,
      chartConfig,
      totalWmis: count,
    };
  }, [data]);

  return {
    chartData,
    chartConfig,
    totalWmis,
    isPending,
    isError,
  };
}
