import { useQuery } from "@tanstack/react-query";
import { VehicleMakesService } from "@/services/vehicleMakes";
import type { VehicleType } from "@/types/vehicleMake";
import { VehicleMakesQueryKey } from "@/types/vehicleMake";

export function useVehicleMakes(
  vehicleType: VehicleType,
  triggerError: boolean,
) {
  const normalQuery = useQuery({
    queryKey: [VehicleMakesQueryKey.VehicleMakes, vehicleType],
    queryFn: () => VehicleMakesService.getMakes(vehicleType),
  });

  const errorQuery = useQuery({
    queryKey: [VehicleMakesQueryKey.VehicleMakesError],
    queryFn: VehicleMakesService.getMakesError,
    retry: false,
    enabled: triggerError,
  });

  return triggerError ? errorQuery : normalQuery;
}
