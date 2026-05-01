import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VehicleMakesTableErrorProps {
  error: Error | null;
  onReset: () => void;
}

export function VehicleMakesTableError({
  error,
  onReset,
}: VehicleMakesTableErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-destructive/30 bg-destructive/5 px-6 py-12 text-center">
      <AlertCircle className="size-10 text-destructive" />
      <div className="space-y-1">
        <p className="text-sm font-semibold text-destructive">
          Failed to load data
        </p>
        <p className="max-w-sm text-xs text-muted-foreground">
          {error?.message}
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={onReset}>
        Reset &amp; Retry
      </Button>
    </div>
  );
}
