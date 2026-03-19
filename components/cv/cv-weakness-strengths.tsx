import React from "react";

export function CVWeaknessStrengthCard({ strength, color }: { strength: string; color: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className={`h-5 w-5 rounded-full ${color}/10 flex items-center justify-center flex-shrink-0 mt-0.5`}>
        <div className={`h-2 w-2 rounded-full ${color}`} />
      </div>
      <p className="text-sm">{strength}</p>
    </div>
  );
}
