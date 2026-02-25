import { Skeleton } from "@/components/ui/skeleton"

export function AppointmentsContentSkeleton() {
  return (
    <div className="space-y-6 px-6 pb-6 pt-5">
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    </div>
  )
}