import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

interface AppointmentDialogProps {
open: boolean;
name: string;
date: string;
hour: string;
onConfirm: () => void;
onCancel: () => void;
isLoading?: boolean;
type?: 'cancel' | 'complete';
}

export default function AppointmentDialog({
open,
name,
date,
hour,
onConfirm,
onCancel,
isLoading = false,
type = 'cancel',
}: AppointmentDialogProps) {
return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onCancel(); }}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{type === 'cancel' ? 'Confirmar Cancelamento' : 'Confirmar Conclusão'}</DialogTitle>
            </DialogHeader>
            <div className="text-sm text-muted-foreground">
                Tem certeza de que deseja {type === 'cancel' ? 'cancelar' : 'concluir'} esta consulta com o paciente <strong>{name}</strong> no dia {date} às {hour}?
                <br />
                Esta ação não pode ser desfeita.
            </div>
            <div className="flex justify-end space-x-2 pt-4">
                <Button onClick={onCancel} disabled={isLoading} className='cursor-pointer'>
                    Desistir
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="destructive"
                    disabled={isLoading}
                    className='cursor-pointer'
                >
                    {isLoading ? (type === 'cancel' ? 'Cancelando...' : 'Concluindo...') : (type === 'cancel' ? 'Cancelar consulta' : 'Concluir consulta')}
                </Button>
            </div>
        </DialogContent>
    </Dialog>
);
}