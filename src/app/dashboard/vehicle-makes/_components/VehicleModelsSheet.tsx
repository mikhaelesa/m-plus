"use client";

import { DataTable } from "@/components/ui/data-table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useVehicleModels } from "@/hooks/query/useVehicleModels";
import { VehicleModelColumnId } from "@/types/vehicleModel";
import { VehicleModelColumns } from "./VehicleModelColumns";

const EMPTY_ARRAY: never[] = [];

interface VehicleModelsSheetProps {
  makeId: number | null;
  makeName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VehicleModelsSheet({
  makeId,
  makeName,
  open,
  onOpenChange,
}: VehicleModelsSheetProps) {
  const { data, isPending, isError, error } = useVehicleModels(makeId);
  const tableData = data?.Results ?? EMPTY_ARRAY;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Models — {makeName}</SheetTitle>
          <SheetDescription>Make ID: {makeId}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 px-1">
          {isPending && (
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={String(i)} className="h-10 w-full" />
              ))}
            </div>
          )}
          {isError && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
          {!isPending && !isError && (
            <DataTable
              columns={VehicleModelColumns}
              data={tableData}
              filterColumnId={VehicleModelColumnId.ModelName}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
