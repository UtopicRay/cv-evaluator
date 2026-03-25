"use client";
import React from "react";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Camera } from "lucide-react";
import { useUserContext } from "@/context/user-context";

function UserInfo() {
  const { user } = useUserContext();
  const initials = user
    ? `${user.name?.charAt(0) ?? ""}${user.lastName?.charAt(0) ?? ""}`.trim()
    : "";
  return (
    <Card className="lg:col-span-8 border-0 bg-card/70 p-8 shadow-sm">
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <div className="relative">
          <div className="h-28 w-28 rounded-2xl bg-muted/70 flex items-center justify-center text-xl font-semibold text-muted-foreground">
            {initials || "--"}
          </div>
          <Button
            size="icon"
            className="absolute -bottom-2 -right-2 h-9 w-9 rounded-xl"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Nombre
            </label>
            <Input
              defaultValue={user?.name ?? ""}
              placeholder="Nombre"
              className="bg-muted/60 border-0 focus-visible:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Apellido
            </label>
            <Input
              defaultValue={user?.lastName ?? ""}
              placeholder="Apellido"
              className="bg-muted/60 border-0 focus-visible:ring-primary/20"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Correo Electronico
            </label>
            <Input
              type="email"
              defaultValue={user?.email ?? ""}
              placeholder="Sin correo registrado"
              className="bg-muted/60 border-0 focus-visible:ring-primary/20"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default UserInfo;
