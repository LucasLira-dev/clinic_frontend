"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { CalendarClock, ChevronRight, Clock3 } from "lucide-react"

import { getMyAppointments } from "@/services/appointmentsService"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentFilter, AppointmentItem, UserRole } from "@/types"
import { filters, formatDateParts, statusMap } from "@/lib/utils"


export function MyAppointmentsContent({userId, userRole}: {userId: string, userRole: UserRole}) {
  const [filter, setFilter] = useState<AppointmentFilter>("all")

  const { data, isLoading, isError } = useQuery({
    queryKey: ["appointments", userRole, userId, filter],
    queryFn: () => getMyAppointments(filter, userRole),
    enabled: !!userId && !!userRole,
  })

  const appointments = useMemo<AppointmentItem[]>(() => data ?? [], [data])

  return (
    <div className="space-y-6 px-6 pb-6 pt-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight"> Suas Consultas </h1>
          <p className="text-muted-foreground">
            Acompanhe todas as suas consultas, passadas e futuras.
          </p>
        </div>

        {
          userRole === "patient" && (
            <Button asChild className="w-full md:w-auto bg-chart-2 hover:bg-chart-2/80">
              <Link href="/agendar">
                <CalendarClock className="size-4" />
                Nova Consulta
              </Link>
            </Button>
          )
        }
      </div>

      <Tabs value={filter} onValueChange={(value) => setFilter(value as AppointmentFilter)} className="w-max">
        <TabsList className="h-10 bg-muted p-1">
          {filters.map((item) => (
            <TabsTrigger key={item.value} value={item.value} className="px-4">
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {isLoading && (
          <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
            Carregando consultas...
          </div>
        )}

        {!isLoading && isError && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center text-destructive">
            Nao foi possivel carregar suas consultas.
          </div>
        )}

        {!isLoading && !isError && appointments.length === 0 && (
          <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
            Nenhuma consulta encontrada para este filtro.
          </div>
        )}

        {!isLoading &&
          !isError &&
          appointments.map((appointment) => {
            const dateParts = formatDateParts(appointment.appointmentDay)
            const status = statusMap[appointment.status]

            return (
              <article
                key={appointment.id}
                className={`group flex items-center w-full gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-chart-2/35 md:gap-4 md:p-4 cursor-pointer ${status.cardClass}`}
              >
                <div className="flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-chart-2/15 text-center p-8 gap-2">
                  <span className="text-3xl leading-none font-bold text-chart-2">{dateParts?.day}</span>
                  <span className="text-xs font-semibold tracking-wide text-chart-2">
                    {dateParts?.month}
                  </span>
                </div>

                <div className="min-w-0 flex-1 gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground hover:text-chart-2 transition-colors">
                      {appointment.doctorProfile.fullName}
                    </h3>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.badgeClass} mb-2 md:mb-0`}>
                      {status.label}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {appointment.doctorProfile.specialty}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock3 className="size-3.5" />
                    <span>{`${dateParts?.fullDate} as ${dateParts?.hour}`}</span>
                  </div>
                </div>

                <Link href={`/consultas/${appointment.id}`} className="ml-auto">
                  <ChevronRight className="size-5 text-muted-foreground" />
                </Link>
              </article>
            )
          })}
      </div>
    </div>
  )
}
