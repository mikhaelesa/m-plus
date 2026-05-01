import { PageHeader } from "@/components/molecules/PageHeader";
import { StatsService } from "@/services/stats";
import { DashboardStats } from "./_components/DashboardStats";

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
    </div>
  );
}
