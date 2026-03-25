import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingConfig() {
  return (
    <DashboardLayout>
      <div className="space-y-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-8 w-56" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="hidden h-9 w-64 md:block" />
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4 space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Card className="lg:col-span-8 border-0 bg-card/70 p-8 shadow-sm">
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              <Skeleton className="h-28 w-28 rounded-2xl" />
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4 space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-60" />
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="border-0 bg-card/70 p-6">
              <div className="space-y-4">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-4 w-28" />
              </div>
            </Card>
            <Card className="border border-border/60 bg-card/70 p-6">
              <div className="space-y-4">
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-7 w-36" />
                <Skeleton className="h-4 w-44" />
              </div>
            </Card>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4 space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Card className="lg:col-span-8 border-0 bg-card/70 p-8 shadow-sm space-y-8">
            <div className="space-y-2">
              <Skeleton className="h-3 w-40" />
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-32" />
              </div>
            </div>
            <div className="h-px bg-border/60" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Skeleton className="h-3 w-36" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-48" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4 space-y-2">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Card className="lg:col-span-8 border-0 bg-card/70 p-8 shadow-sm space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-64" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            ))}
          </Card>
        </section>

        <div className="flex flex-col gap-4 pb-8 sm:flex-row sm:justify-end">
          <Skeleton className="h-10 w-full sm:w-40" />
          <Skeleton className="h-10 w-full sm:w-48" />
        </div>
      </div>
    </DashboardLayout>
  );
}
