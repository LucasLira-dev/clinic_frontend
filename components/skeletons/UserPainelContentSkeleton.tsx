'use client';

import { Skeleton } from "../ui/skeleton"

export const UserPainelContentSkeleton = () => {
    return (
        <div className="space-y-6 px-6 pb-6 pt-5">
            <div className="flex flex-col gap-2">
                {/* Header Skeleton */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                </div>

                {/* Biography Skeleton */}
                <div className="space-y-2 mt-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-20 w-full" />
                </div>

                {/* Cards Grid Skeleton */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-4">
                        <Skeleton className="h-48 w-full rounded-lg" />
                        <Skeleton className="h-48 w-full rounded-lg" />
                    </div>
                    <Skeleton className="h-96 w-full rounded-lg" />
                </div>
            </div>
        </div>
    )
}