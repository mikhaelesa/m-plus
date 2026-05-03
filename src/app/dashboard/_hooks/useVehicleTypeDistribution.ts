"use client";

import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import type { ChartConfig } from "@/components/ui/chart";
import { VehicleMakesService } from "@/services/vehicleMakes";
import {
  VEHICLE_TYPE_LABELS,
  VEHICLE_TYPE_OPTIONS,
  VehicleMakesQueryKey,
} from "@/types/vehicleMake";
import type { VehicleTypeDataPoint } from "@/types/vehicleTypeDistribution";

export function useVehicleTypeDistribution() {
  const results = useQueries({
    queries: VEHICLE_TYPE_OPTIONS.map((type) => ({
      queryKey: [VehicleMakesQueryKey.VehicleMakes, type],
      queryFn: () => VehicleMakesService.getMakes(type),
    })),
  });

  const isPending = results.some((r) => r.isPending);
  const isError = results.some((r) => r.isError);

  const { chartData, chartConfig } = useMemo(() => {
    if (isPending)
      return {
        chartData: [],
        chartConfig: { count: { label: "Makes" } } as ChartConfig,
      };

    const points: VehicleTypeDataPoint[] = VEHICLE_TYPE_OPTIONS.map(
      (type, i) => ({
        typeKey: type,
        typeName: VEHICLE_TYPE_LABELS[type],
        count: results[i]?.data?.Count ?? 0,
        fill: `var(--color-${type})`,
      }),
    );

    points.sort((a, b) => b.count - a.count);

    const config: ChartConfig = { count: { label: "Makes" } };
    points.forEach((point, index) => {
      config[point.typeKey] = {
        label: point.typeName,
        color: `var(--chart-${(index % 5) + 1})`,
      };
    });

    return { chartData: points, chartConfig: config };
  }, [results, isPending]);

  return { chartData, chartConfig, isPending, isError };
}
