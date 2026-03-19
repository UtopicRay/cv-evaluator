import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-9 w-32" />
        </div>

        <Card className="p-8 bg-card border-border">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-32 w-32 rounded-full">
              <Skeleton className="h-32 w-32 rounded-full" />
            </div>
            <div className="flex-1 space-y-3 text-center md:text-left">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-7 w-72" />
              <Skeleton className="h-4 w-80" />
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
