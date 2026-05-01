"use client";

import { useState } from "react";
import { VehicleMakesTableError } from "@/app/dashboard/vehicle-makes/_components/VehicleMakesTableError";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useWmis } from "@/hooks/query/useWmis";
import { VehicleType } from "@/types/vehicleMake";
import { WmiColumnId } from "@/types/wmi";
import { WmiColumns } from "./WmiColumns";
import { WmiToolbar } from "./WmiToolbar";

const EMPTY_ARRAY: never[] = [];

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-7 w-24" />
      </div>
      <div className="rounded-md border border-border">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton
            key={String(i)}
            className="h-11 w-full rounded-none border-b border-border last:border-b-0"
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-7 w-16" />
        </div>
      </div>
    </div>
  );
}

export function WmiTable() {
  const [vehicleType, setVehicleType] = useState<VehicleType>(VehicleType.Car);
  const { data, isPending, isError, error, refetch } = useWmis(vehicleType);
  const tableData = data?.Results ?? EMPTY_ARRAY;

  if (isPending) return <TableSkeleton />;
  if (isError)
    return (
      <VehicleMakesTableError
        error={error instanceof Error ? error : null}
        onReset={refetch}
      />
    );

  return (
    <div className="space-y-4">
      <WmiToolbar vehicleType={vehicleType} onTypeChange={setVehicleType} />
      <DataTable
        columns={WmiColumns}
        data={tableData}
        filterColumnId={WmiColumnId.Name}
      />
    </div>
  );
}
