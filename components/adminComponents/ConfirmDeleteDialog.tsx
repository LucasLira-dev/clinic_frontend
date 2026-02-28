import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

interface ConfirmDeleteDialogProps {
open: boolean;
userName: string;
onConfirm: () => void;
onCancel: () => void;
isLoading?: boolean;
}

export default function ConfirmDeleteDialog({
open,
userName,
onConfirm,
onCancel,
isLoading = false,
}: ConfirmDeleteDialogProps) {
return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onCancel(); }}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
            </DialogHeader>
            <div className="text-sm text-muted-foreground">
                Tem certeza de que deseja deletar este usuário <strong>{userName}</strong>?
                <br />
                Esta ação não pode ser desfeita.
            </div>
            <div className="flex justify-end space-x-2 pt-4">
                <Button onClick={onCancel} disabled={isLoading} className='cursor-pointer font-bold'>
                    Cancelar
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="destructive"
                    disabled={isLoading}
                    className='cursor-pointer font-bold'
                >
                    {isLoading ? 'Deletando...' : 'Deletar'}
                </Button>
            </div>
        </DialogContent>
    </Dialog>
);
}