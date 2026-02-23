import { Separator } from "@/components/ui/separator"
import { ScheduleAppointmentForm } from "@/components/appointments/ScheduleAppointmentForm"

export default function SchedulePage() {
  return (
    <div>
      <div className="px-6 pt-2 pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Agendar Consulta</h1>
      </div>
      <Separator />
      <ScheduleAppointmentForm />
    </div>
  )
}
