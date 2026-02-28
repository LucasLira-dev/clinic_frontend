import { UserPainelContent } from "@/components/AccountComponents/UserPainelContent";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DoctorPainel() {

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

    const userEmail = session.data?.user.email;
    const userRole = session.data?.user.role;
    const userName = session.data?.user.name;
    const profilePhoto = session.data?.user.image;
    const createdAt = session.data?.user.createdAt;
      
    return (
        <div>
            <div className="px-6 pt-2 pb-4">
                <h1 className="text-3xl font-bold tracking-tight">Painel</h1>
            </div>
            <Separator />
            <UserPainelContent userEmail={userEmail || ''} userRole={userRole || ''} userName={userName || ''} profilePhoto={profilePhoto || null} createdAt={createdAt ? createdAt.toString() : ''} />
            </div>
        )
}