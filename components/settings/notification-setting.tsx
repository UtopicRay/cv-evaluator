import React from "react";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";

function NotificationSetting() {
  return (
    <div className="lg:col-span-8 flex flex-col gap-6">
      <Card className="lg:col-span-8 border-0 bg-card/70 p-8 shadow-sm divide-y divide-border/60">
        <div className="flex items-center justify-between py-4 first:pt-0">
          <div>
            <p className="font-medium">Alertas de nuevos analisis</p>
            <p className="text-xs text-muted-foreground">
              Recibe un correo cuando tu CV haya sido procesado.
            </p>
          </div>
          <Switch disabled />
        </div>
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium">Consejos de IA</p>
            <p className="text-xs text-muted-foreground">
              Sugerencias personalizadas para mejorar tu puntuacion de CV.
            </p>
          </div>
          <Switch disabled />
        </div>
        <div className="flex items-center justify-between py-4 last:pb-0">
          <div>
            <p className="font-medium">Actualizaciones del sistema</p>
            <p className="text-xs text-muted-foreground">
              Nuevas funcionalidades y mejoras en la plataforma.
            </p>
          </div>
          <Switch disabled />
        </div>
      </Card>
      <p className="text-xs text-muted-foreground">
        Estas preferencias aun no se guardan en la base de datos.
      </p>
      <div className="flex flex-col gap-4 pb-8 sm:flex-row sm:justify-end">
        <Button variant="secondary" className="sm:min-w-[160px]">
          Cancelar
        </Button>
        <Button className="sm:min-w-[200px]">Guardar Cambios</Button>
      </div>
    </div>
  );
}

export default NotificationSetting;
