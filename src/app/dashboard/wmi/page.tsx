import { PageHeader } from "@/components/molecules/PageHeader";
import { WmiTable } from "./_components/WmiTable";

export default function WmiPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="World Manufacturer Identifiers"
        description="Data sourced from NHTSA VPIC API"
      />
      <WmiTable />
    </div>
  );
}
