"use client";
import React from "react";
import { Card } from "../ui/card";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/user-context";

function SubscribeDetails() {
  const { user } = useUserContext();
  return (
    <div className="lg:col-span-8 grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card className="border-0 bg-primary text-primary-foreground p-6">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
            Acceso a la Plataforma
          </p>
          <div>
            <h3 className="text-3xl font-bold">Usuario</h3>
            <div className="mt-2 flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4" />
              Estado: {user ? "Activo" : "Sin sesion"}
            </div>
          </div>
        </div>
      </Card>
      <Card className="border border-border/60 bg-card/70 p-6">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Detalles de Cuenta
          </p>
          <h3 className="text-2xl font-semibold">Sin suscripcion</h3>
          <Button variant="ghost" className="px-0 text-primary">
            Gestionar Cuenta
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default SubscribeDetails;
