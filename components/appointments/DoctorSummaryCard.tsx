import { BadgeCheck, Stethoscope } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { DoctorDetails } from "@/types"

type DoctorSummaryCardProps = {
  doctor: DoctorDetails
}

function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0]?.toUpperCase())
    .join("")
}

export function DoctorSummaryCard({ doctor }: DoctorSummaryCardProps) {
  return (
    <Card className="border-chart-2/30 bg-chart-2/5 py-4">
      <CardContent className="flex items-center gap-4 px-4">
        <Avatar className="size-14 border bg-white">
          <AvatarImage src={doctor.profilePhoto} alt={doctor.fullName} />
          <AvatarFallback className="text-sm font-semibold">
            {getInitials(doctor.fullName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1">
          <p className="font-semibold leading-tight">{doctor.fullName}</p>
          <p className="text-muted-foreground flex items-center gap-2 text-sm">
            <Stethoscope className="size-4" />
            {doctor.specialty}
          </p>
          <p className="text-muted-foreground flex items-center gap-2 text-sm">
            <BadgeCheck className="size-4" />
            {doctor.crm}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
