import { AdminStats } from "@/components/adminComponents/adminStats"
import UsersTable from "@/components/adminComponents/UsersTable"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck } from "lucide-react"

export default function AdminPage() {
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

      <AdminStats />

      <UsersTable />
    </div>
  )
}