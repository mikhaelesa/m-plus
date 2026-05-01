"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { downloadCsv } from "@/lib/downloadCsv";
import { VehicleMakesService } from "@/services/vehicleMakes";
import {
  VEHICLE_TYPE_LABELS,
  VEHICLE_TYPE_OPTIONS,
  type VehicleType,
} from "@/types/vehicleMake";

interface VehicleMakesToolbarProps {
  vehicleType: VehicleType;
  onTypeChange: (type: VehicleType) => void;
}

export function VehicleMakesToolbar({
  vehicleType,
  onTypeChange,
}: VehicleMakesToolbarProps) {
  const handleDownload = () => {
    const url = VehicleMakesService.getCsvUrl(vehicleType);
    downloadCsv(url);
  };

  return (
    <div className="flex max-md:flex-col md:items-center justify-between gap-2">
      <div className="space-y-0.5">
        <h2 className="text-sm font-semibold">Vehicle Makes</h2>
        <p className="text-xs text-muted-foreground">
          Data sourced from NHTSA VPIC API
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Select value={vehicleType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {VEHICLE_TYPE_OPTIONS.map((type) => (
              <SelectItem key={type} value={type}>
                {VEHICLE_TYPE_LABELS[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="size-4" />
          Download CSV
        </Button>
      </div>
    </div>
  );
}
