'use client';

import { Card, CardContent, CardFooter } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export const PostContentSkeleton = ({ visibleFooter }: { visibleFooter?: boolean }) => {
    return (
        <div className="mx-auto mt-5 grid w-full max-w-6xl gap-6 px-6">
            <Card className="overflow-hidden p-0">
                <Skeleton className="h-24 w-full" />

                <CardContent className="space-y-6 px-5 pb-6 pt-0 md:px-6">
                    <div className="-mt-10 flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <Skeleton className="rounded-full w-12 h-12" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                        <Skeleton className="h-3 w-40" />
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                    </div>

                    <div className="space-y-2 border-b pb-9">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </CardContent>

                {visibleFooter && (
                    <CardFooter className="flex bg-chart-2/20 rounded-md p-6 m-8 mr-8 justify-center">
                        <div className="flex flex-col gap-3 justify-center items-center w-full max-w-xs">
                            <Skeleton className="h-6 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-10 w-40" />
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}