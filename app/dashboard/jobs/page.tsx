import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Plus,
  Filter,
} from "lucide-react";
import { getUser } from "@/lib/fetching/fetch";
import { getJobsByUserId } from "@/lib/query";
import JobCard from "@/components/jobs/job-card";



export default async function JobsPage() {
  const user = await getUser();
  const jobs = user ? await getJobsByUserId(user.id) : [];
  const hasJobs = jobs.length > 0;

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Mis Ofertas Analizadas
          </h1>
          <p className="mt-2 text-base text-muted-foreground md:text-lg">
            Gestiona y compara las vacantes que has evaluado con nuestra IA.
          </p>
        </div>

        <Button asChild size="lg" className="font-bold shadow-md shadow-primary/20">
          <Link href="/dashboard/jobs/upload">
            <Plus className="mr-2 h-4 w-4" />
            Analizar Nueva Oferta
          </Link>
        </Button>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="secondary" className="rounded-full font-semibold">
          <Filter className="mr-2 h-4 w-4" />
          Mas recientes
        </Button>
        <Button variant="outline" className="rounded-full font-semibold">
          Mayor Score
        </Button>
        <Button variant="outline" className="rounded-full font-semibold">
          Menor Score
        </Button>
      </div>

      {hasJobs ? (
        <section className="space-y-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>
      ) : (
        <Card className="rounded-2xl border border-dashed border-border/80 bg-card p-8">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground">
              Aun no hay ofertas analizadas
            </p>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Crea tu primer analisis para ver comparativas de match, fortalezas y
              recomendaciones accionables para cada vacante.
            </p>
            <div>
              <Button asChild className="mt-2 font-semibold">
                <Link href="/dashboard/jobs/upload">Analizar primera oferta</Link>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
