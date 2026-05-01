"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WmiItem } from "@/types/wmi";
import { WmiColumnId } from "@/types/wmi";

export const WmiColumns: ColumnDef<WmiItem>[] = [
  {
    accessorKey: WmiColumnId.WMI,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        WMI
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: WmiColumnId.Name,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Manufacturer
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: WmiColumnId.Country,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Country
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => row.original.Country ?? "—",
  },
  {
    accessorKey: WmiColumnId.VehicleType,
    header: "Vehicle Type",
    enableSorting: false,
  },
];
