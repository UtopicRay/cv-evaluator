import React from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";

export default function CVAnalyzeCard({
  scoreItems,
}: {
  scoreItems: Array<{ label: string; value: number | null }>;
}) {
  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold mb-6">Análisis Detallado</h3>
      <div className="space-y-6">
        {scoreItems.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="text-muted-foreground">{item.value}/100</span>
            </div>
            <Progress value={item.value as number} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
}
