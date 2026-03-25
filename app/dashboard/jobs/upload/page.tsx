import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { WandSparkles } from "lucide-react"
import JobUploadForm from "@/components/forms/job-upload"


export default function AddJobPage() {

  return (
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <aside className="w-full shrink-0 space-y-8 lg:w-72">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Espacio de trabajo
              </p>
              <h1 className="text-2xl font-black leading-none tracking-tight text-foreground">
                Arquitectura de vacante
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Define los parametros para activar el motor de matching con IA
                para tu dossier de inteligencia editorial.
              </p>
            </div>

            <Card className="space-y-4 rounded-xl border-0 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 text-emerald-700">
                <WandSparkles className="h-4 w-4" />
                <span className="text-xs font-bold tracking-wider">
                  MOTOR DE MATCHING ACTIVO
                </span>
              </div>
              <p className="text-[11px] leading-tight text-muted-foreground">
                El sistema analizara la intencion semantica, la jerarquia de
                experiencia y la alineacion editorial contra el CV base seleccionado.
              </p>
            </Card>
          </aside>

          <section className="w-full flex-1">
            <JobUploadForm></JobUploadForm>
          </section>  
        </div>
      </div>
  )
}
