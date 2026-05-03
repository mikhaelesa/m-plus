import type { Metadata } from "next";
import { VehicleMakesTable } from "@/app/dashboard/vehicle-makes/_components/VehicleMakesTable";

import { PageHeader } from "@/components/molecules/PageHeader";

export const metadata: Metadata = {
  title: "Vehicle Makes",
  description: "Detailed analysis of vehicle makes and manufacturing trends.",
};


export default function VehicleMakesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Vehicle Makes"
        description="Data sourced from NHTSA VPIC API"
      />
      <VehicleMakesTable />
    </div>
  );
}
