'use client';

import { useState } from "react";
import { Button } from "../ui/button"
import { authClient } from "@/lib/auth-client"


type SocialLoginProps = {
    disabled?: boolean
    onLoadingChange?: (loading: boolean) => void
}

export const SocialLogin = ({ disabled = false, onLoadingChange }: SocialLoginProps) => {

    const [activeProvider, setActiveProvider] = useState<'google' | 'github' | null>(null)
    const [error, setError] = useState<string | null>(null)
    const isLoading = activeProvider !== null

    const handleSocialLogin = async (provider: 'google' | 'github') => {
        if (disabled || isLoading) {
            return
        }

        try {
            setError(null)
            setActiveProvider(provider)
            onLoadingChange?.(true)

            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
            })

            if (error) {
                setError(error.message || "Ocorreu um erro ao tentar fazer login com a conta social.")
            }
        }
        catch (error) {
            console.log("Social login error:", error)
            setError("Ocorreu um erro ao tentar fazer login com a conta social. Por favor, tente novamente.")
        }
        finally {
            setActiveProvider(null)
            onLoadingChange?.(false)
        }
    }

    return (
        <>
        {
            error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
            )
        }
        <div className="flex flex-col md:flex-row gap-3 w-full mt-5">
            <Button 
            variant="outline" 
            className="w-full md:w-1/2 gap-2 border-border bg-card text-foreground hover:bg-muted hover:text-emerald-700 cursor-pointer"
            onClick={() => handleSocialLogin('google')}
            disabled={disabled || isLoading}>
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                    />
                    <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                    />
                    <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                    />
                    <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                    />
                </svg>
                { activeProvider === "google" ? "Carregando..." : "Continuar com Google" }
            </Button>
            <Button 
            variant="outline" 
            className="w-full md:w-1/2 gap-2 border-border bg-card text-foreground hover:bg-muted hover:text-emerald-700 cursor-pointer" 
            onClick={() => handleSocialLogin('github')}
            disabled={disabled || isLoading}>
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.47715 2 2 6.47715 2 12C2 16.4183 4.86584 20.1667 8.83984 21.5C9.33984 21.5833 9.55984 21.25 9.55984 20.9583C9.55984 20.7083 9.54984 20.125 9.54484 19.2917C6.76584 19.9583 6.17584 18.625 6.17584 18.625C5.72584 17.2083 5.03584 16.875 5.03584 16.875C4.16584 16.2083 5.11584 16.2083 5.11584 16.2083C6.08584 16.2917 6.56584 17.2083 6.56584 17.2083C7.43584 18.625 8.90584 18.125 9.38584 17.8333C9.46584 17.1667 9.76584 16.7083 10.0958 16.4167C7.42584 16.125 4.63584 15.125 4.63584 11.4167C4.63584 10.125 5.10584 9.12501 5.88584 8.33334C5.78584 8.04167 5.38584 6.83334 5.98584 5.20834C5.98584 5.20834 6.98584 4.91667 9.54584 6.625C10.5458 6.33334 11.5958 6.20834 12.6458 6.20834C13.6958 6.20834 14.7458 6.33334 15.7458 6.625C18.3058 4.91667 19.3058 5.20834 19.3058 5.20834C19.9058 6.83334 19.5058 8.04167 19.4058 8.33334C20.1858 9.12501 20.6558 10.125 20.6558 11.4167C20.6558 15.125 17.8658 16.125 15.1958 16.4167C15.6258 16.7083 15.9858 17.2917 15.9858 18.2083C15.9858 19.625 15.9758 20.7083 15.9758 20.9583C15.9758 21.25 16.1958 21.5833 16.6958 21.5C20.6698 20.1667 23.5356 16.4183 23.5356 12C23.5356 6.47715 19.0584 2 13.5356 2H12Z"
                    fill="#333333"
                    />
                </svg>
                { activeProvider === "github" ? "Carregando..." : "Continuar com GitHub" }
            </Button>
      </div>
      </>
    )
}
