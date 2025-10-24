"use client";
import ButtonSocialAuth from "@/components/button-social-auth";
import LeftSideInfo from "@/components/left-side-info";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IconBrandGoogleFilled,
  IconBrandLinkedinFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { infoDetails } from "@/const";

export default function LoginPage(e: React.FormEvent) {
  const { handleSubmit, register } = useForm();
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    await handleLogin(data);
  });
  async function handleLogin(data: FieldValues) {
    e.preventDefault;
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/dashboard");
    }
    toast("Funcionalidad de inicio de sesión no implementada aún");
  }
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Illustration/Info */}
        <LeftSideInfo
          title="Bienvenido de vuelta"
          details={infoDetails.slice(3, 6)}
          description="Accede a tu cuenta para continuar evaluando y mejorando tus currículums con nuestra tecnología de IA."
        />

        {/* Right side - Login Form */}
        <Card className="p-8 bg-card border-border">
          <div className="space-y-6">
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
              <p className="text-muted-foreground">
                Ingresa tus credenciales para acceder
              </p>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-background"
                  {...register("password", { required: true })}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Iniciar Sesión
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  O continúa con
                </span>
              </div>
            </div>
            {/* 
            <div className="grid grid-cols-2 gap-3">
              <ButtonSocialAuth text="Google">
                <IconBrandGoogleFilled className="mr-2" size={16} stroke={2} />
              </ButtonSocialAuth>
              <ButtonSocialAuth text="LinkedIn">
                <IconBrandLinkedinFilled
                  className="mr-2"
                  size={24}
                  stroke={2}
                />
              </ButtonSocialAuth>
            </div> */}
            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/register"
                className="text-primary hover:underline font-medium"
              >
                Regístrate gratis
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
