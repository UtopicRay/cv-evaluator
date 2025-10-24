"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { CVCard } from "@/components/cv-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, TrendingUp, Award, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data
const cvs = [
  {
    id: 1,
    name: "CV_Marketing_Manager.pdf",
    score: 92,
    date: "2025-01-15",
    status: "excellent" as const,
  },
  {
    id: 2,
    name: "CV_Software_Engineer.pdf",
    score: 78,
    date: "2025-01-10",
    status: "good" as const,
  },
  {
    id: 3,
    name: "CV_Product_Designer.pdf",
    score: 65,
    date: "2025-01-05",
    status: "needs-improvement" as const,
  },
  {
    id: 4,
    name: "CV_Data_Analyst.pdf",
    score: 88,
    date: "2024-12-28",
    status: "excellent" as const,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Gestiona y analiza tus currículums
            </p>
          </div>
          <Button size="lg" onClick={() => router.push("/dashboard/upload")}>
            <Upload className="mr-2 h-5 w-5" />
            Subir Nuevo CV
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <span className="text-2xl font-bold">4</span>
            </div>
            <p className="text-sm font-medium mb-1">CVs Analizados</p>
            <p className="text-xs text-muted-foreground">
              Total de currículums
            </p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <span className="text-2xl font-bold">80.8</span>
            </div>
            <p className="text-sm font-medium mb-1">Score Promedio</p>
            <p className="text-xs text-success">+12% vs mes anterior</p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-success" />
              </div>
              <span className="text-2xl font-bold">92</span>
            </div>
            <p className="text-sm font-medium mb-1">Mejor Score</p>
            <p className="text-xs text-muted-foreground">
              CV Marketing Manager
            </p>
          </Card>
        </div>

        {/* CVs List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Tus Currículums</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {cvs.map((cv) => (
              <CVCard key={cv.id} cv={cv} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
