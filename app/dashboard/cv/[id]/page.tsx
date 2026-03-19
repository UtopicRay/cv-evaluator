import CVAnalyzeCard from "@/components/cv/cv-analaze-card"
import CVKeywords from "@/components/cv/cv-keywords"
import CVSection from "@/components/cv/cv-section"
import { CVWeaknessStrengthCard } from "@/components/cv/cv-weakness-strengths"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { gradeMeta } from "@/lib/cv/utils"
import { getCv } from "@/lib/query"
import { AlertCircle, ArrowLeft, CheckCircle2, Download } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"



function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? (value as string[]) : []
}

function formatDate(value: Date | null) {
  if (!value) return ""
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value)
}



export default async function CVDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const cv = await getCv(id)

  if (!cv) {
    notFound()
  }

  const analysis = cv.analyses[0]
  const strengths = toStringArray(analysis?.strengths)
  const weaknesses = toStringArray(analysis?.weaknesses)
  const suggestions = toStringArray(analysis?.suggestions)
  const detectedSkills = toStringArray(analysis?.detectedSkills)
  const missingKeywords = toStringArray(analysis?.missingKeywords)
  const scoreGrade = cv.scoreGrade ?? "C"
  const gradeInfo = gradeMeta[scoreGrade] ?? gradeMeta.C

  const scoreItems = [
    { label: "Experiencia", value: analysis?.experienceScore },
    { label: "Educación", value: analysis?.educationScore },
    { label: "Habilidades", value: analysis?.skillsScore },
    { label: "Formato", value: analysis?.formatScore },
    { label: "Palabras clave", value: analysis?.keywordsScore },
    { label: "ATS", value: analysis?.atsScore },
  ].filter((item) => typeof item.value === "number")

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">{cv.originalName}</h1>
            {cv.analyzedAt && (
              <p className="text-sm text-muted-foreground">
                Analizado el {formatDate(cv.analyzedAt)}
              </p>
            )}
          </div>
          {cv.fileUrl ? (
            <Button asChild variant="outline" size="sm">
              <a href={cv.fileUrl} target="_blank" rel="noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Descargar
              </a>
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">Archivo no disponible.</p>
          )}
        </div>

        {!analysis ? (
          <Card className="p-8 bg-card border-border">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Estamos generando tu resultado</h2>
              <p className="text-sm text-muted-foreground">
                Tu CV se subio correctamente. Vuelve en unos minutos para ver el analisis.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard">Volver al dashboard</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-8 bg-gradient-to-br from-success/10 to-primary/10 border-success/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="h-32 w-32 rounded-full border-8 border-success/20 flex items-center justify-center bg-background">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-success">{Math.round(cv.overallScore ?? 0)}</div>
                    <div className="text-xs text-muted-foreground">/ 100</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <Badge className={`mb-3 ${gradeInfo.badgeClass}`}>
                  {gradeInfo.label}
                </Badge>
                <h2 className="text-2xl font-bold mb-2">{gradeInfo.title}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Revisa las recomendaciones para optimizar el impacto de tu curriculum.
                </p>
              </div>
            </div>
          </Card>
        )}

        {analysis && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h3 className="text-lg font-semibold">Fortalezas</h3>
            </div>
            {strengths.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin fortalezas registradas.</p>
            ) : (
              <div className="space-y-3">
                {strengths.map((strength, index) => (
                  <CVWeaknessStrengthCard key={index} strength={strength} color="bg-success" />
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-warning" />
              <h3 className="text-lg font-semibold">Áreas de Mejora</h3>
            </div>
            {weaknesses.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin observaciones registradas.</p>
            ) : (
              <div className="space-y-3">
                {weaknesses.map((improvement, index) => (
                  <CVWeaknessStrengthCard key={index} strength={improvement} color="bg-warning" />
                ))}
              </div>
            )}
          </Card>
        </div>
        )}

        {analysis && scoreItems.length > 0 && (
          <CVAnalyzeCard scoreItems={scoreItems} />
        )}

        {analysis && suggestions.length > 0 && (
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">Recomendaciones</h3>
            <div className="space-y-3">
              {suggestions.slice(0, 5).map((suggestion, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {analysis && (detectedSkills.length > 0 || missingKeywords.length > 0) && (
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">Keywords</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <CVKeywords skill={detectedSkills} variant="secondary" title="Detectadas" />
              <CVKeywords skill={missingKeywords} variant="outline" title="Faltantes" />
            </div>
          </Card>
        )}

        {analysis && cv.sections.length > 0 && (
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">Secciones del CV</h3>
            <div className="space-y-4">
              {cv.sections.map((section) => (
                <CVSection key={section.id} section={section} />
              ))}
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
