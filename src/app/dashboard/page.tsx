import { PageHeader } from "@/components/molecules/PageHeader";
import { StatsService } from "@/services/stats";
import { DashboardStats } from "./_components/DashboardStats";
import { ManufacturingChart } from "./_components/ManufacturingChart";
import { VehicleTypeChart } from "./_components/VehicleTypeChart";

export default async function DashboardPage() {
  const [totalMakes, totalManufacturers] = await Promise.all([
    StatsService.getTotalMakes(),
    StatsService.getTotalManufacturers(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Overview"
        description="Ringkasan data otomotif global dari vPIC Dataset."
      />
      <DashboardStats
        totalMakes={totalMakes}
        totalManufacturers={totalManufacturers}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ManufacturingChart />
        <VehicleTypeChart />
      </div>
    </div>
  );
}
