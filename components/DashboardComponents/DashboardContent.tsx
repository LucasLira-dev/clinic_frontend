'use client';

import { CalendarCheck, Users, TrendingUp } from "lucide-react"
import { CardStats } from "./CardStats";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/services/appointmentsService";
import { ChartBarDefault } from "./Chart";
import { weekdayLabels, weekdayOrder } from "@/lib/utils";
import { UpcomingAppointments } from "./UpcomingAppointments";
import { Button } from "../ui/button";
import Link from "next/link";
import { DashboardContentSkeleton } from "../skeletons/DashboardContentSkeleton";
import { DashboardError } from "./DashboardError";

interface DashboardContentProps {
    name: string;
    userRole: string;
}

export const DashboardContent = ({ name, userRole }: DashboardContentProps) => {

    const {data: dashboardStats, isLoading, error, refetch} = useQuery({
        queryKey: ['dashboardStats'],
        queryFn: () => getDashboardStats(),
    })

    const cardStats = [
        {
            title: 'Consultas nesta semana',
            value: dashboardStats?.totalWeekAppointments ?? 0,
            icon: CalendarCheck
        },
        {
            title: 'Total de consultas concluídas',
            value: dashboardStats?.totalCompletedAppointments ?? 0,
            icon: TrendingUp
        },
        {
            title: 'Médicos cadastrados',
            value: dashboardStats?.totalDoctors ?? 0,
            icon: Users
        },
        {
            title: 'Pacientes cadastrados',
            value: dashboardStats?.totalPatients ?? 0,
            icon: Users
        }
    ]

    if (isLoading) {
        return <DashboardContentSkeleton />
    }

    if (error) {
        return <DashboardError onRetry={refetch} />
    }

    const chartData = weekdayOrder.map(day => ({
        day: weekdayLabels[day as keyof typeof weekdayLabels],
        consultas: dashboardStats?.appointmentsByWeekday[day] || 0,
    }))

    return (
        <div className="space-y-6 px-6 pb-6 pt-5">
            <div className="flex flex-col gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight"> Olá, {name}!</h1>
                    <p className="text-muted-foreground">
                        Acompanhe suas consultas e encontre os melhores medicos.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cardStats.map((stat, index) => (
                        <CardStats
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                        />
                    ))}
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-3 w-full">
                    <div className="lg:col-span-2">
                        <ChartBarDefault data={chartData} />
                    </div>
                    <div className="lg:col-span-1">
                    {
                        dashboardStats?.upcomingAppointments && dashboardStats.upcomingAppointments.length > 0 ? (
                            <div className="border-border bg-card rounded-lg border p-4 flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">Próximas consultas</span>
                                    {
                                        userRole === 'patient' && (
                                            <Link href="/agendar">
                                                <Button variant="outline" size="sm" className="text-chart-2 hover:bg-chart-2/20 hover:text-chart-2/90 rounded-md p-5 cursor-pointer">
                                                    <CalendarCheck className="size-4 text-chart-2" />
                                                    Agendar
                                                </Button>
                                            </Link>
                                        )
                                    }
                                </div>
                                
                                {dashboardStats.upcomingAppointments.map(appointment => {
                                    const date = new Date(appointment.appointmentDay)
                                    const formattedDate = date.toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })

                                    return (
                                        <UpcomingAppointments
                                            key={appointment.id}
                                            id={appointment.id}
                                            name={appointment.counterpartName}
                                            date={formattedDate}
                                            status={appointment.status}
                                            specialty={appointment.counterpartSpecialty || undefined}
                                        />
                                    )
                                })}

                                <Link href="/consultas" className="w-full">
                                    <Button variant="ghost" size="sm" className="w-full mt-2 text-chart-2 hover:bg-chart-2/10 hover:text-chart-2/80 rounded-md p-5 cursor-pointer">
                                        Ver todas as consultas
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="rounded-lg border bg-background p-5">
                                <h2 className="text-md text-chart-2 font-semibold tracking-tight">Nenhuma consulta agendada</h2>
                                <p className="text-base leading-7 text-muted-foreground">Parece que você não tem consultas agendadas para os próximos dias. Agende uma consulta para acompanhar seus atendimentos futuros.</p>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>  
    )
}