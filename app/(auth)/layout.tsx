import { authClient } from "@/lib/auth-client";
import { redirect } from "next/dist/client/components/navigation";
import { headers } from "next/dist/server/request/headers";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let session = null;
  try {
    session = await authClient.getSession({
      fetchOptions: {
        headers: await headers()
      }
    });
  } catch (error) {
    console.error('Erro ao obter sessão:', error);
    // Não redirecione aqui!
  }

  if (session && session.data?.user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
