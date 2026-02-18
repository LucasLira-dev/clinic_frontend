import { Apresentation } from "@/components/auth/Apresentation";
import { LoginForm } from "@/components/auth/LoginForm";
import { SocialLogin } from "@/components/auth/SocialLogin";
import { Separator } from "@/components/ui/separator";
import { Stethoscope } from "lucide-react";
import Link from "next/link";

export default function Login() {
    return (
        <div className="lg:flex flex-row w-full h-screen">
            <div className="hidden lg:flex w-full">
                <Apresentation />
            </div>
            <div
                className="bg-background w-full flex flex-col justify-center items-center p-8 min-h-screen gap-4">
                <div className="flex flex-col justify-center items-center gap-2 max-w-md w-full">
                    <div className="flex gap-3 items-center lg:hidden">
                        <div className="bg-chart-2 p-2 rounded-lg">
                            <Stethoscope className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-foreground font-bold text-lg"> ClinicFlow </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 mt-6">
                        <h1 className="text-foreground font-bold text-xl">
                            Bem-vindo de volta!
                        </h1>
                        <p className="text-muted-foreground text-sm ">
                            Entre na sua conta para acessar a plataforma
                        </p>
                        <SocialLogin />
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-5 w-full">
                        <Separator className="flex-1" />
                        <span className="text-xs text-muted-foreground">ou</span>
                        <Separator className="flex-1" />
                    </div>
                    <LoginForm />
                    <div className="text-sm text-muted-foreground mt-4">
                        Não tem uma conta?{" "}
                        <Link
                            href="/register"
                            className="text-chart-2 hover:underline">
                            Cadastre-se
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}