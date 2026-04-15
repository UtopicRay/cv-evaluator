import React from "react";
import CommunHeaderCard from "../commun-header-card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Star, TrendingUp, Upload } from "lucide-react";
import { BestMatchJobDto } from "@/type";

interface InfoSectionProps {
  countsCv: number;
  bestMatch: BestMatchJobDto | null;
  puntuacionMedia: number | null;
}

function InfoSection({
  countsCv,
  bestMatch,
  puntuacionMedia,
}: InfoSectionProps) {
  const getWidthClass = (score: number) => {
  if (score >= 90) return "w-full";
  if (score >= 80) return "w-[80%]";
  if (score >= 70) return "w-[70%]";
  if (score >= 60) return "w-[60%]";
  if (score >= 50) return "w-[50%]";
  if (score >= 40) return "w-[40%]";
  if (score >= 30) return "w-[30%]";
  if (score >= 20) return "w-[20%]";
  if (score >= 10) return "w-[10%]";
  return "w-[5%]";
};
  return (
    <section className="grid gap-4 md:grid-cols-3 lg:gap-5">
      <CommunHeaderCard title="Cvs Analizados">
        <div className="flex items-end justify-between">
          <span className="text-4xl font-black leading-none">
            {countsCv ?? 0}
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Upload className="h-5 w-5" />
          </div>
        </div>
      </CommunHeaderCard>

      <CommunHeaderCard title="Puntuacion Media">
        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black leading-none text-success">
                {puntuacionMedia ?? 0}
              </span>
              <span className="font-medium text-muted-foreground">/100</span>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10 text-success">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            {puntuacionMedia !== null && (
              <div
                className={`h-full rounded-full bg-success transition-all duration-300 ease-in-out ${getWidthClass(puntuacionMedia)}`}
              />
            )}
          </div>
        </div>
      </CommunHeaderCard>

      <CommunHeaderCard title="Mejor Match">
        <div className="space-y-3">
          <div className="flex items-end justify-between gap-3">
            <span className="text-lg font-bold leading-tight text-foreground">
              {bestMatch ? bestMatch.position : "Sin Analisis"} en{" "}
              {bestMatch ? bestMatch.company : ""}
            </span>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/60 text-muted-foreground">
              <Star className="h-5 w-5" />
            </div>
          </div>
          <Link
            href={bestMatch ? `/dashboard/jobs/${bestMatch.id}` : "#"}
            className="text-sm font-bold text-primary hover:text-primary"
          >
            <Button
              variant="ghost"
              className="h-auto w-fit px-0 text-xs font-bold uppercase tracking-[0.12em] text-primary hover:text-primary"
            >
              {bestMatch ? "Ver detalles" : "Sin detalles"}
            </Button>
          </Link>
        </div>
      </CommunHeaderCard>
    </section>
  );
}

export default InfoSection;
