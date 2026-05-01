"use client";

import Link from "next/link";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { PATHS } from "@/constants/paths";
import { useVehicleTypeDistribution } from "../_hooks/useVehicleTypeDistribution";
import { RoleGuard } from "@/components/molecules/RoleGuard";
import { UserRole } from "@/types/auth";

export function VehicleTypeChart() {
  const { chartData, chartConfig, isPending, isError } =
    useVehicleTypeDistribution();

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
        <RoleGuard allowedRoles={[UserRole.ADMIN]}>
          <Link href={PATHS.vehicleMakes}>
            <Button variant="outline">Lihat Selengkapnya</Button>
          </Link>
        </RoleGuard>
      </CardFooter>
    </Card>
  );
}
