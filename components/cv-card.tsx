import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"

interface CVCardProps {
  cv: {
    id: number
    name: string
    score: number
    date: string
    status: "excellent" | "good" | "needs-improvement"
  }
}

export function CVCard({ cv }: CVCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success"
    if (score >= 70) return "text-accent"
    return "text-warning"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-success/10 text-success border-success/20">Excelente</Badge>
      case "good":
        return <Badge className="bg-accent/10 text-accent border-accent/20">Bueno</Badge>
      case "needs-improvement":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Mejorable</Badge>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-1 truncate group-hover:text-primary transition-colors">{cv.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(cv.date)}</span>
            </div>
          </div>
        </div>
        {getStatusBadge(cv.status)}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Puntuación</span>
        </div>
        <div className={`text-3xl font-bold ${getScoreColor(cv.score)}`}>
          {cv.score}
          <span className="text-sm text-muted-foreground">/100</span>
        </div>
      </div>

      <div className="h-2 bg-secondary rounded-full overflow-hidden mb-4">
        <div
          className={`h-full ${cv.score >= 85 ? "bg-success" : cv.score >= 70 ? "bg-accent" : "bg-warning"}`}
          style={{ width: `${cv.score}%` }}
        />
      </div>

      <Link href={`/dashboard/cv/${cv.id}`}>
        <Button className="w-full bg-transparent" variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          Ver Análisis Completo
        </Button>
      </Link>
    </Card>
  )
}
