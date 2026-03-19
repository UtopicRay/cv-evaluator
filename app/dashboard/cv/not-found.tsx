import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CVNotFound() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <Card className="p-8 bg-card border-border">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">No encontramos este CV</h2>
            <p className="text-sm text-muted-foreground">
              Este CV no existe o fue eliminado. Vuelve al dashboard para
              continuar.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">Ir al dashboard</Link>
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
