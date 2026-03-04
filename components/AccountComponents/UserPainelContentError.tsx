'use client';

import { AlertCircle } from "lucide-react"
import { Button } from "../ui/button"

interface UserPainelContentErrorProps {
    onRetry?: () => void;
    userRole: string;
}

export const UserPainelContentError = ({ onRetry, userRole }: UserPainelContentErrorProps) => {
    return (
        <div className="space-y-6 px-6 pb-6 pt-5">
            <div className="flex flex-col items-center justify-center gap-4 py-12">
                <AlertCircle className="size-12 text-red-500" />
                <div className="text-center space-y-2">
                    <h2 className="text-lg font-semibold">Erro ao carregar perfil</h2>
                    <p className="text-sm text-muted-foreground">
                        {userRole === 'doctor' 
                            ? "Ocorreu um erro ao tentar carregar o perfil do médico." 
                            : "Ocorreu um erro ao tentar carregar seus dados de perfil."}
                    </p>
                </div>
                {onRetry && (
                    <Button 
                        onClick={onRetry}
                        variant="default"
                        className="mt-4"
                    >
                        Tentar novamente
                    </Button>
                )}
            </div>
        </div>
    )
}