"use client"

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, TrendingUp, Eye } from "lucide-react";
import Link from "next/link";
import { CVItem } from "@/type";
import DeleteCvDialog from "./dialogs/delete-cv-dailog";
import { useFetchData } from "@/hooks/fetch-data";

type CVCardProps = CVItem & {
  onDeleted?: (id: string) => void
}

export function CVCard({
  id,
  originalName,
  overallScore,
  analyzedAt,
  status,
  onDeleted,
}: CVCardProps) {
  const { fetchDeleteCv } = useFetchData()

  const handleDelete = async (cvId: string) => {
    const deleted = await fetchDeleteCv(cvId)
    if (deleted) {
      onDeleted?.(cvId)
    }
  }
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="bg-success/10 text-success border-success/20">
            {status}
          </Badge>
        );
      case "PROCESSING":
        return (
          <Badge className="bg-accent/10 text-accent border-accent/20">
            {status}
          </Badge>
        );
      case "ERROR":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20">
            {status}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-muted/10 text-muted border-muted/20">
            Pendiente
          </Badge>
        );
    }
  };

  const getBarColor = (score: number) => {
    if (score >= 85) return "bg-success"
    if (score >= 70) return "bg-accent"
    return "bg-warning"
  }

  const barColor = getBarColor(overallScore ?? 0)

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-1 truncate group-hover:text-primary transition-colors">
              {originalName}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {analyzedAt
                  ? `Analizado el ${formatDate(analyzedAt)}`
                  : `Esperando análisis`}
              </span>
            </div>
          </div>
        </div>
        {getStatusBadge(status)}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Puntuación</span>
        </div>
        {overallScore !== null ? (
          <div className={`text-3xl font-bold ${(overallScore ?? 0) >= 80 ? "text-success" : (overallScore ?? 0) >= 50 ? "text-accent" : "text-warning"}`}>
            {overallScore !== null ? overallScore : "--"}
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        ) : (
          <div className="text-3xl font-bold text-muted-foreground">--</div>
        )}
      </div>

      <div className="h-2 bg-secondary rounded-full overflow-hidden mb-4">
        <div
          className={`h-full ${barColor} transition-all`}
          style={{ width: `${overallScore !== null ? overallScore : 0}%` }}
        />
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <Link href={`/dashboard/cv/${id}`} className="w-full">
          <Button className="w-full bg-transparent" variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Ver Análisis Completo
          </Button>
        </Link>
        <div className="w-15 flex items-center justify-end">
          <DeleteCvDialog
            handleDelete={handleDelete}
            id={id}
          />
        </div>
      </div>
    </Card>
  );
}
