import { DashboardLayout } from "@/components/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function JobDetailLoading() {
  return (
      <div className="mx-auto w-full max-w-7xl space-y-10">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-72" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-36" />
          </div>
        </div>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-10">
          <div className="space-y-4 lg:col-span-6">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-12 w-4/5" />
            <Skeleton className="h-6 w-2/5" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-16 w-full" />
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="h-72 w-full rounded-xl" />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-full rounded-xl" />
          ))}
        </section>

        <section className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-56 w-full rounded-xl" />
          </div>
          <div className="space-y-8 lg:col-span-5">
            <Skeleton className="h-56 w-full rounded-xl" />
            <Skeleton className="h-56 w-full rounded-xl" />
            <Skeleton className="h-56 w-full rounded-xl" />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </section>
      </div>
  )
}
