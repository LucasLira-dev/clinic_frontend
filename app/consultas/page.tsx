import { Separator } from "@/components/ui/separator"
import { MyAppointmentsContent } from "@/components/appointments/MyAppointmentsContent"
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";
import { UserRole } from "@/types";

export default async function AppointmentsPage() {

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
  
    if (!session?.data) {
      redirect('/login');
    }
  
  const userId = session?.data?.user?.id;
  const userRole = session?.data?.user?.role;

  return (
    <div>
      <div className="px-6 pt-2 pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Minhas Consultas</h1>
      </div>
      <Separator />
      <MyAppointmentsContent
        userId={userId as string}
        userRole={userRole as UserRole}
       />
    </div>
  )
}
