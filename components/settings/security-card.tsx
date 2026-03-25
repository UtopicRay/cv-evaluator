import React from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function SecurityCard() {
  return (
    <Card className="lg:col-span-8 border-0 bg-card/70 p-8 shadow-sm space-y-8">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Correo Electronico
        </label>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Input
            type="email"
            placeholder="Actualiza tu correo"
            className="bg-muted/60 border-0 focus-visible:ring-primary/20"
          />
          <Button variant="secondary">Cambiar Email</Button>
        </div>
      </div>
      <div className="h-px bg-border/60" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Contrasena Actual
          </label>
          <Input
            type="password"
            placeholder="••••••••••••"
            className="bg-muted/60 border-0 focus-visible:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Nueva Contrasena
          </label>
          <Input
            type="password"
            placeholder="Nueva contrasena"
            className="bg-muted/60 border-0 focus-visible:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Confirmar Nueva Contrasena
          </label>
          <Input
            type="password"
            placeholder="Repite la contrasena"
            className="bg-muted/60 border-0 focus-visible:ring-primary/20"
          />
        </div>
      </div>
    </Card>
  );
}

export default SecurityCard;
