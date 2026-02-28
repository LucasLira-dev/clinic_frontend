'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useMemo, useState } from 'react';

function maskEmail(email: string) {
  const [local, domain] = email.split('@');
  if (!local || !domain) return email;
  if (local.length <= 2) return `${local[0] ?? '*'}***@${domain}`;
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

export default function EmailChangeRequestedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isResending, setIsResending] = useState(false);

  const { data: sessionData, isPending: isSessionLoading } = authClient.useSession();
  const email = searchParams.get('email') ?? '';
  const maskedEmail = useMemo(() => (email ? maskEmail(email) : ''), [email]);
  const callbackURL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/conta/email/alteracao-confirmada?email=${encodeURIComponent(email)}`;

  if (isSessionLoading) {
    return <div className="flex min-h-screen items-center justify-center">Carregando...</div>;
  }

  if (!sessionData) {
    router.push('/login');
    return null;
  }

  if(sessionData.user.emailVerified === false) {
    toast.error('Você precisa verificar seu e-mail atual antes de solicitar uma alteração.');
    router.push('/painel');
    return null;
  }

  const handleResend = async () => {
    if (!email) {
      toast.error('E-mail não encontrado. Volte ao painel e tente novamente.');
      return;
    }

    setIsResending(true);
    try {
      const result = await authClient.changeEmail({
        newEmail: email,
        callbackURL,
      });

      if (result?.error) {
        toast.error(result.error.message || 'Não foi possível reenviar a solicitação.');
        return;
      }

      toast.success('Solicitação reenviada. Verifique seu e-mail atual.');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : '';
      if (message.includes('401')) {
        toast.error('Sessão expirada. Faça login novamente.');
        router.push('/login');
        return;
      }

      toast.error('Não foi possível reenviar a solicitação.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="rounded-xl border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">Alteração de e-mail solicitada</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Enviamos um link de confirmação para o seu e-mail atual. Você só concluirá a mudança
          depois de aprovar no link recebido.
        </p>
        {maskedEmail && (
          <p className="mt-2 text-sm text-foreground">
            Novo e-mail solicitado: <span className="font-semibold">{maskedEmail}</span>
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={handleResend}
            disabled={isResending || !email}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {isResending ? 'Reenviando...' : 'Reenviar solicitação'}
          </button>
          <Link
            href="/painel"
            className="rounded-md border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted cursor-pointer"
          >
            Voltar para perfil
          </Link>
        </div>
      </div>
    </div>
  );
}
