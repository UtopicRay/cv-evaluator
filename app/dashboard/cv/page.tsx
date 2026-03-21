"use client";

import { useEffect, useState } from "react";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
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
import { useUserContext } from "@/context/user-context";
import { useFetchData } from "@/hooks/fetch-data";
import { CVItem } from "@/type";

export default function CvPage() {
  const { user, isLoadingUser } = useUserContext();
  const { fecthCvs, loading, error } = useFetchData();
  const [cvs, setCvs] = useState<CVItem[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;

    const loadCvs = async () => {
      const data = await fecthCvs({ userId: user.id });
      if (isMounted && data) {
        setCvs(data);
      }
    };

    loadCvs();

    return () => {
      isMounted = false;
    };
  }, [fecthCvs, user?.id]);

  const hasCvs = cvs.length > 0;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tus CVs</h1>
            <p className="text-muted-foreground">
              Revisa el historial de tus currículums analizados.
            </p>
          </div>
          <Link href="/dashboard/upload">
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Subir Nuevo CV
            </Button>
          </Link>
        </div>

        {(isLoadingUser || loading) && (
          <Card className="p-4 bg-card border-border text-muted-foreground">
            Cargando tus CVs...
          </Card>
        )}

        {!isLoadingUser && error && (
          <Card className="p-4 border-destructive/40 bg-destructive/10 text-destructive">
            {error}
          </Card>
        )}

        {!isLoadingUser && !loading && !hasCvs ? (
          <Empty className="border-border bg-card">
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
                <Button>
                  Subir CV
                </Button>
              </Link>
            </EmptyContent>
          </Empty>
        ) : !isLoadingUser && !loading ? (
          <CvList cvs={cvs} />
        ) : null}
      </div>
    </DashboardLayout>
  );
}
