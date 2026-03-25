import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { getJobById } from "@/lib/query";
import AdviceCard from "@/components/jobs/advices-card";
import WeaknessStrengthSuggestionCard from "@/components/jobs/weakness-strengths-card";
import MetricCard from "@/components/jobs/metric-card";
type DetailPageProps = {
  params: {
    id: string;
  };
};
function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}
function toScore(value: number | null | undefined): number {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}
function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-700";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
}
function verdictLabel(shouldApply: boolean | null | undefined) {
  return shouldApply ? "Deberías aplicar" : "Aplicación con cautela";
}
export default async function JobDetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) {
    notFound();
  }
  const analysis = job.analyses[0] ?? null;
  const matchScore = toScore(analysis?.matchScore);
  const overallScore = toScore(analysis?.overallScore);
  const skillsMatch = toScore(analysis?.skillsMatch);
  const experienceMatch = toScore(analysis?.experienceMatch);
  const educationMatch = toScore(analysis?.educationMatch);
  const keywordsMatch = toScore(analysis?.keywordsMatch);
  const matchedSkills = toStringArray(analysis?.matchedSkills);
  const missingSkills = toStringArray(analysis?.missingSkills);
  const matchedKeywords = toStringArray(analysis?.matchedKeywords);
  const missingKeywords = toStringArray(analysis?.missingKeywords);
  const strengths = toStringArray(analysis?.strengths);
  const weaknesses = toStringArray(analysis?.weaknesses);
  const suggestions = toStringArray(analysis?.suggestions);
  const applicationTips = toStringArray(analysis?.applicationTips);
  const coverLetterTips = toStringArray(analysis?.coverLetterTips);
  const createdAtLabel = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "long",
  }).format(job.createdAt);
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/dashboard/jobs" className="hover:text-foreground">
            Mis ofertas
          </Link>
          <span>/</span>
          <span className="font-medium text-foreground">{job.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="text-muted-foreground">
            <Link href="/dashboard/jobs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/jobs/upload">Analizar otro CV</Link>
          </Button>
        </div>
      </div>
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-10">
        <div className="space-y-5 lg:col-span-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{job.status}</Badge>
            {job.remote ? <Badge>Remoto</Badge> : null}
            {job.experienceLevel ? (
              <Badge variant="outline">{job.experienceLevel}</Badge>
            ) : null}
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
              {job.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {job.company || "Empresa no especificada"} • {job.position}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Analizado el {createdAtLabel}
            </p>
          </div>
          {job.cv ? (
            <Card className="border-border/50 bg-card p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                CV base utilizado
              </p>
              <p className="mt-1 font-semibold text-foreground">
                {job.cv.originalName}
              </p>
            </Card>
          ) : null}
        </div>
        <div className="lg:col-span-4">
          <Card className="border-border/40 bg-card p-8 text-center shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Match Score
            </p>
            <p className={`mt-3 text-6xl font-black ${scoreColor(matchScore)}`}>
              {matchScore}
            </p>
            <p className="text-sm text-muted-foreground">
              {analysis?.scoreGrade || "-"}
            </p>
            <div className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              {verdictLabel(analysis?.shouldApply)}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Puntuacion global del analisis: <strong>{overallScore}%</strong>
            </p>
          </Card>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          skillsMatch={skillsMatch}
          experienceMatch={experienceMatch}
          educationMatch={educationMatch}
          keywordsMatch={keywordsMatch}
        ></MetricCard>
      </section>
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          <Card className="border-border/40 bg-card p-6">
            <h2 className="mb-5 text-2xl font-extrabold tracking-tight">
              Analisis de competencias
            </h2>
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
                  Skills encontradas
                </p>
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.length > 0 ? (
                    matchedSkills.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-emerald-50 text-emerald-700"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Sin datos
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
                  Skills faltantes
                </p>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.length > 0 ? (
                    missingSkills.map((skill) => (
                      <Badge key={skill} className="bg-amber-50 text-amber-700">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Sin skills faltantes
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
          <Card className="border-border/40 bg-card p-6">
            <h3 className="mb-4 text-xl font-extrabold tracking-tight">
              Keywords del sector
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Encontradas
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  {matchedKeywords.length > 0 ? (
                    matchedKeywords.map((keyword) => (
                      <li key={keyword} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        {keyword}
                      </li>
                    ))
                  ) : (
                    <li className="text-muted-foreground">Sin datos</li>
                  )}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Faltantes
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  {missingKeywords.length > 0 ? (
                    missingKeywords.map((keyword) => (
                      <li key={keyword} className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        {keyword}
                      </li>
                    ))
                  ) : (
                    <li className="text-muted-foreground">
                      Sin keywords faltantes
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </Card>
        </div>
        <div className="space-y-8 lg:col-span-5">
          <WeaknessStrengthSuggestionCard
            strengths={strengths}
            weakness={weaknesses}
            suggestions={suggestions}
          ></WeaknessStrengthSuggestionCard>
          <AdviceCard
            title="Consejos para aplicar"
            applicationTips={applicationTips}
            subjection="No hay consejos especificos para aplicar."
          ></AdviceCard>
          <AdviceCard
            title="Consejos para cover letter"
            applicationTips={coverLetterTips}
            subjection="No hay consejos especificos para cover letter."
          ></AdviceCard>
        </div>
      </section>
    </div>
  );
}
