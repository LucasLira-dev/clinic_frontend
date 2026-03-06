'use client';

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardErrorProps {
    onRetry?: () => void;
}

export function DashboardError({ onRetry }: DashboardErrorProps) {
    return (
        <div className="space-y-6 px-6 pb-6 pt-5">
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-destructive/30 bg-destructive/5 p-10 text-center">
                <AlertCircle className="size-10 text-destructive" />
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-destructive">
                        Erro ao carregar o painel
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-sm">
                        Não foi possível carregar as estatísticas do painel. Verifique sua conexão e tente novamente.
                    </p>
                </div>
                {onRetry && (
                    <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
                        Tentar novamente
                    </Button>
                )}
            </div>
        </div>
    );
}
