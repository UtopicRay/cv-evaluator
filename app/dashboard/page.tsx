"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/user-context";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Circle,
  Lightbulb,
  Plus,
  Sparkles,
  Star,
  TrendingUp,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";

const recentActivity = [
  {
    id: "google",
    company: "Google",
    role: "Senior Cloud Architect",
    time: "Hace 2 horas",
    match: 92,
  },
  {
    id: "amazon",
    company: "Amazon",
    role: "Product Manager",
    time: "Ayer",
    match: 65,
  },
  {
    id: "tesla",
    company: "Tesla",
    role: "Frontend Engineer",
    time: "12 May",
    match: 42,
  },
]

function getMatchColor(match: number) {
  if (match >= 80) return "text-success"
  if (match >= 60) return "text-muted-foreground"
  return "text-destructive"
}

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useUserContext()

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
            Hola, {user?.name || "Alejandro"}
          </h1>
          <p className="text-base text-muted-foreground lg:text-lg">
            Tu dashboard editorial esta listo para la siguiente revision.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          <Card className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              CVs Analizados
            </p>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-black leading-none">12</span>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Upload className="h-5 w-5" />
              </div>
            </div>
          </Card>

          <Card className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Puntuacion Media
            </p>
            <div className="flex items-end justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black leading-none text-success">78</span>
                <span className="font-medium text-muted-foreground">/100</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10 text-success">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </Card>

          <Card className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Mejor Match
            </p>
            <div className="flex items-end justify-between gap-3">
              <span className="text-lg font-bold leading-tight text-foreground">
                Senior Software Engineer
              </span>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/60 text-muted-foreground">
                <Star className="h-5 w-5" />
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <Card className="relative overflow-hidden rounded-xl border border-border/60 bg-card p-8 shadow-sm">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Comienza un nuevo analisis
                  </h2>
                  <p className="max-w-xl text-muted-foreground">
                    Sube tu CV o pega el enlace de la oferta para recibir una evaluacion instantanea basada en IA.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <button
                    type="button"
                    className="group flex min-h-52 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 text-center transition hover:border-primary/50 hover:bg-primary/5"
                    onClick={() => router.push("/dashboard/upload")}
                  >
                    <Upload className="mb-3 h-8 w-8 text-muted-foreground transition group-hover:text-primary" />
                    <p className="text-sm font-bold text-foreground">Subir Archivo</p>
                    <p className="mt-1 text-xs text-muted-foreground">PDF, DOCX (Max. 5MB)</p>
                  </button>

                  <div className="space-y-4">
                    <div className="rounded-lg border border-border/60 bg-muted/40 p-4">
                      <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Enlace de la Oferta
                      </label>
                      <Input
                        placeholder="https://linkedin.com/jobs/..."
                        className="border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
                      />
                    </div>
                    <Button
                      size="lg"
                      className="w-full font-bold"
                      onClick={() => router.push("/dashboard/upload")}
                    >
                      Analizar Ahora
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <section className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-foreground">Actividad Reciente</h3>
                <Button
                  variant="ghost"
                  className="px-0 text-primary hover:text-primary"
                  onClick={() => router.push("/dashboard/cv")}
                >
                  Ver todo
                </Button>
              </div>

              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <Card
                    key={item.id}
                    className="group rounded-xl border border-border/50 bg-card p-4 transition hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted font-bold text-muted-foreground">
                          {item.company[0]}
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{item.company}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.role} - {item.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                            Match
                          </p>
                          <p className={`text-lg font-black ${getMatchColor(item.match)}`}>
                            {item.match}%
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <Card className="relative overflow-hidden rounded-xl border-0 bg-primary p-8 text-primary-foreground shadow-lg">
              <Lightbulb className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 text-white/20" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-200" />
                  <p className="text-xs font-bold uppercase tracking-[0.15em]">IA Insights</p>
                </div>

                <p className="text-lg font-medium leading-relaxed">
                  "Tu seccion de experiencia podria destacar mas logros cuantificables."
                </p>

                <Button
                  variant="secondary"
                  className="border border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  Ver recomendacion completa
                </Button>
              </div>
            </Card>

            <Card className="rounded-xl border border-border/50 bg-muted/40 p-8">
              <h4 className="mb-4 font-bold text-foreground">Estado del Perfil</h4>

              <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-4/5 rounded-full bg-primary" />
              </div>

              <p className="mb-6 text-sm text-muted-foreground">
                Tu perfil esta al 80%. Completa la seccion de proyectos para alcanzar el nivel experto.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Habilidades validadas
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Historial laboral completo
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Circle className="h-4 w-4" />
                  Anadir 3 proyectos clave
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden rounded-xl border border-border/50">
              <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/50 to-success/20 p-6">
                <div className="flex h-full w-full items-end justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Inteligencia editorial
                    </p>
                    <p className="mt-2 text-xl font-bold text-foreground">Potencia tu CV</p>
                  </div>
                  <div className="rounded-full bg-card/80 p-3 backdrop-blur-sm">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
            </Card>

            <Button
              size="lg"
              className="w-full font-bold"
              onClick={() => router.push("/dashboard/upload")}
            >
              <Plus className="mr-2 h-5 w-5" />
              Nuevo Analisis
            </Button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}
