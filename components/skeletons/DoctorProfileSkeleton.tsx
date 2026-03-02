import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export function DoctorProfileSkeleton() {
  return (
    <div className="mx-auto mt-5 grid w-full max-w-6xl gap-6 px-6">
      <Card className="overflow-hidden p-0">
        <div className="h-24 w-full bg-chart-2/20" />

        <CardContent className="space-y-6 px-5 pb-6 pt-0 md:px-6">
          {/* Header */}
          <div className="-mt-10 flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="size-18 rounded-full border-4 border-background" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-52" />
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
            <Skeleton className="h-11 w-44 rounded-md" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_290px]">
            {/* Main content */}
            <div className="space-y-6">
              {/* Sobre o Medico */}
              <section className="space-y-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full max-w-2xl" />
                <Skeleton className="h-4 w-full max-w-2xl" />
                <Skeleton className="h-4 w-3/4 max-w-2xl" />
              </section>

              {/* Dias Disponiveis */}
              <section className="space-y-3">
                <Skeleton className="h-5 w-36" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-8 w-20 rounded-full" />
                  ))}
                </div>
              </section>

              {/* Horarios Disponiveis */}
              <section className="space-y-3">
                <Skeleton className="h-5 w-44" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-8 w-16 rounded-full" />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="h-fit rounded-xl border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Skeleton className="size-5 rounded" />
                <Skeleton className="h-8 w-14" />
                <Skeleton className="h-5 w-8" />
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded" />
                  <Skeleton className="h-5 w-44" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded" />
                  <Skeleton className="h-5 w-40" />
                </div>
              </div>
            </aside>
          </div>
        </CardContent>
      </Card>

      {/* Publicacoes */}
      <Card className="p-0">
        <CardContent className="space-y-5 px-5 py-6 md:px-6">
          <Skeleton className="h-5 w-48" />
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="space-y-2 rounded-xl border bg-background p-5"
            >
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-28" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
