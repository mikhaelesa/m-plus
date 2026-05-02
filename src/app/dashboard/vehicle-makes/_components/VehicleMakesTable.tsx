"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useVehicleMakes } from "@/hooks/query/useVehicleMakes";
import type { VehicleMake } from "@/types/vehicleMake";
import { VehicleMakeColumnId, VehicleType } from "@/types/vehicleMake";
import { VehicleMakeColumns } from "./VehicleMakeColumns";
import { VehicleMakesToolbar } from "./VehicleMakesToolbar";
import { VehicleModelsSheet } from "./VehicleModelsSheet";

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
  const [selectedMake, setSelectedMake] = useState<VehicleMake | null>(null);
  const [vehicleType, setVehicleType] = useState<VehicleType>(VehicleType.Car);
  const { data, isPending } = useVehicleMakes(vehicleType);
  const tableData = [
    {
      MakeId: null as unknown as number,
      MakeName: "INVALID DATA DUMMY",
      VehicleTypeName: "INVALID",
      VehicleTypeId: 0,
    } as VehicleMake,
    ...(data?.Results ?? EMPTY_ARRAY),
  ];

  const handleViewModels = (make: VehicleMake) => setSelectedMake(make);
  const handleSheetClose = (open: boolean) => {
    if (!open) setSelectedMake(null);
  };

  if (isPending) return <TableSkeleton />;

  return (
    <div className="space-y-4">
      <VehicleMakesToolbar
        vehicleType={vehicleType}
        onTypeChange={setVehicleType}
      />
      <DataTable
        columns={VehicleMakeColumns}
        data={tableData}
        filterColumnId={VehicleMakeColumnId.MakeName}
        meta={{ onViewModels: handleViewModels }}
      />
      <VehicleModelsSheet
        makeId={selectedMake?.MakeId ?? null}
        makeName={selectedMake?.MakeName ?? ""}
        open={!!selectedMake}
        onOpenChange={handleSheetClose}
      />
    </div>
  );
}
