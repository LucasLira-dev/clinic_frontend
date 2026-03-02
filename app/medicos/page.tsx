import { DoctorsContent } from "@/components/DoctorComponents/DoctorsContent";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function MedicosPage() {

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

    return (
        <div>
            <div className="px-6 pt-2 pb-4">
                <h1 className="text-3xl font-bold tracking-tight">Minhas Consultas</h1>
            </div>
            <Separator />
            <DoctorsContent />
        </div>
    )
}
