import { useQuery } from "@tanstack/react-query";
import { WmiService } from "@/services/wmi";
import type { VehicleType } from "@/types/vehicleMake";
import { WmiQueryKey } from "@/types/wmi";

export function useWmis(vehicleType: VehicleType) {
  return useQuery({
    queryKey: [WmiQueryKey.Wmis, vehicleType],
    queryFn: () => WmiService.getWmis(vehicleType),
  });
}
