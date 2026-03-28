import { FileText, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CvList } from "@/components/cv-list";
import { CVItem } from "@/type";
import { getCvsByUserId } from "@/lib/query";
import { getUser } from "@/lib/fetching/fetch";

export default async function CvPage() {
  const user = await getUser();
  const cvs: CVItem[] | { error: string } = user
    ? await getCvsByUserId(user.id)
    : [];
  const hasCvs = Array.isArray(cvs) && cvs.length > 0;

  function getBestScore() {
    if (!hasCvs) return 0;

    return Math.round(
      cvs.reduce((sum, cv) => sum + (cv.overallScore ?? 0), 0) / cvs.length,
    );
  }
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-3">
            Mis CVs Subidos
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Gestiona tu biblioteca de currículums. Cada archivo ha sido
            analizado para maximizar tu impacto profesional.
          </p>
        </div>
        <Link href="/dashboard/upload">
          <Button
            size="lg"
            className="px-6 py-6 text-base font-bold shadow-lg shadow-primary/20"
          >
            <Plus className="mr-2 h-5 w-5" />
            Subir Nuevo CV
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="flex h-32 flex-col justify-between rounded-xl border-none bg-muted/40 p-6">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Total Analizados
          </span>
          <span className="text-3xl font-black text-primary">{cvs.length}</span>
        </Card>
        <Card className="flex h-32 flex-col justify-between rounded-xl border-none bg-muted/40 p-6">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Puntuacion Media
          </span>
          <span
            className={`text-3xl font-bold ${getBestScore() > 80 ? "text-success" : getBestScore() > 50 ? "text-accent" : "text-warning"}`}
          >
            {hasCvs
              ? Math.round(
                  cvs.reduce((sum, cv) => sum + (cv.overallScore ?? 0), 0) /
                    cvs.length,
                )
              : 0}
            <span className="text-sm font-bold text-muted-foreground">
              /100
            </span>
          </span>
        </Card>
        <Card className="flex h-32 flex-col justify-between rounded-xl border-none bg-muted/40 p-6">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Mejor Match
          </span>
          <span className="text-xl font-black text-foreground">
            {hasCvs
              ? cvs.reduce((best, cv) =>
                  (cv.overallScore ?? 0) > (best.overallScore ?? 0) ? cv : best,
                ).originalName
              : "--"}
          </span>
        </Card>
      </div>

      {"error" in cvs && (
        <Card className="rounded-xl border-destructive/40 bg-destructive/10 p-4 text-destructive">
          {cvs.error}
        </Card>
      )}

      {!hasCvs ? (
        <Empty className="rounded-xl border-border bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileText className="h-5 w-5" />
            </EmptyMedia>
            <EmptyTitle>No hay CVs todavía</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <p className="text-sm text-muted-foreground">
              Sube tu primer CV para ver el resultado en tu historial.
            </p>
            <Link href="/dashboard/upload">
              <Button className="font-bold">Subir CV</Button>
            </Link>
          </EmptyContent>
        </Empty>
      ) : (
        <CvList cvs={cvs} />
      )}
    </div>
  );
}
