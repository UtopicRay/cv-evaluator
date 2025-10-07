import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Share2, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function CVDetailPage() {
  const score = 92
  const cvName = "CV_Marketing_Manager.pdf"

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">{cvName}</h1>
            <p className="text-sm text-muted-foreground">Analizado el 15 de enero, 2025</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Compartir
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Descargar
            </Button>
          </div>
        </div>

        {/* Score Card */}
        <Card className="p-8 bg-gradient-to-br from-success/10 to-primary/10 border-success/20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="h-32 w-32 rounded-full border-8 border-success/20 flex items-center justify-center bg-background">
                <div className="text-center">
                  <div className="text-4xl font-bold text-success">{score}</div>
                  <div className="text-xs text-muted-foreground">/ 100</div>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <Badge className="mb-3 bg-success/10 text-success border-success/20">Excelente</Badge>
              <h2 className="text-2xl font-bold mb-2">¡Tu CV está en excelente forma!</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tu currículum tiene una estructura sólida y contenido profesional. Revisa las recomendaciones a
                continuación para alcanzar la perfección.
              </p>
            </div>
          </div>
        </Card>

        {/* Analysis Sections */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Strengths */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h3 className="text-lg font-semibold">Fortalezas</h3>
            </div>
            <div className="space-y-3">
              {[
                "Estructura clara y profesional",
                "Experiencia bien detallada",
                "Uso efectivo de palabras clave",
                "Formato consistente y limpio",
                "Logros cuantificables",
              ].map((strength, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-success" />
                  </div>
                  <p className="text-sm">{strength}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Areas to Improve */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-warning" />
              <h3 className="text-lg font-semibold">Áreas de Mejora</h3>
            </div>
            <div className="space-y-3">
              {[
                "Agregar más certificaciones relevantes",
                "Incluir enlaces a portfolio o LinkedIn",
                "Expandir sección de habilidades técnicas",
              ].map((improvement, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-warning" />
                  </div>
                  <p className="text-sm">{improvement}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Detailed Scores */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-6">Análisis Detallado</h3>
          <div className="space-y-6">
            {[
              { category: "Estructura y Formato", score: 95, color: "success" },
              { category: "Contenido y Relevancia", score: 90, color: "success" },
              { category: "Palabras Clave", score: 88, color: "success" },
              { category: "Experiencia Profesional", score: 94, color: "success" },
              { category: "Educación y Certificaciones", score: 85, color: "accent" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-muted-foreground">{item.score}/100</span>
                </div>
                <Progress value={item.score} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4">Recomendaciones Específicas</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <div>
                <p className="font-medium mb-1">Agrega certificaciones recientes</p>
                <p className="text-sm text-muted-foreground">
                  Incluir certificaciones de marketing digital o analytics aumentará tu credibilidad y score en un 5-8%.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/5 border border-accent/10">
              <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-accent">2</span>
              </div>
              <div>
                <p className="font-medium mb-1">Incluye enlaces profesionales</p>
                <p className="text-sm text-muted-foreground">
                  Añade tu perfil de LinkedIn y portfolio para dar más contexto sobre tu trabajo y proyectos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-success/5 border border-success/10">
              <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-success">3</span>
              </div>
              <div>
                <p className="font-medium mb-1">Expande habilidades técnicas</p>
                <p className="text-sm text-muted-foreground">
                  Menciona herramientas específicas como Google Analytics, HubSpot, o Salesforce que hayas utilizado.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
