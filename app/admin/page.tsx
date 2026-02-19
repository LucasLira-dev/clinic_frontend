import { AdminContent } from "@/components/adminComponents/AdminContent"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers()
    }
  });

  if (!session || !session.data?.user) {
    redirect('/login');
  }

  if (session.data.user.role !== 'admin') {
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