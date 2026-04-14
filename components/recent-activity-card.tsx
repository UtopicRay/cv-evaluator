import React from "react";
import { Card } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { RecentsJobsDto } from "@/type";

function RecentActivityCard({ item }: { item: RecentsJobsDto }) {
  function getMatchColor(match: number) {
    if (match >= 80) return "text-success";
    if (match >= 60) return "text-muted-foreground";
    return "text-destructive";
  }
  return (
    <Card
      key={item.id}
      className="group rounded-xl border border-border/50 bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted font-bold text-muted-foreground">
            {item.company?.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-foreground">{item.company}</p>
            <p className="text-xs text-muted-foreground">
              {item.position} -{" "}
              {item.createdAt.toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              Match
            </p>
            <p
              className={`text-lg font-black ${getMatchColor(item.analyses[0]?.matchScore ?? 0)}`}
            >
              {item.analyses[0]?.matchScore ?? 0}%
            </p>
            <div className="mt-2 h-1.5 w-20 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-current"
                style={{ width: `${item.analyses[0]?.matchScore ?? 0}%` }}
              />
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>
    </Card>
  );
}

export default RecentActivityCard;
