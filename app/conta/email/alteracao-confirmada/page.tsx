'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

function maskEmail(email: string) {
  const [local, domain] = email.split('@');
  if (!local || !domain) return email;
  if (local.length <= 2) return `${local[0] ?? '*'}***@${domain}`;
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

function getVerificationErrorMessage(errorCode: string) {
  if (errorCode === 'token_expired') {
    return 'Este link expirou. Enviaremos uma nova solicitação para você continuar a troca de e-mail.';
  }

  if (errorCode === 'invalid_token') {
    return 'Este link é inválido. Solicite um novo link para concluir a troca de e-mail.';
  }

  return 'Não foi possível concluir a verificação deste link. Solicite um novo link para continuar.';
}

function EmailChangeConfirmedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isResending, setIsResending] = useState(false);
  const [autoResendAttempted, setAutoResendAttempted] = useState(false);

  const { data: sessionData, isPending: isSessionLoading } = authClient.useSession();
  const email = searchParams.get('email') ?? '';
  const errorCode = searchParams.get('error') ?? '';
  const hasVerificationError = Boolean(errorCode);
  const profilePath = sessionData?.user?.role === 'doctor' ? '/painel' : '/configuracoes';
  const callbackURL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/conta/email/alteracao-confirmada?email=${encodeURIComponent(email)}`;
  const maskedEmail = useMemo(() => (email ? maskEmail(email) : ''), [email]);

  const resendChangeEmailRequest = async (showSuccessToast = true) => {
    if (!email) {
      toast.error('E-mail não encontrado. Volte ao perfil e tente novamente.');
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

      if (showSuccessToast) {
        toast.success('Solicitação reenviada. Verifique seu e-mail atual.');
      }
      router.push(`/conta/email/alteracao-solicitada?email=${encodeURIComponent(email)}`);
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

  useEffect(() => {
    if (autoResendAttempted || !sessionData || !hasVerificationError || !email) {
      return;
    }

    if (errorCode === 'token_expired') {
      setAutoResendAttempted(true);
      void resendChangeEmailRequest(false);
    }
  }, [autoResendAttempted, email, errorCode, hasVerificationError, sessionData]);

  if (isSessionLoading) {
    return <div className="flex min-h-screen items-center justify-center">Carregando...</div>;
  }

  if (!sessionData) {
    router.push('/login');
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="rounded-xl border bg-card p-8 shadow-sm">
        {hasVerificationError ? (
          <>
            <h1 className="text-2xl font-bold text-foreground">Link de verificação expirado</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {getVerificationErrorMessage(errorCode)}
            </p>
            {maskedEmail && (
              <p className="mt-2 text-sm text-foreground">
                E-mail solicitado: <span className="font-semibold">{maskedEmail}</span>
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => void resendChangeEmailRequest()}
                disabled={isResending || !email}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {isResending ? 'Reenviando...' : 'Reenviar solicitação'}
              </button>
              <Link
                href={profilePath}
                className="rounded-md border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted cursor-pointer"
              >
                Voltar para perfil
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-foreground">Confirmação iniciada</h1>
            <p className="mt-3 mb-4 text-sm text-muted-foreground">
              A troca foi aprovada no e-mail atual. Agora, um e-mail de confirmação foi enviado para o novo endereço. Por favor, verifique sua caixa de entrada e clique no link de confirmação para concluir a troca de e-mail.
            </p>

            <span className="mt-6 text-sm font-bold text-red-500">
              Caso já tenha feito isso, você pode clicar nos botões abaixo para continuar.
            </span>

            <div className="mt-6 flex flex-col md:flex-row flex-wrap gap-3">
              <Link
                href={profilePath}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 text-center cursor-pointer"
              >
                Ir para perfil
              </Link>
              <Link
                href="/"
                className="rounded-md border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted text-center cursor-pointer"
              >
                Ir para dashboard
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function EmailChangeConfirmedPageWrapper() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Carregando...</div>}>
      <EmailChangeConfirmedPage />
    </Suspense>
  );
}
