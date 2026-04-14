import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function DashboardLoading() {
  return (
    <DashboardLayout>
      <div className="space-y-8 lg:space-y-10">
        <header className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <Skeleton className="h-6 w-32 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-9 w-48" />
                <Skeleton className="h-5 w-80" />
              </div>
            </div>
            <Skeleton className="h-11 w-44" />
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3 lg:gap-5">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
            >
              <Skeleton className="mb-4 h-4 w-24" />
              <div className="flex items-end justify-between">
                <Skeleton className="h-9 w-16" />
                <Skeleton className="h-12 w-12 rounded-lg" />
              </div>
            </Card>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <Card className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm lg:p-8">
              <div className="space-y-8">
                <div className="space-y-2">
                  <Skeleton className="h-7 w-56" />
                  <Skeleton className="h-5 w-80" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Skeleton className="min-h-52 rounded-xl border-2 border-dashed border-border" />
                  <div className="space-y-4">
                    <Skeleton className="h-16 rounded-xl border border-border/60" />
                    <Skeleton className="h-11 w-full" />
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Card
                    key={i}
                    className="rounded-xl border border-border/50 bg-card p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-lg" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-40" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-10 ml-auto" />
                        <Skeleton className="h-5 w-12" />
                        <Skeleton className="h-1.5 w-20" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <Skeleton className="h-40 rounded-2xl border-0 bg-primary" />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default DashboardLoading;