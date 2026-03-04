'use client';

import { useQuery } from "@tanstack/react-query"
import { DoctorCard } from "./DoctorCard"
import { getAllDoctors } from "@/services/doctorService"

export const DoctorsContent = ({userRole}: { userRole?: string }) => {

    const { data: doctors, isLoading, isError } = useQuery({
        queryKey: ["doctors"],
        queryFn: () => getAllDoctors(),
    })

    const disableScheduling = userRole !== 'patient' && userRole !== 'admin';

    if (isLoading) {
        return (
            <div className="space-y-6 px-6 pb-6 pt-5">
                <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight"> Nossa Equipe Médica </h1>
                        <p className="text-muted-foreground">
                            Conheça nossos profissionais e agende sua consulta.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                        {/* Renderize skeletons ou placeholders enquanto os dados estão carregando */}
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="animate-pulse rounded-lg bg-muted h-32" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="space-y-6 px-6 pb-6 pt-5">
                <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight"> Nossa Equipe Médica </h1>
                        <p className="text-muted-foreground">
                            Erro ao carregar a lista de médicos.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 px-6 pb-6 pt-5">
            <div className="flex flex-col gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight"> Nossa Equipe Médica </h1>
                    <p className="text-muted-foreground">
                        Conheça nossos profissionais e agende sua consulta.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    {doctors?.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={{...doctor, disableScheduling}}/>
                    ))}
                </div>
            </div>
        </div>
    )
}