import React from "react";
import { Card } from "../ui/card";

interface AdviceCardProps {
  title: string;
  applicationTips: string[];
  subjection: string;
}

function AdviceCard({
  title,
  applicationTips,
  subjection,
}: AdviceCardProps) {
  return (
    <Card className="border-border/40 bg-card p-6">
      <h3 className="mb-3 text-lg font-extrabold tracking-tight">{title}</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {applicationTips.length > 0 ? (
          applicationTips
            .slice(0, 3)
            .map((item) => <li key={item}>• {item}</li>)
        ) : (
          <li>{subjection}</li>
        )}
      </ul>
    </Card>
  );
}

export default AdviceCard;
