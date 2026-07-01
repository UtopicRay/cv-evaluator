"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";

const signInSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email("Correo electrónico inválido")
      .max(254, "Correo electrónico demasiado largo"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(72, "La contraseña es demasiado larga"),
  })
  .strict()

export default function LoginForm() {
  const searchParams = useSearchParams()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const toastId = toast.loading("Procesando inicio de sesión...")

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Credenciales inválidas", { id: toastId })
        return
      }

      toast.success("Inicio de sesión correcto", { id: toastId })
      const callback = searchParams?.get("callbackUrl") || "/dashboard"
      window.location.href = callback
    } catch {
      toast.error("No se pudo iniciar sesión", { id: toastId })
    }
  })

  return (
    <Card className="p-8 bg-card border-border">
      <div className="space-y-6">
        <div className="space-y-2 text-center lg:text-left">
          <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
          <p className="text-muted-foreground">
            Ingresa tus credenciales para acceder
          </p>
        </div>

        <form className="space-y-4" id="login-form" onSubmit={onSubmit}>
          <FieldGroup>
            <div className="space-y-2">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="bg-background"
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>

            <div className="space-y-2">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-background"
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Ingresando..." : "Iniciar Sesión"}
            </Button>
          </FieldGroup>
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
  );
}
