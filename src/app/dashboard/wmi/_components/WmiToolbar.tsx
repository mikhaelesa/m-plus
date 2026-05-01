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
import { WmiService } from "@/services/wmi";
import {
  VEHICLE_TYPE_LABELS,
  VEHICLE_TYPE_OPTIONS,
  type VehicleType,
} from "@/types/vehicleMake";

interface WmiToolbarProps {
  vehicleType: VehicleType;
  onTypeChange: (type: VehicleType) => void;
}

export function WmiToolbar({ vehicleType, onTypeChange }: WmiToolbarProps) {
  const handleDownload = () => {
    const url = WmiService.getCsvUrl(vehicleType);
    downloadCsv(url);
  };

  return (
    <div className="flex max-md:flex-col md:items-center justify-between gap-2">
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
