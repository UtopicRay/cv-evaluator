"use client";
import ButtonSocialAuth from "@/components/button-social-auth";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import Link from "next/link";
import {
  IconBrandGoogleFilled,
  IconBrandLinkedinFilled,
} from "@tabler/icons-react";
import FormRegister from "@/components/form-register";
import LeftSideInfo from "@/components/left-side-info";
import { infoDetails } from "@/const";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Illustration/Info */}
        <LeftSideInfo
          title="Comienza a mejorar tu CV hoy"
          details={infoDetails.slice(0, 3)}
          description="Únete a miles de profesionales que han transformado sus currículums
          con nuestra plataforma impulsada por IA."
        />

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

            {/* <div className="grid grid-cols-2 gap-3">
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
