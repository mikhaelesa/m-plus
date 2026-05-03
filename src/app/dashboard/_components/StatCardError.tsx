import { AlertCircle, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatCardError({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="border-destructive/50 border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-destructive font-medium mt-1">
          <AlertCircle className="h-4 w-4" />
          <span>Gagal memuat data</span>
        </div>
      </CardContent>
    </Card>
  );
}
