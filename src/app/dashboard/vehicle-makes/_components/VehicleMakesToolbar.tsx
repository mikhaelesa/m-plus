import { FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VehicleMakesToolbarProps {
  onTestError: () => void;
}

export function VehicleMakesToolbar({ onTestError }: VehicleMakesToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <h2 className="text-sm font-semibold">Vehicle Makes</h2>
        <p className="text-xs text-muted-foreground">
          Data sourced from NHTSA VPIC API
        </p>
      </div>
      <Button variant="destructive" size="sm" onClick={onTestError}>
        <FlaskConical />
        Test Error
      </Button>
    </div>
  );
}
