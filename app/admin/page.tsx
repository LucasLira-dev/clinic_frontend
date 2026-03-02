import { AdminContent } from "@/components/adminComponents/AdminContent"
import { Separator } from "@/components/ui/separator"
import { authClient } from "@/lib/auth-client";
import { ShieldCheck } from "lucide-react"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {

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

  if (session?.data?.user?.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl mb-4">Administração</h1>
      <Separator className="mb-4" />
      
      <div className="flex flex-row gap-2 items-center">
        <div className="flex items-center">
            <ShieldCheck className="h-6 w-6 text-chart-2" />
        </div>
        <div className="flex flex-col">
            <span className="ml-2 font-semibold text-lg">Painel de Administração</span>
            <p className="text-sm text-accent-foreground/80 ml-2">
                Gerencie médicos e pacientes da clinica.
            </p>
        </div>
      </div>
      <AdminContent />
    </div>
  )
}