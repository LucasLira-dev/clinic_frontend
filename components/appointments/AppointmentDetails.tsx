'use client';

import { formatDateParts } from "@/lib/utils";
import { getAppointmentDetails } from "@/services/appointmentsService";
import { UserRole } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, CalendarClock, Stethoscope, User } from "lucide-react"
import Link from "next/link"
import { Separator } from "../ui/separator";
import { CancelAppointmentButton } from "./CancelAppointmentButton";
import { AppointmentStatusBadge } from "./AppointmentStatusBadge";
import { CompletedAppointmentButton } from "./CompletedAppointmentButton";
import { AppointmentDetailsSkeleton } from "../skeletons/AppointmentDetailsSkeleton";

interface AppointmentDetailsProps {
    appointmentId: string;
    userId: string;
    userRole: UserRole;
}


export const AppointmentDetails = ({ appointmentId, userId, userRole }: AppointmentDetailsProps) => {

    const { data: appointmentDetails, isLoading, isError } = useQuery({
        queryKey: ["appointment-details", appointmentId, userRole],
        queryFn: () => getAppointmentDetails(appointmentId, userRole),
    })

    if (isLoading) {
        return <AppointmentDetailsSkeleton />
    }

    if (isError) {
        return <div className="flex justify-center items-center h-64 text-red-500">Erro ao carregar detalhes da consulta</div>;
    }

    const dateParts = formatDateParts(appointmentDetails?.appointmentDay)

    const buttonDisabled = appointmentDetails?.status === "CANCELED" || appointmentDetails?.status === "COMPLETED" || appointmentDetails?.status === "NO_SHOW";
    const isDoctor = userRole === "doctor";

    return (
        <div className="space-y-6 px-6 pb-6 pt-5 max-w-4xl mx-auto">
            <div className="w-full mt-2">
                <Link
                    href="/consultas"
                    className="inline-flex items-center gap-2 mb-3 text-sm text-muted-foreground hover:text-muted-foreground/80 transition-colors"
                >
                    <ArrowLeft className="size-5 text-muted-foreground" />
                    Voltar para consultas
                </Link>

                <div className="flex flex-col border border-border rounded-lg p-6 gap-13">
                    <div className="flex justify-between ">
                        <h2 className="font-bold text-md "> Detalhes da consulta </h2>
                        <AppointmentStatusBadge status={appointmentDetails?.status || "Status desconhecido"} />
                    </div>
                    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4">
                                <div className="bg-chart-2 hover:bg-chart-2/20 w-7 h-7 p-4 rounded-md text-white flex items-center justify-center gap-2">
                                    <div>
                                        <Calendar className="size-4" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm text-muted-foreground/80">
                                        Data
                                    </p>
                                    <p className="font-medium">
                                        {dateParts ? `${dateParts.fullDate}` : "Data nao informada"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-chart-2 hover:bg-chart-2/20 w-7 h-7 p-4 rounded-md text-white flex items-center justify-center gap-2">
                                    <div>
                                        <CalendarClock className="size-4" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm text-muted-foreground/80">
                                        Horário
                                    </p>
                                    <p className="font-medium">
                                        { dateParts ? `${dateParts.hour}` : "Horário não informado"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-chart-2 hover:bg-chart-2/20 w-7 h-7 p-4 rounded-md text-white flex items-center justify-center gap-2">
                                    <div>
                                        <User className="size-4" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm text-muted-foreground/80">
                                        Paciente
                                    </p>
                                    <p className="font-medium">
                                        {appointmentDetails?.patientName || "Nome do paciente nao informado"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-2">
                            <div className="flex items-center gap-2 mb-2">
                                <Stethoscope className="h-5 w-5 text-chart-2" />
                                <h2 className="font-bold text-base">Médico responsável</h2>
                            </div>
                            <div className="flex items-center gap-4 mt-2 border border-border rounded-lg px-4 py-2 bg-white">
                                <figure className="flex items-center">
                                    {appointmentDetails?.profilePhoto ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={appointmentDetails.profilePhoto}
                                            alt={`Foto do médico ${appointmentDetails?.doctorName || ""}`}
                                            className="rounded-full object-cover w-12 h-12"
                                        />
                                    ) : (
                                        <div className="bg-gray-200 border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center">
                                            <User className="h-5 w-5 text-gray-500" />
                                        </div>
                                    )}
                                </figure>
                                <figcaption className="flex flex-col">
                                    <span className="font-bold leading-tight">
                                        {appointmentDetails?.doctorName || "Nome do médico não informado"}
                                    </span>
                                    <span className="text-sm text-muted-foreground/80">
                                        {appointmentDetails?.specialty || "Especialidade não informada"}
                                    </span>
                                </figcaption>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-4" />


                    <div className="flex flex-col gap-2 lg:flex-row md:justify-end">
                        {
                            !buttonDisabled && (
                                <CancelAppointmentButton 
                                name={userRole === "doctor" ? appointmentDetails?.patientName || "Nome do paciente não informado" : appointmentDetails?.doctorName || "Nome do médico não informado"} 
                                date={dateParts?.fullDate|| "Data não informada"} 
                                hour={dateParts?.hour || "Horário não informado"} 
                                appointmentId={appointmentDetails?.id || ""}
                                userId={userId}
                                userRole={userRole}
                                disabled={buttonDisabled}
                                />
                            )
                        }

                        {
                            isDoctor && !buttonDisabled && appointmentDetails?.appointmentDay && new Date(appointmentDetails?.appointmentDay || "") < new Date() && (
                                <CompletedAppointmentButton
                                appointmentId={appointmentDetails?.id || ""}
                                patientName={appointmentDetails?.patientName || "Nome do paciente não informado"}
                                date={dateParts?.fullDate || "Data não informada"}
                                hour={dateParts?.hour || "Horário não informado"}
                                userId={userId}
                                userRole={userRole}
                                disabled={buttonDisabled}
                                 />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
