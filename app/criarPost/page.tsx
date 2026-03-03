import { CreatePostForm } from "@/components/BlogComponents/CreatePostForm";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CriarPost() {
    let session = null;
    try {
        session = await authClient.getSession({
            fetchOptions: {
                headers: await headers()
            }
        });
    } catch (error) {
        console.error('Erro ao obter sessao:', error);
    }

    if (!session?.data) {
        redirect('/login');
    }

    if (session.data.user.role !== 'doctor') {
        redirect('/blog');
    }

    return (
        <div>
            <div className="px-6 pt-2 pb-4">
                <h1 className="text-3xl font-bold tracking-tight">Criar Post</h1>
            </div>
            <Separator />
            <CreatePostForm />
        </div>
    )
}