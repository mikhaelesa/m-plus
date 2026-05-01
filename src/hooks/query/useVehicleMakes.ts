import { useQuery } from "@tanstack/react-query";
import { VehicleMakesService } from "@/services/vehicleMakes";
import type { VehicleType } from "@/types/vehicleMake";
import { VehicleMakesQueryKey } from "@/types/vehicleMake";

export function useVehicleMakes(vehicleType: VehicleType) {
  return useQuery({
    queryKey: [VehicleMakesQueryKey.VehicleMakes, vehicleType],
    queryFn: () => VehicleMakesService.getMakes(vehicleType),
  });
}
