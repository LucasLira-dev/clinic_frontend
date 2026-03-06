import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";

export default async function NotFound() {

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

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 px-6 text-center">
            <div className="flex flex-col items-center gap-3">
                <FileQuestion className="size-16 text-muted-foreground" />
                <h1 className="text-6xl font-bold tracking-tight">404</h1>
                <h2 className="text-xl font-semibold">Página não encontrada</h2>
                <p className="max-w-sm text-sm text-muted-foreground">
                    A página que você está procurando não existe ou foi movida para outro endereço.
                </p>
            </div>
            <Link href="/">
                <Button className="cursor-pointer">Voltar para o início</Button>
            </Link>
        </div>
    );
}
