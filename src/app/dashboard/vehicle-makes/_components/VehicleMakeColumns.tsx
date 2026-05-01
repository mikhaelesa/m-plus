"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VehicleMake } from "@/types/vehicleMake";
import { VehicleMakeColumnId } from "@/types/vehicleMake";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    onViewModels?: (row: TData) => void;
  }
}

export const VehicleMakeColumns: ColumnDef<VehicleMake>[] = [
  {
    accessorKey: VehicleMakeColumnId.MakeId,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: VehicleMakeColumnId.MakeName,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Brand Name
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: VehicleMakeColumnId.VehicleTypeId,
    header: "Type ID",
    enableSorting: false,
  },
  {
    accessorKey: VehicleMakeColumnId.VehicleTypeName,
    header: "Vehicle Type",
    enableSorting: false,
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row, table }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.options.meta?.onViewModels?.(row.original)}
      >
        View Models
      </Button>
    ),
  },
];
