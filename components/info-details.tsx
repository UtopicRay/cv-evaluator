import { InfoDetailsProps } from "@/type";
import React from "react";

function InfoDetails({ title, description, color }: InfoDetailsProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`h-6 w-6 rounded-full ${color}/10 flex items-center justify-center flex-shrink-0 mt-0.5`}
      >
        <div className={`h-2 w-2 rounded-full ${color}`} />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default InfoDetails;
