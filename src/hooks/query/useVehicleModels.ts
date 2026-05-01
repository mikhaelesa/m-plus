import { useQuery } from "@tanstack/react-query";
import { VehicleModelsService } from "@/services/vehicleModels";
import type { VehicleType } from "@/types/vehicleMake";
import { VehicleModelsQueryKey } from "@/types/vehicleModel";

interface UseVehicleModelsParams {
  makeId: number | null;
  vehicleType?: VehicleType;
  modelYear?: string;
}

export function useVehicleModels({
  makeId,
  vehicleType,
  modelYear,
}: UseVehicleModelsParams) {
  return useQuery({
    queryKey: [
      VehicleModelsQueryKey.VehicleModels,
      makeId,
      vehicleType,
      modelYear,
    ],

    queryFn: () =>
      VehicleModelsService.getModels({
        makeId: makeId!,
        vehicleType,
        modelYear,
      }),

    enabled: !!makeId,
  });
}
