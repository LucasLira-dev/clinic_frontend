'use client';

import { useState } from "react";

import ConfirmDeleteDialog from "../adminComponents/ConfirmDeleteDialog";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteAccountProps {
    userName: string;
}

export const DeleteAccount = ({ userName }: DeleteAccountProps) => {

    const [openDialog, setOpenDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const router = useRouter();
    
    const handleDeleteAccount = async () => {
        try {
            setIsDeleting(true);
            const { error } = await authClient.deleteUser({
                callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`,
            });

            router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/conta/email/confirmar-exclusao`);
            
            if (error) {
                toast.error(error.message || 'Erro ao excluir conta');
            }

        } catch (error) {
            console.error("Erro ao excluir conta:", error);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="p-6 rounded-lg w-full flex flex-col gap-4 border shadow-md bg-primary-foreground/80 ">
            <h3 className="font-bold text-lg text-primary">Excluir Conta</h3>
            <p className="text-sm text-muted-foreground">
                Excluir sua conta é uma ação permanente e irreversível. Todos os seus dados, incluindo informações pessoais, histórico de consultas e registros médicos, serão permanentemente apagados. Certifique-se de fazer backup de qualquer informação importante antes de prosseguir com a exclusão da conta.
            </p>
            <Button
            variant="destructive"
            className="text-white font-bold py-2 px-4 rounded-md cursor-pointer max-w-40 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setOpenDialog(true)}>
                Excluir Conta
            </Button>

            <ConfirmDeleteDialog
                open={openDialog}
                isLoading={isDeleting}
                userName={userName}
                onCancel={() => setOpenDialog(false)}
                onConfirm={handleDeleteAccount}
            />
        </div>
    );
}