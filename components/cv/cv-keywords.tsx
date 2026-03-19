import React from "react";
import { Badge } from "../ui/badge";

interface CVKeywordsProps {
  skill: string[];
  variant: "outline" | "secondary";
  title: "Detectadas" | "Faltantes";
}

export default function CVKeywords({ skill, variant, title }: CVKeywordsProps) {
  return (
    <div>
      <p className="text-sm font-medium mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">
        {skill.length === 0 ? (
          <span className="text-sm text-muted-foreground">
            Sin keywords {title.toLowerCase()}.
          </span>
        ) : (
          skill.map((keyword, index) => (
            <Badge key={index} variant={variant}>
              {keyword}
            </Badge>
          ))
        )}
      </div>
    </div>
  );
}
