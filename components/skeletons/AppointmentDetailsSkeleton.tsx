import { Skeleton } from "@/components/ui/skeleton"

export function AppointmentDetailsSkeleton() {
  return (
    <div className="space-y-6 px-6 pb-6 pt-5 max-w-4xl mx-auto">
      <Skeleton className="h-5 w-32 mb-3" />
      <div className="flex flex-col border border-border rounded-lg p-6 gap-13">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-7 w-7 rounded-md" />
                <div className="flex flex-col">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col mt-2">
            <Skeleton className="h-5 w-40 mb-2" />
            <div className="flex items-center gap-4 mt-2 border border-border rounded-lg px-4 py-2 bg-white">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex flex-col">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </div>
        <Skeleton className="h-2 w-full my-4" />
        <div className="flex flex-col gap-2 lg:flex-row md:justify-end">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>
    </div>
  )
}