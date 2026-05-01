"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      </div>
    </div>
  );
}
