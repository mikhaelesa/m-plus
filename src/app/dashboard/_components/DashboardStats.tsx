"use client";

import { useQueries } from "@tanstack/react-query";
import { Car, Factory } from "lucide-react";
import { StatsService } from "@/services/stats";
import { StatsQueryKey } from "@/types/stats";
import { StatCard } from "./StatCard";

export function DashboardStats() {
  const [makesQuery, manufacturersQuery] = useQueries({
    queries: [
      {
        queryKey: [StatsQueryKey.TotalMakes],
        queryFn: () => StatsService.getTotalMakes(),
      },
      {
        queryKey: [StatsQueryKey.TotalManufacturers],
        queryFn: () => StatsService.getTotalManufacturers(),
      },
    ],
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Vehicle Makes"
        value={makesQuery.data ?? 0}
        icon={Car}
        description="Unique makes registered in NHTSA"
        isPending={makesQuery.isPending}
        isError={makesQuery.isError}
      />
      <StatCard
        title="Total Manufacturers"
        value={manufacturersQuery.data ?? 0}
        icon={Factory}
        description="Active manufacturers across all types"
        isPending={manufacturersQuery.isPending}
        isError={manufacturersQuery.isError}
      />
    </div>
  );
}
