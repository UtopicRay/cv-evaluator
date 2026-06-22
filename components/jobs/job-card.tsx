"use client"

import React, { useState } from "react";
import { ArrowRight, CalendarDays, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Link from "next/link";
import { Job } from "@/type";

function JobCard({ job, onDelete }: { job: Job; onDelete?: (id: string) => void }) {
  function scoreColor(score: number) {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  }
  function formatAnalysisDate(date: string | Date) {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  }

  const analysis = job.analyses?.[0];
  const matchScore = Math.max(
    0,
    Math.min(100, Math.round(analysis?.matchScore ?? 0)),
  );

  const [isDeleting, setIsDeleting] = useState(false);

  const deleteJobHandler = async () => {
    if (!confirm("¿Eliminar oferta?")) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/jobs/${job.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error deleting job");
      onDelete?.(job.id);
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setIsDeleting(false);
    }
  };
 return (
    <Card className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="mt-0.5 h-8 w-8 shrink-0 rounded-full text-muted-foreground"
            onClick={deleteJobHandler}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <div className="min-w-0">
            <p className="truncate text-xl font-bold text-foreground">
              {job.company || "Empresa no especificada"}
            </p>
            <p className="text-sm text-muted-foreground">{job.title}</p>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" />
              Analizado el {formatAnalysisDate(job.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 md:justify-end">
          <div className="text-right">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              Match Score
            </p>
            <p className={`text-4xl font-black ${scoreColor(matchScore)}`}>
              {matchScore}%
            </p>
          </div>

          <Button asChild className="font-semibold">
            <Link href={`/dashboard/jobs/${job.id}`}>
              Ver Analisis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default JobCard;
