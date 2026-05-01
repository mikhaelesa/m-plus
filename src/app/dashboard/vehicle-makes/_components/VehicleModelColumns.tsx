"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VehicleModel } from "@/types/vehicleModel";
import { VehicleModelColumnId } from "@/types/vehicleModel";

export const VehicleModelColumns: ColumnDef<VehicleModel>[] = [
  {
    accessorKey: VehicleModelColumnId.ModelId,
    header: "Model ID",
    enableSorting: false,
  },
  {
    accessorKey: VehicleModelColumnId.ModelName,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Model Name
        <ArrowUpDown />
      </Button>
    ),
  },
];
