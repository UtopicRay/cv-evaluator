export const gradeMeta: Record<
  string,
  { label: string; title: string; badgeClass: string }
> = {
  A: {
    label: "Excelente",
    title: "¡Tu CV está en excelente forma!",
    badgeClass: "bg-success/10 text-success border-success/20",
  },
  B: {
    label: "Bueno",
    title: "Tu CV está bien estructurado.",
    badgeClass: "bg-success/10 text-success border-success/20",
  },
  C: {
    label: "Mejorable",
    title: "Tu CV tiene oportunidades claras de mejora.",
    badgeClass: "bg-warning/10 text-warning border-warning/20",
  },
  D: {
    label: "Débil",
    title: "Tu CV necesita ajustes importantes.",
    badgeClass: "bg-warning/10 text-warning border-warning/20",
  },
  F: {
    label: "Crítico",
    title: "Tu CV requiere una revisión completa.",
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
  },
}

export function getSectionMeta(metadata: unknown) {
  if (!metadata || typeof metadata !== "object") {
    return { score: null, feedback: null }
  }

  const meta = metadata as { score?: unknown; feedback?: unknown }
  return {
    score: typeof meta.score === "number" ? meta.score : null,
    feedback: typeof meta.feedback === "string" ? meta.feedback : null,
  }
}