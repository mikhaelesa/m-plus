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

interface VehicleTypeFilterProps {
  value: VehicleType;
  onValueChange: (type: VehicleType) => void;
  className?: string;
}

export function VehicleTypeFilter({
  value,
  onValueChange,
  className,
}: VehicleTypeFilterProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className ?? "w-[180px]"}>
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
  );
}
