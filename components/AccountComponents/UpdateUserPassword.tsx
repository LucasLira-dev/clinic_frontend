'use client';

import { useState } from "react";
import { Eye, EyeOff } from "../ui/icons";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";


export const UpdateUserPassword = ({ hasSocialLogin }: { hasSocialLogin: boolean }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isDisabled = hasSocialLogin || isSubmitting || !currentPassword || !newPassword || !confirmNewPassword;

    const handleSave = async () => {

        if (newPassword !== confirmNewPassword) {
            toast.error('A nova senha e a confirmação não coincidem. Por favor, verifique e tente novamente.');
            return;
        }

        if (newPassword.length < 8) {
            toast.error('A nova senha deve ter pelo menos 8 caracteres.');
            return;
        }

        if (currentPassword.trim() === '' || newPassword.trim() === '' || confirmNewPassword.trim() === '') {
            toast.error('Por favor, preencha todos os campos.');
            return;
        }

        if (newPassword === currentPassword) {
            toast.error('A nova senha deve ser diferente da senha atual.');
            return;
        }

        try {
            setIsSubmitting(true);
            const { error } = await authClient.changePassword({
                newPassword: newPassword,
                currentPassword: currentPassword,
                revokeOtherSessions: true,
            })

            if (error) {
                setIsSubmitting(false);
                toast.error(error.message || 'Não foi possível atualizar a senha. Verifique suas credenciais e tente novamente.');
            }

            setIsSubmitting(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            toast.success('Senha atualizada com sucesso! Todas as outras sessões foram revogadas.');
        }
        catch (error) {
            toast.error('Não foi possível atualizar a senha. Tente novamente mais tarde.');
            setIsSubmitting(false);
            console.log("Error updating password:", error);
        }
    }

    return (
        <div className="border shadow-md w-full p-6 rounded-lg bg-primary-foreground/80 flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Atualizar Senha</h2>
            <p className="text-sm text-muted-foreground">Mantenha sua conta segura atualizando sua senha regularmente.</p>
            {/* Formulário de atualização de senha aqui */}
                <div className="relative">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-foreground">Senha Atual</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="currentPassword"
                        value={currentPassword}
                        className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/40 transition disabled:bg-muted disabled:cursor-not-allowed"
                        placeholder="Digite sua senha atual"
                        disabled={hasSocialLogin}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                   <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors mt-3"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye  size={18} />}
                    </button>
                </div>
                <div className="relative">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-foreground">Nova Senha</label>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        value={newPassword}
                        className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/40 transition disabled:bg-muted disabled:cursor-not-allowed"
                        placeholder="Digite sua nova senha"
                        disabled={hasSocialLogin}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors mt-3"
                        aria-label={showNewPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye  size={18} />}
                    </button>
                </div>
                <div className="relative">
                    <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-foreground">Confirmar Nova Senha</label>
                    <input
                        type={showConfirmNewPassword ? "text" : "password"}
                        id="confirmNewPassword"
                        value={confirmNewPassword}
                        className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/40 transition disabled:bg-muted disabled:cursor-not-allowed"
                        placeholder="Confirme sua nova senha"
                        disabled={hasSocialLogin}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors mt-3"
                        aria-label={showConfirmNewPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                        {showConfirmNewPassword ? <EyeOff size={18} /> : <Eye  size={18} />}
                    </button>
                </div>
                {
                    hasSocialLogin && (
                        <p className="text-sm text-red-600 mt-2">
                            Você está usando um login social. A atualização de senha não está disponível para contas vinculadas a provedores externos.
                        </p>
                    )
                }
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 rounded-md bg-chart-2 text-white font-medium hover:bg-chart-2/80 transition cursor-pointer max-w-60 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isDisabled}
                    onClick={handleSave}
                >
                    {isSubmitting ? 'Atualizando...' : 'Atualizar'}
                </button>
        </div>
    )
}