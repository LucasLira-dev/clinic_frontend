'use client';

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "../ui/label"
import { LoginSchema, LoginSchemaType  } from "@/lib/schema"
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
    const router = useRouter()

    const { register, handleSubmit, formState: { isSubmitting, errors, touchedFields }} = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        mode: 'onTouched',
    })

    const [error, setError ] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)


    const onSubmit = async (data: LoginSchemaType) => {
        try {
            const result = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            })
            
            if (result.error) {
                // Mensagem genérica para evitar user enumeration
                setError("Email ou senha incorretos.")
            } else {
                router.push('/')
            }
        }
        catch (error){
            setError("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.")
        }
    }

    return (
        <form className="flex flex-col gap-4 w-full mt-5" onSubmit={handleSubmit(onSubmit)}>
            {
                error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                )
            }
            <div className="flex flex-col gap-3">
                <Label htmlFor="email" className="font-medium">E-mail</Label>
                <input
                    type="email"
                    id="email"
                    className={`w-full rounded-md border ${errors.email && touchedFields.email ? 'border-red-500' : 'border-input'} bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                    placeholder="seu@email.com"
                    {...register("email")}
                />
                {errors.email && touchedFields.email && (
                    <span className="text-red-500 text-xs">{errors.email.message}</span>
                )}
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="password" className="font-medium">Senha</Label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className={`w-full rounded-md border ${errors.password && touchedFields.password ? 'border-red-500' : 'border-input'} bg-transparent px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                        placeholder="********"
                        {...register("password")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.password && touchedFields.password && (
                    <span className="text-red-500 text-xs">{errors.password.message}</span>
                )}
            </div>
            <button
                type="submit"
                className="w-full rounded-md bg-chart-2 px-3 py-2 text-sm font-medium text-white hover:bg-chart-2/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2 cursor-pointer"
                disabled={isSubmitting}
            >
                Entrar
            </button>
        </form>
    )
}