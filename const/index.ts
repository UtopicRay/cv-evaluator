import { InfoDetailsProps } from "@/type";

export const industries:string[] = [
  "Tecnología e IT",
  "Diseño y Creatividad",
  "Marketing y Ventas",
  "Finanzas y Contabilidad",
  "Recursos Humanos",
  "Ingeniería",
  "Salud y Medicina",
  "Educación",
  "Legal",
  "Administración",
  "Otra",
];

export const experienceLevels = [
  { value: "junior", label: "Junior (0-2 años)" },
  { value: "mid", label: "Mid-level (2-5 años)" },
  { value: "senior", label: "Senior (5-10 años)" },
  { value: "expert", label: "Expert (10+ años)" },
];

export const infoDetails: InfoDetailsProps[] = [
  {
    title: "Gratis para comenzar",
    description: "Sin tarjeta de crédito requerida",
    color: "bg-primary",
  },
  {
    title: "Análisis ilimitados",
    description: "Evalúa todos tus CVs",
    color: "bg-accent",
  },
  {
    title: "Resultados instantáneos",
    description: "Feedback en tiempo real",
    color: "bg-success",
  },
  {
    title: "Análisis instantáneo",
    description: "Resultados en segundos",
    color: "bg-primary",
  },
  {
    title: "Seguimiento de progresos",
    description: "Visualiza tu evolución",
    color: "bg-accent",
  },
  {
    title: "Recomendaciones personalizadas",
    description: "Mejora continua",
    color: "bg-success",
  },
];
