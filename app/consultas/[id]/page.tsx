import { Separator } from "@/components/ui/separator"
import { AppointmentDetails } from "@/components/appointments/AppointmentDetails"
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";
import { UserRole } from "@/types";

export default async function AppointmentsPage({params }: {
  params: Promise<{ id: string }>
}) {

    const { id } = await params;

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

  const userId = session?.data?.user.id;
  const userRole = session?.data?.user.role;

  return (
    <div>
      <div className="px-6 pt-2 pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Detalhes</h1>
      </div>
      <Separator />
      <AppointmentDetails appointmentId={id} userId={userId as string} userRole={userRole as UserRole} />
    </div>
  )
}
