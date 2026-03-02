import { Calendar } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { FaStar } from "react-icons/fa"
import { Button } from "../ui/button"
import Image from "next/image"

interface DoctorCardProps {
    id: string;
    fullName: string;
    specialty: string;
    crm: string;
    biography: string | null;
    profilePhoto: string | null;
    workingDaysCount: number;
}

export const DoctorCard = ({ doctor }: { doctor: DoctorCardProps }) => {

    const doctorInitials = doctor.fullName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);

    return (
        <Card className="w-full h-full flex flex-col gap-2 hover:border-chart-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex items-center gap-4">
                <div className="rounded-full bg-muted">
                    {/* Placeholder para a foto do médico */} 
                    {doctor.profilePhoto ? 
                    (
                        <Image 
                        src={doctor.profilePhoto} 
                        alt="Foto do Médico" 
                        width={48}
                        height={48}
                        className="rounded-full object-cover w-12 h-12"/> )
                    : 
                    (
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-xs font-medium text-muted-foreground">{doctorInitials}</span>
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-medium text-chart-2">{doctor.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    <p className="text-sm text-muted-foreground">{doctor.crm}</p>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 flex-1">
                <div>
                    <p className="text-sm text-muted-foreground">{doctor.biography}</p>
                </div>
                <div className="flex flex-row gap-4 items-center">
                    <div className="flex items-center gap-1">
                        <FaStar className="inline-block mb-1 text-yellow-500" />
                        <span className="text-sm text-muted-foreground"> 5.0 </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="inline-block h-4 w-4 mb-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground"> {doctor.workingDaysCount} dias </span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-row justify-end gap-2 mt-4">
               <Button variant="outline" className="cursor-pointer">Ver perfil</Button>
               <Button variant="default" className="bg-chart-2 cursor-pointer">Agendar</Button> 
            </CardFooter>
        </Card>
    )
}