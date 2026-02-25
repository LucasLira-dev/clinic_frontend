import { Separator } from "@/components/ui/separator"
import { ScheduleAppointmentForm } from "@/components/appointments/ScheduleAppointmentForm"
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";



export default async function SchedulePage() {

  let session = null;
    try {
        session = await authClient.getSession({
          fetchOptions: {
            headers: await headers()
          }
        });
    } catch (error) {
      console.error('Erro ao obter sessão:', error);
    }
    
    if (!session) {
      redirect('/login');
    }

    if (session.data?.user?.role !== 'patient' && session.data?.user?.role !== 'admin') {
      redirect('/');
    }
  

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
