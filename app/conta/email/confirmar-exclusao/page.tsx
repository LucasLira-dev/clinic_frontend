import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ConfirmDeletePage() {

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

    if (session === undefined) {
        redirect('/login');
    }
      

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center p-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Confirmar Exclusão de Conta</h1>
        <p className="text-muted-foreground">
          Verifique seu e-mail para confirmar a exclusão da conta.
        </p>
      </div>
    </div>
  );
}