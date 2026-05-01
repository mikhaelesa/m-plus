import { useQuery } from "@tanstack/react-query";
import { VehicleModelsService } from "@/services/vehicleModels";
import type { VehicleType } from "@/types/vehicleMake";
import { VehicleModelsQueryKey } from "@/types/vehicleModel";

interface UseVehicleModelsParams {
  makeId:       number | null;
  vehicleType?: VehicleType;
}

export function useVehicleModels({
  makeId,
  vehicleType,
}: UseVehicleModelsParams) {
  return useQuery({
    // React Query creates separate cache entries for each unique key.
    // vehicleType=undefined vs vehicleType="truck" are distinct caches.
    queryKey: [VehicleModelsQueryKey.VehicleModels, makeId, vehicleType],

    queryFn: () => {
      if (vehicleType) {
        return VehicleModelsService.getModelsByMakeIdAndType(makeId!, vehicleType);
      }
      return VehicleModelsService.getModelsByMakeId(makeId!);
    },

    // Query only runs when makeId is available
    enabled: !!makeId,
  });
}
