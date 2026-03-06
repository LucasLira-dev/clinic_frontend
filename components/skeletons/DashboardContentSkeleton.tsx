import { Skeleton } from "@/components/ui/skeleton"

export function DashboardContentSkeleton() {
    return (
        <div className="space-y-6 px-6 pb-6 pt-5">
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="space-y-2">
                    <Skeleton className="h-9 w-56 rounded-md" />
                    <Skeleton className="h-5 w-80 rounded-md" />
                </div>

                {/* Stat cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="border-border bg-card rounded-lg border p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-32 rounded-md" />
                                <Skeleton className="h-5 w-5 rounded-md" />
                            </div>
                            <Skeleton className="h-8 w-16 rounded-md" />
                        </div>
                    ))}
                </div>

                {/* Chart + upcoming appointments */}
                <div className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-3 w-full">
                    {/* Chart */}
                    <div className="lg:col-span-2 border-border bg-card rounded-lg border p-4 space-y-4">
                        <Skeleton className="h-5 w-40 rounded-md" />
                        <Skeleton className="h-56 w-full rounded-md" />
                    </div>

                    {/* Upcoming appointments */}
                    <div className="lg:col-span-1 border-border bg-card rounded-lg border p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-36 rounded-md" />
                            <Skeleton className="h-8 w-24 rounded-md" />
                        </div>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-3/4 rounded-md" />
                                    <Skeleton className="h-3 w-1/2 rounded-md" />
                                </div>
                                <Skeleton className="h-5 w-16 rounded-full" />
                            </div>
                        ))}
                        <Skeleton className="h-9 w-full rounded-md mt-2" />
                    </div>
                </div>
            </div>
        </div>
    )
}
