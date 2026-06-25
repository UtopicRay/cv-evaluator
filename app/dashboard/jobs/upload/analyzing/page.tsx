"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { jobAnalysisProgressSteps, simulateJobAnalysisProgress } from "@/lib/jobs/simulate-analysis-progress"
import { Brain, CheckCircle2, Circle, LoaderCircle } from "lucide-react"
import { toast } from "sonner"

const JOB_UPLOAD_DRAFT_KEY = "job-upload-draft"

type JobDraft = {
  userId: string
  title: string
  description: string
  position: string
  company?: string | null
  remote?: boolean
  cvId?: string | null
  experienceLevel?: string | null
  jobId?: string | null
}

function isStepDone(stepThreshold: number, progress: number) {
  return progress >= stepThreshold
}

export default function JobAnalyzingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [isPersisting, setIsPersisting] = useState(false)

  const progressWidth = useMemo(() => `${Math.min(progress, 100)}%`, [progress])

  useEffect(() => {
    const rawDraft = sessionStorage.getItem(JOB_UPLOAD_DRAFT_KEY)
    if (!rawDraft) {
      toast.error("No se encontraron datos para analizar")
      router.replace("/dashboard/jobs/upload")
      return
    }

    const cleanup = simulateJobAnalysisProgress({
      onProgress: setProgress,
      onStepChange: setActiveStep,
      onComplete: async () => {
        try {
          setIsPersisting(true)
          const draft = JSON.parse(rawDraft) as JobDraft

          const response = await fetch("/api/jobs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(draft),
          })

          const payload = await response.json()
          if (!response.ok) {
            throw new Error(payload.message || "No se pudo crear la oferta")
          }

          sessionStorage.removeItem(JOB_UPLOAD_DRAFT_KEY)
          toast.success("Oferta analizada y creada")
          router.replace("/dashboard/jobs")
        } catch (error) {
          console.error(error)
          toast.error(
            error instanceof Error
              ? error.message
              : "No se pudo completar el analisis",
          )
          router.replace("/dashboard/jobs/upload")
        } finally {
          setIsPersisting(false)
        }
      },
    })

    return () => cleanup()
  }, [router])

  return (
      <div className="relative mx-auto flex min-h-[calc(100vh-14rem)] w-full max-w-5xl items-center justify-center overflow-hidden px-4">
        <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-4 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
          <div className="relative mb-10 flex h-28 w-28 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/15" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-[#0070ea] text-white shadow-lg">
              <Brain className="h-8 w-8" />
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Analizando oferta con IA...
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Estamos comparando tu perfil con los requisitos del puesto para encontrar tu Match Score.
          </p>

          <div className="mt-14 w-full max-w-lg">
            <div className="mb-3 flex items-end justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                Evaluacion en curso
              </span>
              <span className="text-sm font-black text-foreground">{progress}%</span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: progressWidth }}
              />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {jobAnalysisProgressSteps.map((step, index) => {
                const completed = isStepDone(step.threshold, progress)
                const isCurrent = index === activeStep && !completed

                return (
                  <Card
                    key={step.id}
                    className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 shadow-sm"
                  >
                    {completed ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : isCurrent ? (
                      <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-xs font-semibold text-muted-foreground">
                      {step.label}
                    </span>
                  </Card>
                )
              })}
            </div>

            {isPersisting ? (
              <p className="mt-6 text-sm font-medium text-muted-foreground">
                Guardando los resultados del analisis...
              </p>
            ) : null}
          </div>
        </div>
      </div>
  )
}
