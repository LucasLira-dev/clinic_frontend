'use client';

import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "@/services/adminService"
import { useState } from "react"
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface DeleteButtonProps {
    userType: 'doctor' | 'patient';
    userId: string;
    userName: string;
}

export const DeleteButton = ({ userId, userType, userName }: DeleteButtonProps) => {

    const [openDialog, setOpenDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
    const openConfirmDialog = () => {
        setOpenDialog(true);
    }

    const queryClient = useQueryClient();

    const handleDeleteAccount = async () => {
        try {
            setIsDeleting(true);
            await deleteUser(userId);
            if (userType === 'doctor') {
                queryClient.invalidateQueries({ queryKey: ['doctors'] });
            } else {
                queryClient.invalidateQueries({ queryKey: ['patients'] });
            }  
            setOpenDialog(false);         
            toast.success('Conta deletada com sucesso!');
        }
        catch (error) {
            console.error('Erro ao deletar conta:', error);
            toast.error('Erro ao deletar conta. Por favor, tente novamente.');
        }
        finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="flex justify-end gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={openConfirmDialog}
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
            >
                <Trash2 className="size-4" />
            </Button>

            <ConfirmDeleteDialog
                open={openDialog}
                isLoading={isDeleting}
                userName={userName}
                onCancel={() => setOpenDialog(false)}
                onConfirm={handleDeleteAccount}
            />
        </div>
    )
}