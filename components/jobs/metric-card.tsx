import { Briefcase, CircleHelp, Star, TrendingUp } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";

interface MetricCardProps {
  skillsMatch: number;
  experienceMatch: number;
  educationMatch: number;
  keywordsMatch: number;
}
function MetricCard({
  skillsMatch,
  experienceMatch,
  educationMatch,
  keywordsMatch,
}: MetricCardProps) {
  const metricsInfo = [
    { label: "Skills Match", value: skillsMatch, icon: Briefcase },
    {
      label: "Experience Match",
      value: experienceMatch,
      icon: TrendingUp,
    },
    { label: "Education Match", value: educationMatch, icon: Star },
    { label: "Keywords Match", value: keywordsMatch, icon: CircleHelp },
  ];
  return (
   <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
      {metricsInfo.map((metric, index) => (
        <Card key={metric.label} className="border-border/40 bg-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <metric.icon className="h-4 w-4 text-primary" />
            <span className="text-xl font-black text-foreground">
              {metric.value}%
            </span>
          </div>
          <p className="mb-2 text-sm font-semibold text-foreground">
            {metric.label}
          </p>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${metric.value}%` }}
            />
          </div>
        </Card>
      ))}
    </section>
  );
}

export default MetricCard;
