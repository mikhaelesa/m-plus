"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VehicleMake } from "@/types/vpic";
import { VehicleMakeColumnId } from "@/types/vpic";

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
];
