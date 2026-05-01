"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useVehicleMakes } from "@/hooks/query/useVehicleMakes";
import { VehicleMakeColumnId } from "@/types/vpic";
import { VehicleMakeColumns } from "./VehicleMakeColumns";
import { VehicleMakesTableError } from "./VehicleMakesTableError";
import { VehicleMakesToolbar } from "./VehicleMakesToolbar";

// RULE: Module-level constant — NEVER inline [] inside component body
const EMPTY_ARRAY: never[] = [];

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-7 w-24" />
      </div>
      <Skeleton className="h-8 w-64" />
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

export function VehicleMakesTable() {
  const [triggerError, setTriggerError] = useState(false);
  const { data, isPending, isError, error } = useVehicleMakes(triggerError);
  const tableData = data?.Results ?? EMPTY_ARRAY;

  if (isPending) return <TableSkeleton />;

  if (isError || !data.Results.length) {
    return (
      <div className="space-y-4">
        <VehicleMakesToolbar onTestError={() => setTriggerError(true)} />
        <VehicleMakesTableError
          error={error}
          onReset={() => setTriggerError(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <VehicleMakesToolbar onTestError={() => setTriggerError(true)} />
      <DataTable
        columns={VehicleMakeColumns}
        data={tableData}
        filterColumnId={VehicleMakeColumnId.MakeName}
      />
    </div>
  );
}
