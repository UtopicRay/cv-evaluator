import React from "react";
import { Badge } from "../ui/badge";
import { getSectionMeta } from "@/lib/cv/utils";

export default function CVSection({ section }: { section: any }) {
  const meta = getSectionMeta(section.metadata);
  return (
    <div key={section.id} className="rounded-lg border border-border p-4">
      <div className="flex items-center justify-between gap-4 mb-2">
        <h4 className="font-medium">{section.title || section.type}</h4>
        {meta.score !== null && <Badge variant="secondary">{meta.score}</Badge>}
      </div>
      {meta.feedback && (
        <p className="text-sm text-muted-foreground mt-3">{meta.feedback}</p>
      )}
    </div>
  );
}


