import { FileText } from "lucide-react";
import React from "react";
import InfoDetails from "./info-details";
import { InfoDetailsProps } from "@/type";

interface LeftSideInfoProps {
  title: string;
  description: string;
  details: InfoDetailsProps[]
}
function LeftSideInfo({ title, description,details }: LeftSideInfoProps) {
  return (
    <div className="hidden lg:block">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">CVScore</span>
        </div>
        <h1 className="text-4xl font-bold text-balance leading-tight">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
        <div className="space-y-4 pt-8">
          {details.map((item, index) => (
            <div className="flex items-start gap-3">
              <InfoDetails {...item} key={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftSideInfo;
