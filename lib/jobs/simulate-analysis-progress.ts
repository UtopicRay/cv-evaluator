type ProgressStep = {
  id: string
  label: string
  threshold: number
}

type ProgressCallbacks = {
  onProgress: (value: number) => void
  onStepChange?: (stepIndex: number) => void
  onComplete?: () => void
}

const DEFAULT_STEPS: ProgressStep[] = [
  {
    id: "extract-skills",
    label: "Extrayendo habilidades clave",
    threshold: 34,
  },
  {
    id: "validate-experience",
    label: "Validando Experiencia",
    threshold: 68,
  },
  {
    id: "calculate-match",
    label: "Calculando puntaje de compatibilidad",
    threshold: 100,
  },
]

function getIncrement(progress: number) {
  if (progress < 35) return 1.4
  if (progress < 70) return 1.1
  if (progress < 90) return 0.7
  return 0.3
}

export function simulateJobAnalysisProgress({
  onProgress,
  onStepChange,
  onComplete,
}: ProgressCallbacks) {
  let progress = 0
  let activeStep = 0

  onStepChange?.(activeStep)
  onProgress(progress)

  const interval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(interval)
      onComplete?.()
      return
    }

    progress = Math.min(100, progress + getIncrement(progress))
    const roundedProgress = Math.round(progress)
    onProgress(roundedProgress)

    const nextStep = DEFAULT_STEPS.findIndex(
      (step) => roundedProgress <= step.threshold,
    )

    const stepIndex = nextStep === -1 ? DEFAULT_STEPS.length - 1 : nextStep
    if (stepIndex !== activeStep) {
      activeStep = stepIndex
      onStepChange?.(activeStep)
    }

    if (roundedProgress >= 100) {
      clearInterval(interval)
      onComplete?.()
    }
  }, 120)

  return () => clearInterval(interval)
}

export const jobAnalysisProgressSteps = DEFAULT_STEPS
