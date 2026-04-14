import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { RecentsJobsDto } from "@/type";
import RecentActivityCard from "../recent-activity-card";

function RecentSection({
  recentActivity,
}: {
  recentActivity: RecentsJobsDto[];
}) {
  const hasRecentActivity = recentActivity && recentActivity.length > 0;
  return (
    <section className="space-y-4">
      {hasRecentActivity ? (
        <div>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-foreground">
              Actividad Reciente
            </h3>
            <Link href="/dashboard/cv">
              <Button
                variant="ghost"
                className="px-0 text-primary hover:text-primary"
              >
                Ver todo
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <RecentActivityCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <p>No hay actividad reciente.</p>
      )}
    </section>
  );
}

export default RecentSection;
