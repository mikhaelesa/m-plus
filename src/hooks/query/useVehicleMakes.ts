import { useQuery } from "@tanstack/react-query";
import { VehicleMakesService } from "@/services/vehicleMakes";
import { VehicleMakesQueryKey } from "@/types/vehicleMake";

const normalQueryOptions = {
  queryKey: [VehicleMakesQueryKey.VehicleMakes],
  queryFn: VehicleMakesService.getMakes,
} as const;

export function useVehicleMakes(triggerError: boolean) {
  const normalQuery = useQuery(normalQueryOptions);
  const errorQuery = useQuery({
    queryKey: [VehicleMakesQueryKey.VehicleMakesError],
    queryFn: VehicleMakesService.getMakesError,
    retry: false,
    enabled: triggerError,
  });

  return triggerError ? errorQuery : normalQuery;
}
