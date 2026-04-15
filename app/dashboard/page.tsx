import { DashboardLayout } from "@/components/dashboard-layout";
import HeaderDashboard from "@/components/dashboard/header-dashboard";
import InfoSection from "@/components/dashboard/info-section";
import RecentSection from "@/components/dashboard/recent-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getUser } from "@/lib/fetching/fetch";
import {
  getAverageJobScore,
  getBestMatchJob,
  getHowManyCvUserHas,
  getRecentsJobs,
} from "@/lib/query";
import {
  Lightbulb,
  Sparkles,
  Upload,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getUser();
  const recentActivity = await getRecentsJobs(user?.id || "");
  const countsCv = await getHowManyCvUserHas(user?.id || "");
  const bestMatch = await getBestMatchJob(user?.id || "");
  const puntuacionMedia = await getAverageJobScore(user?.id || "");

  return (
    <DashboardLayout>
      <div className="space-y-8 lg:space-y-10">
        <HeaderDashboard
          title="Panel de control"
          user={user}
          description="Tu dashboard editorial esta listo para la siguiente revision."
        ></HeaderDashboard>

        <InfoSection
          bestMatch={bestMatch}
          countsCv={countsCv}
          puntuacionMedia={puntuacionMedia}
        ></InfoSection>

        <section className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <Card className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm lg:p-8">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Comienza un nuevo analisis
                  </h2>
                  <p className="max-w-xl text-muted-foreground">
                    Sube tu CV o pega el enlace de la oferta para recibir una
                    evaluacion instantanea basada en IA.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Link href="/dashboard/upload" className="w-full">
                    <button
                      type="button"
                      className="group w-full flex min-h-52 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 text-center transition hover:border-primary/50 hover:bg-primary/5"
                    >
                      <Upload className="mb-3 h-8 w-8 text-muted-foreground transition group-hover:text-primary" />
                      <p className="text-sm font-bold text-foreground">
                        Subir Archivo
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        PDF, DOCX (Max. 5MB)
                      </p>
                    </button>
                  </Link>

                  <div className="space-y-4">
                    <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
                      <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Enlace de la Oferta
                      </label>
                      <Input
                        placeholder="https://linkedin.com/jobs/..."
                        className="border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
                      />
                    </div>
                    <Link href="/dashboard/upload">
                      <Button size="lg" className="w-full font-bold">
                        Analizar Ahora
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            <RecentSection recentActivity={recentActivity}></RecentSection>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <Card className="relative overflow-hidden rounded-2xl border-0 bg-primary p-8 text-primary-foreground shadow-lg">
              <Lightbulb className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 text-white/20" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-200" />
                  <p className="text-xs font-bold uppercase tracking-[0.15em]">
                    IA Insights
                  </p>
                </div>

                <p className="text-lg font-medium leading-relaxed">
                  "Tu seccion de experiencia podria destacar mas logros
                  cuantificables."
                </p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
