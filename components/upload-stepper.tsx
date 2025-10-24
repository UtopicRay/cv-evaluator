import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadStepperProps {
  currentStep: number
}

const steps = [
  { number: 1, title: "Información del CV" },
  { number: 2, title: "Subir archivo" },
  { number: 3, title: "Análisis" },
]

export function UploadStepper({ currentStep }: UploadStepperProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2 sm:gap-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all",
                  currentStep > step.number
                    ? "bg-primary border-primary text-primary-foreground"
                    : currentStep === step.number
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-background border-border text-muted-foreground",
                )}
              >
                {currentStep > step.number ? (
                  <Check className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <span className="text-sm sm:text-base font-semibold">{step.number}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs sm:text-sm font-medium text-center max-w-[80px] sm:max-w-none",
                  currentStep >= step.number ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-12 sm:w-24 h-0.5 mx-2 sm:mx-4 mb-8 transition-all",
                  currentStep > step.number ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
