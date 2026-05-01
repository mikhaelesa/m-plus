import { Car, Factory } from "lucide-react";
import { StatCard } from "./StatCard";

interface DashboardStatsProps {
  totalMakes: number;
  totalManufacturers: number;
}

export function DashboardStats({
  totalMakes,
  totalManufacturers,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Vehicle Makes"
        value={totalMakes}
        icon={Car}
        description="Unique makes registered in NHTSA"
      />
      <StatCard
        title="Total Manufacturers"
        value={totalManufacturers}
        icon={Factory}
        description="Active manufacturers across all types"
      />
    </div>
  );
}
