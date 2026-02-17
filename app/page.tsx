'use client';

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function Home() {

  
  const { data: session } = authClient.useSession()

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-warning">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Bem-vindo ao ClinicFlow</h1>

          <div className="my-4 border-t" />
          <Button variant="outline" className="w-full gap-2 border-border bg-card text-foreground hover:bg-muted hover:text-emerald-700 cursor-pointer"
          onClick={() => authClient.signIn.social({ provider: 'github', callbackURL: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000' })}
          >
            Entrar com GitHub
          </Button>
         </div>
      </div>
    )
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-warning">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Bem-vindo, {session.user.name}</h1>
      </div>
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <Button variant="outline" className="w-full gap-2 border-border bg-card text-foreground hover:bg-muted hover:text-emerald-700 cursor-pointer"
        onClick={() => authClient.signOut()}
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
