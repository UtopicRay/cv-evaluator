"use client";
import ButtonSocialAuth from "@/components/button-social-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import Link from "next/link";
import {
  IconBrandGoogleFilled,
  IconBrandLinkedin,
  IconBrandLinkedinFilled,
} from "@tabler/icons-react";
import FormRegister from "@/components/form-register";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Illustration/Info */}
        <div className="hidden lg:block">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">CVScore</span>
            </div>
            <h1 className="text-4xl font-bold text-balance leading-tight">
              Comienza a mejorar tu CV hoy
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Únete a miles de profesionales que han transformado sus
              currículums con nuestra plataforma impulsada por IA.
            </p>
            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-medium">Gratis para comenzar</p>
                  <p className="text-sm text-muted-foreground">
                    Sin tarjeta de crédito requerida
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <div>
                  <p className="font-medium">Análisis ilimitados</p>
                  <p className="text-sm text-muted-foreground">
                    Evalúa todos tus CVs
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-success" />
                </div>
                <div>
                  <p className="font-medium">Resultados instantáneos</p>
                  <p className="text-sm text-muted-foreground">
                    Feedback en tiempo real
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Register Form */}
        <Card className="p-8 bg-card border-border">
          <div className="space-y-6">
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-2xl font-bold">Crear Cuenta</h2>
              <p className="text-muted-foreground">
                Completa tus datos para comenzar
              </p>
            </div>
            <FormRegister />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  O regístrate con
                </span>
              </div>
            </div>

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
            </div>

            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Inicia sesión
              </Link>
            </p>

            <p className="text-xs text-center text-muted-foreground">
              Al registrarte, aceptas nuestros{" "}
              <Link href="#" className="underline hover:text-foreground">
                Términos de Servicio
              </Link>{" "}
              y{" "}
              <Link href="#" className="underline hover:text-foreground">
                Política de Privacidad
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
