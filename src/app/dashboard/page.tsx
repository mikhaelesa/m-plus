import { PageHeader } from "@/components/molecules/PageHeader";
import { DashboardStats } from "./_components/DashboardStats";
import { ManufacturingChart } from "./_components/ManufacturingChart";
import { VehicleTypeChart } from "./_components/VehicleTypeChart";

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Overview"
        description="Global automotive data insights from vPIC Dataset."
      />
      <DashboardStats />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ManufacturingChart />
        <VehicleTypeChart />
      </div>
    </div>
  );
}
