import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RecentsJobsDto } from "@/type";
import { FileText, Plus } from "lucide-react";
import RecentActivityCard from "../recent-activity-card";

interface RecentSectionProps {
  recentActivity: RecentsJobsDto[];
}

function RecentSection({ recentActivity }: RecentSectionProps) {
  const hasRecentActivity = recentActivity && recentActivity.length > 0;

  if (!hasRecentActivity) {
    return (
      <Empty className="border border-dashed border-border/60 bg-card/50">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileText className="h-5 w-5" />
          </EmptyMedia>
          <EmptyTitle>No hay actividad reciente</EmptyTitle>
          <EmptyDescription>
            Sube tu CV o analiza una oferta para ver tu actividad aqui.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/dashboard/upload">
            <Button className="font-bold">
              <Plus className="mr-2 h-4 w-4" />
              Crear primer analisis
            </Button>
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-foreground">Actividad Reciente</h3>
        <Link href="/dashboard/jobs">
          <Button variant="ghost" className="px-0 text-primary hover:text-primary">
            Ver todo
          </Button>
        </Link>
      </div>
      <div className="space-y-3">
        {recentActivity.map((item) => (
          <RecentActivityCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default RecentSection;
