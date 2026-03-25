"use client";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Info } from "lucide-react";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { experienceLevels } from "@/const";
import { useUserContext } from "@/context/user-context";
import { useFetchData } from "@/hooks/fetch-data";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const fomSchema = z.object({
  title: z.string().min(3, "El titulo del puesto es obligatorio"),
  position: z.string().min(2, "El nivel del puesto es obligatorio"),
  company: z.string().optional(),
  remote: z.boolean(),
  experienceLevel: z.string().min(1, "El nivel de experiencia es obligatorio"),
  bestCvId: z.string().optional(),
  description: z.string().min(20, "La descripcion del puesto es obligatoria"),
});

const JOB_UPLOAD_DRAFT_KEY = "job-upload-draft";

function JobUploadForm() {
  const { user } = useUserContext();
  const router = useRouter();
  const [cvs, setCvs] = useState<{ id: string; originalName: string }[]>([]);
  const { fecthCvs, loading } = useFetchData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof fomSchema>>({
    resolver: zodResolver(fomSchema),
    defaultValues: {
      title: "",
      position: "",
      company: "",
      remote: false,
      experienceLevel: "",
      bestCvId: "",
      description: "",
    },
  });
  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;

    const loadCvs = async () => {
      const data = await fecthCvs({ userId: user.id });
      if (isMounted && data) {
        setCvs(data);
      }
    };

    loadCvs();

    return () => {
      isMounted = false;
    };
  }, [fecthCvs, user?.id]);

  function onSubmit(data: z.infer<typeof fomSchema>) {
    if (!user?.id) {
      toast.error("No se pudo identificar al usuario");
      return;
    }

    setIsSubmitting(true);

    try {
      sessionStorage.setItem(
        JOB_UPLOAD_DRAFT_KEY,
        JSON.stringify({
          userId: user.id,
          title: data.title.trim(),
          position: data.position.trim(),
          company: data.company?.trim() || null,
          remote: data.remote,
          cvId: data.bestCvId && data.bestCvId !== "none" ? data.bestCvId : null,
          experienceLevel: data.experienceLevel,
          description: data.description.trim(),
        }),
      );

      router.push("/dashboard/jobs/upload/analyzing");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo iniciar el analisis");
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="rounded-xl border-0 bg-card p-6 shadow-[0_32px_64px_rgba(0,0,0,0.02)] md:p-10">
      <div className="border-b border-border/60 pb-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Nueva oportunidad
        </h2>
        <p className="mt-1 text-muted-foreground">
          Completa los campos para iniciar el analisis de inteligencia.
        </p>
      </div>
      <form
        id="form-job-upload"
        className="space-y-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-demo-title"
                      className="inputLabel"
                    >
                      Titulo del puesto
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ej: Estratega de Contenido Senior"
                      autoComplete="off"
                      className="inputField"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="space-y-2">
              <Controller
                name="position"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="position" className="inputLabel">
                      Nivel del puesto
                    </FieldLabel>
                    <Input
                      {...field}
                      id="position"
                      placeholder="Ej: Lead / IC4"
                      className="inputField"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <Controller
                name="company"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="company" className="inputLabel">
                      Empresa
                    </FieldLabel>
                    <Input
                      {...field}
                      id="company"
                      placeholder="Nombre de la empresa"
                      className="inputField"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex h-12 items-center justify-between rounded-lg bg-muted/70 px-4">
              <Controller
                name="remote"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <span className="text-sm font-semibold text-muted-foreground">
                      Puesto remoto
                    </span>
                    <Switch
                      id="form-remote"
                      name={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    />
                  </>
                )}
              />
            </div>
          </div>

          <div className="space-y-2 grid grid-cols-1 items-end gap-8 md:grid-cols-2 ">
            <Controller
              name="experienceLevel"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="experienceLevel" className="inputLabel">
                    Nivel de experiencia
                  </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value || "none"}
                      onValueChange={(value) =>
                        field.onChange(value === "none" ? "" : value)
                      }
                    >
                      <SelectTrigger
                      id="form-rhf-select-experienceLevel"
                      aria-invalid={fieldState.invalid}
                      className="inputField flex-row justify-between"
                    >
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {experienceLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="bestCvId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="bestCvId" className="inputLabel">
                    CV base para comparar
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-bestCvId"
                      aria-invalid={fieldState.invalid}
                      className="inputField"
                      disabled={loading || cvs.length === 0}
                      >
                        <SelectValue placeholder="Selecciona un perfil de alto rendimiento..." />
                      </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="none">Sin CV base</SelectItem>
                       {cvs.map((cv) => (
                        <SelectItem key={cv.id} value={cv.id}>
                          {cv.originalName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="space-y-2">
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description" className="inputLabel">
                    Descripcion del puesto y requisitos clave
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Describe la esencia del rol y los requisitos clave..."
                    className="inputField h-32 resize-none"
                  ></Textarea>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </form>
      <div className="flex flex-col items-center justify-between gap-6 border-t border-border/40 pt-6 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4 text-primary" />
          <span>El autoguardado esta activo para tus borradores.</span>
        </div>
        <Button
          type="submit"
          form="form-job-upload"
          disabled={isSubmitting}
          className="h-12 w-full rounded-lg bg-gradient-to-br from-primary to-[#0070ea] px-10 font-bold text-primary-foreground shadow-[0_12px_24px_rgba(0,89,187,0.2)] md:w-auto"
        >
          {isSubmitting ? "Validando..." : "Analizar Oferta"}
        </Button>
      </div>
    </Card>
  );
}

export default JobUploadForm;
