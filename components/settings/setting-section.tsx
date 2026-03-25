import React from "react";

interface SettingSectionProps {
  children: React.ReactNode;
  title: string;
  description: string;
}
function SettingSection({ children, title, description }: SettingSectionProps) {
  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4 space-y-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default SettingSection;
