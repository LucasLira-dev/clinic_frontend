import { Clock } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { AppointmentStatusBadge } from "../appointments/AppointmentStatusBadge"
import Link from "next/link"

interface UpcomingAppointmentsProps {
    id: string;
    name: string;
    specialty?: string;
    date: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
}

export const UpcomingAppointments = ({ id, name, specialty, date, status }: UpcomingAppointmentsProps) => {
    return (
        <Link href={`/consultas/${id}`}>
            <Card className="border-border bg-card rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent>
                    <div className="flex justify-between items-center">
                        <span className="text-md font-semibold">{name}</span>
                        <AppointmentStatusBadge status={status} />
                    </div>
                    {
                        specialty && (
                            <p className="text-sm text-muted-foreground">{specialty}</p>
                        )
                    }
                    <div className="flex items-center gap-1 text-[12px] text-muted-foreground mt-2">
                        <Clock className="size-4 text-muted-foreground" />
                        <span>{date}</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}