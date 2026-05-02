"use client";

import Link from "next/link";
import { useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import { useWmiDistribution } from "@/app/dashboard/_hooks/useWmiDistribution";
import { RoleGuard } from "@/components/molecules/RoleGuard";
import { VehicleTypeFilter } from "@/components/molecules/VehicleTypeFilter";
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
import { UserRole } from "@/types/auth";
import { VehicleType } from "@/types/vehicleMake";

export function ManufacturingChart() {
  const [vehicleType, setVehicleType] = useState<VehicleType>(VehicleType.Car);
  const { chartData, chartConfig, totalWmis, isPending } =
    useWmiDistribution(vehicleType);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Manufacturer Distribution</CardTitle>
        <CardDescription>
          Based on country of origin and vehicle type
        </CardDescription>
      </CardHeader>

      <div className="flex justify-center px-6 pt-4 pb-2">
        <VehicleTypeFilter value={vehicleType} onValueChange={setVehicleType} />
      </div>

      <CardContent className="flex-1 pb-0">
        {isPending ? (
          <div className="flex h-[250px] items-center justify-center">
            <Skeleton className="h-[200px] w-[200px] rounded-full" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="key"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {new Intl.NumberFormat("id-ID").format(totalWmis)}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            WMIs
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      {!isPending && chartData.length > 0 && (
        <CardFooter className="flex flex-col gap-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {chartData.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: chartConfig[item.key]?.color }}
                />
                <span className="whitespace-nowrap">{item.country}</span>
              </div>
            ))}
          </div>
          <RoleGuard allowedRoles={[UserRole.ADMIN]}>
            <Link className="self-start" href={PATHS.wmi}>
              <Button variant="outline">View More</Button>
            </Link>
          </RoleGuard>
        </CardFooter>
      )}
    </Card>
  );
}
