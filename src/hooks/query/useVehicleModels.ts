import { useQuery } from "@tanstack/react-query";
import { VehicleModelsService } from "@/services/vehicleModels";
import { VehicleModelsQueryKey } from "@/types/vehicleModel";

export function useVehicleModels(makeId: number | null) {
  return useQuery({
    queryKey: [VehicleModelsQueryKey.VehicleModels, makeId],
    queryFn: () => VehicleModelsService.getModelsByMakeId(makeId!),
    enabled: !!makeId,
  });
}
