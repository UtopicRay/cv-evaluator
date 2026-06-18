"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Eye } from "lucide-react";
import Link from "next/link";
import { CVItem } from "@/type";
import DeleteDialog from "./dialogs/delete-dailog";
import { useFetchData } from "@/hooks/fetch-data";
import { deleteCvDialogMessages } from "@/const/messages";
import { useRouter } from "next/navigation";

type CVCardProps = CVItem & {
  onDeleted?: (id: string) => void;
};

export function CVCard({
  id,
  originalName,
  overallScore,
  analyzedAt,
  status,
  onDeleted,
}: CVCardProps) {
  const { fetchDeleteCv } = useFetchData();
  const router = useRouter();

  const handleDelete = async (cvId: string) => {
    const deleted = await fetchDeleteCv(cvId);
    if (deleted) {
      onDeleted?.(cvId);
    }
    router.refresh();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="rounded-full border border-success/20 bg-success/10 px-2.5 py-0.5 text-xs font-bold text-success">
            Analizado
          </Badge>
        );
      case "PROCESSING":
        return (
          <Badge className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 text-xs font-bold text-accent">
            En proceso
          </Badge>
        );
      case "ERROR":
        return (
          <Badge className="rounded-full border border-warning/20 bg-warning/10 px-2.5 py-0.5 text-xs font-bold text-warning">
            Error
          </Badge>
        );
      default:
        return (
          <Badge className="rounded-full border border-muted/20 bg-muted/10 px-2.5 py-0.5 text-xs font-bold text-muted-foreground">
            Pendiente
          </Badge>
        );
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="group w-full rounded-xl border border-transparent bg-card/80 p-6 transition-all hover:shadow-2xl hover:shadow-primary/10">
      <div className="flex w-full flex-col items-start gap-6 md:flex-row md:items-center">
        <div className="flex w-full min-w-0 flex-1 items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-bold text-foreground">
              {originalName}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {analyzedAt ? formatDate(analyzedAt) : "Esperando análisis"}
              </span>
              {getStatusBadge(status)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 md:px-8 md:border-l md:border-border">
          <div className="text-center">
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-tight text-muted-foreground">
              Match Score
            </span>
            {overallScore !== null ? (
              <span
                className={`text-2xl font-black ${(overallScore ?? 0) >= 80 ? "text-success" : (overallScore ?? 0) >= 50 ? "text-accent" : "text-warning"}`}
              >
                {overallScore}
                <span className="text-xs text-muted-foreground">/100</span>
              </span>
            ) : (
              <span className="text-2xl font-black text-muted-foreground">
                --
              </span>
            )}
          </div>
        </div>

        <div className="flex w-full items-center gap-3 md:w-auto">
          <Link href={`/dashboard/cv/${id}`} className="w-full md:w-auto">
            <Button className="w-full rounded-lg bg-secondary/40 px-5 py-2.5 text-sm font-bold text-foreground hover:bg-primary hover:text-primary-foreground">
              <Eye className="mr-2 h-4 w-4" />
              Ver Análisis Completo
            </Button>
          </Link>
          <div className="flex items-center justify-end">
            <DeleteDialog
              title={deleteCvDialogMessages.title}
              description={deleteCvDialogMessages.description}
              handleDelete={handleDelete}
              id={id}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
