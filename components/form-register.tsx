import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

function FormRegister() {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      console.error("Las contraseñas no coinciden");
      return;
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  });
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombre</Label>
          <Input
            id="firstName"
            placeholder="Juan"
            className="bg-background"
            {...register("name", { required: true })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Apellido</Label>
          <Input
            id="lastName"
            placeholder="Pérez"
            className="bg-background"
            {...register("lastName", { required: true })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          className="bg-background"
          {...register("email", { required: true })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className="bg-background"
          {...register("password", { required: true })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          className="bg-background"
          {...register("confirmPassword", { required: true })}
        />
      </div>

      <Button type="submit" className="w-full" size="lg">
        Crear Cuenta
      </Button>
    </form>
  );
}

export default FormRegister;
