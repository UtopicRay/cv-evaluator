import React from "react";
import { Card } from "./ui/card";

function CommunHeaderCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Card className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </p>
      {children}
    </Card>
  );
}

export default CommunHeaderCard;
