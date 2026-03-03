'use client';

import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { BookOpenText, CalendarPlus2, Clock3, GraduationCap, Star } from "lucide-react"
import { Separator } from "../ui/separator"
import { useQuery } from "@tanstack/react-query";
import { getDoctorDetailsById } from "@/services/doctorService";
import { DoctorProfileSkeleton } from "@/components/skeletons/DoctorProfileSkeleton";
import { DoctorProfileError } from "./DoctorProfileError";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const DoctorProfileContent = ({id}: {id: string}) => {

    const { data: doctor, isLoading, isError, refetch } = useQuery({
        queryKey: ['doctorProfile', id],
        queryFn: () => getDoctorDetailsById(id),
    })

    const router = useRouter()

    if (isLoading) {
        return <DoctorProfileSkeleton />
    }

    if (!doctor) {
        toast.error('Médico não encontrado')
        router.push('/medicos')
        return null
    }

    if (isError) {
        return <DoctorProfileError onRetry={() => refetch()} />
    }

    const doctorInitials = doctor?.fullName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div className="mx-auto mt-5 grid w-full max-w-6xl gap-6 px-6">
            <Card className="overflow-hidden p-0">
                <div className="h-24 w-full bg-chart-2/20" />

                <CardContent className="space-y-6 px-5 pb-6 pt-0 md:px-6">
                    <div className="-mt-10 flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex size-18 items-center justify-center rounded-full border-4 border-background bg-primary text-xl font-semibold text-primary-foreground">
                                {doctor.profilePhoto ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={doctor.profilePhoto}
                                        alt="Foto do Medico"
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                ) : (
                                    <span>{doctorInitials}</span>
                                )}
                            </div>
                            <div className="space-y-1">
                                <p className="text-xl md:text-3xl font-bold tracking-tight">{doctor.fullName}</p>
                                <p className="text-lg text-muted-foreground">{doctor.specialty}</p>
                                <p className="text-sm text-muted-foreground">{doctor.crm}</p>
                            </div>
                        </div>

                        <Button asChild className="h-11 bg-chart-2 px-5 text-sm font-semibold hover:bg-chart-2/90">
                            <Link href={`/agendar?doctorId=${doctor.id}`}>
                                <CalendarPlus2 className="size-4" />
                                Agendar Consulta
                            </Link>
                        </Button>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1fr_290px]">
                        <div className="space-y-6">
                            <section className="space-y-3">
                                <h2 className="flex items-center gap-2 text-md font-bold">
                                    <GraduationCap className="size-5 text-primary" />
                                    Sobre o Medico
                                </h2>
                                <p className="max-w-2xl text-base leading-7 text-muted-foreground">{doctor.biography}</p>
                            </section>

                            <section className="space-y-3">
                                <h3 className="text-md font-semibold tracking-tight">Dias Disponiveis</h3>
                                <div className="flex flex-wrap gap-2">
                                    {doctor.workingDays.length > 0 ? (
                                        doctor.workingDays.map((day) => (
                                            <span
                                                key={day.dayOfWeek}
                                                className="rounded-full border border-[hsl(172_25%_85%)] bg-[hsl(172_32%_93%)] px-3 py-1 text-sm font-semibold text-[hsl(172_66%_26%)]"
                                            >
                                                {day.dayOfWeek}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">Sem dias cadastrados</p>
                                    )}
                                </div>
                            </section>

                            <section className="space-y-3">
                                <h3 className="text-md font-semibold tracking-tight">Horarios Disponiveis</h3>
                                <div className="flex flex-wrap gap-2">
                                    {doctor.slots.length > 0 ? (
                                        doctor.slots.map((slot) => (
                                            <span
                                                key={slot}
                                                className="rounded-full border border-border bg-background px-3 py-1 text-sm font-semibold text-muted-foreground"
                                            >
                                                {slot}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">Sem horarios cadastrados</p>
                                    )}
                                </div>
                            </section>
                        </div>

                        <aside className="h-fit rounded-xl border bg-card p-5 shadow-sm">
                            <div className="flex items-center gap-2">
                                <Star className="size-5 fill-amber-400 text-amber-400" />
                                <span className="text-3xl font-bold">5.00</span>
                                <span className="text-muted-foreground">/5.0</span>
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-3">
                                <p className="flex items-center gap-2 text-lg text-muted-foreground">
                                    <CalendarPlus2 className="size-4 text-primary" />
                                    <span>
                                        <strong>{doctor.weeklyAppointments} atendimentos</strong>/semana
                                    </span>
                                </p>
                                <p className="flex items-center gap-2 text-lg text-muted-foreground">
                                    <Clock3 className="size-4 text-primary" />
                                    <span>
                                        <strong>{doctor.workingDays.length} dias</strong> de atendimento
                                    </span>
                                </p>
                            </div>
                        </aside>
                    </div>
                </CardContent>
            </Card>

            <Card className="p-0">
                <CardContent className="space-y-5 px-5 py-6 md:px-6">
                    <h2 className="flex items-center gap-2 text-md font-bold">
                        <BookOpenText className="size-5 text-primary" />
                        Publicacoes do Medico
                    </h2>

                    {doctor.posts.length > 0 ? (
                        doctor.posts.map((post) => (
                            <article
                                key={post.id}
                                className="space-y-2 rounded-xl border bg-background p-5"
                            >
                                <h3 className="text-2xl font-semibold tracking-tight">{post.title}</h3>
                                <p className="text-base leading-7 text-muted-foreground">{post.content}</p>
                                <p className="text-sm text-muted-foreground">{post.createdAt}</p>
                            </article>
                        ))
                    ) : (
                        <p className="rounded-xl border bg-background p-5 text-sm text-muted-foreground">
                            Este medico ainda nao possui publicacoes.
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}