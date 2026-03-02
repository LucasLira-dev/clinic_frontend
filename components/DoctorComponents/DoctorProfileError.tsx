'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react"

interface DoctorProfileErrorProps {
  onRetry?: () => void
}

export function DoctorProfileError({ onRetry }: DoctorProfileErrorProps) {
  return (
    <div className="mx-auto mt-5 grid w-full max-w-6xl gap-6 px-6">
      <Card className="p-0">
        <CardContent className="flex flex-col items-center justify-center gap-4 px-5 py-16 md:px-6">
          <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-8 text-destructive" />
          </div>

          <div className="space-y-1 text-center">
            <h2 className="text-xl font-semibold tracking-tight">
              Erro ao carregar perfil do médico
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Não foi possível carregar os detalhes deste médico. Verifique sua conexão e tente novamente.
            </p>
          </div>

          <div className="flex gap-3 mt-2">
            {onRetry && (
              <Button variant="default" onClick={onRetry} className="gap-2">
                <RefreshCw className="size-4" />
                Tentar novamente
              </Button>
            )}
            <Button variant="outline" asChild className="gap-2">
              <Link href="/medicos">
                <ArrowLeft className="size-4" />
                Voltar para médicos
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
