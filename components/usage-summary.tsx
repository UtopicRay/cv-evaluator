import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

 function UsageSummary() {
  const cvsUsed = 2
  const cvsTotal = 3
  const daysUntilReset = 15
  const usagePercentage = (cvsUsed / cvsTotal) * 100

  return (
    <Card className="p-6 w-full">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Tu Plan Actual</h3>
            <Badge variant="secondary" className="font-medium">
              Plan Free
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">Gestiona tus análisis de CV y mejora tu perfil profesional</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">CVs analizados</span>
            <span className="font-semibold">
              {cvsUsed} de {cvsTotal}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${usagePercentage}%` }} />
          </div>
          <p className="text-xs text-muted-foreground">Se reinicia en {daysUntilReset} días</p>
        </div>

        <div className="pt-4 border-t border-border">
          <Button className="w-full" variant="default">
            <Sparkles className="mr-2 h-4 w-4" />
            Actualizar Plan
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-3">
            Desbloquea análisis ilimitados y funciones premium
          </p>
        </div>
      </div>
    </Card>
  )
}
export default UsageSummary