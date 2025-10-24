"use client"

import { useEffect, useState } from "react"
import { FileText, CheckCircle2, Sparkles, BarChart3 } from "lucide-react"

const analysisSteps = [
  { icon: FileText, text: "Analizando formato del documento", duration: 1500 },
  { icon: Sparkles, text: "Evaluando contenido y estructura", duration: 2000 },
  { icon: BarChart3, text: "Calculando puntuación", duration: 1500 },
  { icon: CheckCircle2, text: "Generando recomendaciones", duration: 1000 },
]

interface AnalyzingAnimationProps {
  onComplete?: () => void
}

export function AnalyzingAnimation({ onComplete }: AnalyzingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    if (currentStep >= analysisSteps.length) {
      const timer = setTimeout(() => {
        onComplete?.()
      }, 500)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, currentStep])
      setCurrentStep((prev) => prev + 1)
    }, analysisSteps[currentStep].duration)

    return () => clearTimeout(timer)
  }, [currentStep, onComplete])

  const progress = ((currentStep + 1) / analysisSteps.length) * 100

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-full w-full mx-4">
        {/* Main Animation Card */}
        <div className="">
          {/* Animated Icon */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Outer rotating ring */}
              <div
                className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin"
                style={{ animationDuration: "3s" }}
              />

              {/* Middle pulsing ring */}
              <div className="absolute inset-2 rounded-full border-4 border-primary/40 animate-pulse" />

              {/* Inner icon */}
              <div className="relative bg-primary/10 rounded-full p-8">
                <FileText className="size-12 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Analizando tu CV</h2>
            <p className="text-muted-foreground">Esto tomará solo unos segundos...</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-center text-muted-foreground">{Math.round(progress)}% completado</p>
          </div>

          {/* Analysis Steps */}
          <div className="space-y-3">
            {analysisSteps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = completedSteps.includes(index)
              const isCurrent = currentStep === index
              const isPending = index > currentStep

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isCurrent ? "bg-primary/10 border border-primary/20" : isCompleted ? "bg-muted/50" : "opacity-40"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 rounded-full p-2 transition-colors ${
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : isCurrent
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Icon className={`h-5 w-5 ${isCurrent ? "animate-pulse" : ""}`} />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isCurrent ? "text-foreground" : isCompleted ? "text-muted-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.text}
                  </span>
                  {isCurrent && (
                    <div className="ml-auto flex gap-1">
                      <div
                        className="h-2 w-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="h-2 w-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="h-2 w-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Fun fact or tip */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <p className="text-xs text-muted-foreground text-center">
              <span className="font-semibold text-foreground">💡 Consejo:</span> Un CV bien estructurado aumenta tus
              posibilidades de pasar filtros ATS en un 60%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
