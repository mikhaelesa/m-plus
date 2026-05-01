"use client";

import { useQueries } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo } from "react";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { PATHS } from "@/constants/paths";
import { VehicleMakesService } from "@/services/vehicleMakes";
import {
  VEHICLE_TYPE_LABELS,
  VEHICLE_TYPE_OPTIONS,
  VehicleMakesQueryKey,
} from "@/types/vehicleMake";
import type { VehicleTypeDataPoint } from "@/types/vehicleTypeDistribution";

export function VehicleTypeChart() {
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
      return { chartData: [], chartConfig: { count: { label: "Merek" } } };

    const points: VehicleTypeDataPoint[] = VEHICLE_TYPE_OPTIONS.map(
      (type, i) => ({
        typeKey: type,
        typeName: VEHICLE_TYPE_LABELS[type],
        count: results[i]?.data?.Count ?? 0,
        fill: `var(--color-${type})`,
      }),
    );

    points.sort((a, b) => b.count - a.count);

    const config: ChartConfig = { count: { label: "Merek" } };
    points.forEach((point, index) => {
      config[point.typeKey] = {
        label: point.typeName,
        color: `var(--chart-${(index % 5) + 1})`,
      };
    });

    return { chartData: points, chartConfig: config };
  }, [results, isPending]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Komparasi Tipe Kendaraan</CardTitle>
        <CardDescription>
          Jumlah merek terdaftar berdasarkan kategori
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {isPending ? (
          <Skeleton className="h-[300px] w-full" />
        ) : isError ? (
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            Gagal memuat data komparasi.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 16, right: 16 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="typeKey"
                type="category"
                tickLine={false}
                axisLine={false}
                tickFormatter={(key) => chartConfig[key]?.label ?? key}
                width={130}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter>
        <Link href={PATHS.vehicleMakes}>
          <Button variant="outline">Lihat Selengkapnya</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
