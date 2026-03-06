'use client';

import { X } from "lucide-react"
import { Button } from "../ui/button"
import AppointmentDialog from "./AppointmentDialog";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAppointment } from "@/services/appointmentsService";
import { toast } from "sonner";

interface CancelAppointmentButtonProps {
    name: string;
    date: string;
    hour: string;
    appointmentId: string;
    userId: string;
    userRole: string;
    disabled?: boolean;
}

export const CancelAppointmentButton = ({ name, date, hour, appointmentId, userId, userRole, disabled }: CancelAppointmentButtonProps) => {

    const [openDialog, setOpenDialog] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const queryClient = useQueryClient();

    const cancelAppointmentMutation = useMutation({
        mutationFn: (payload: { appointmentId: string }) => 
            cancelAppointment(payload.appointmentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments', userRole, userId] });
            queryClient.invalidateQueries({ queryKey: ['appointment-details', appointmentId] });
            setIsCancelling(false);
            setOpenDialog(false);
                toast.success('Consulta cancelada com sucesso!');
        },
        onError: () => {
            setIsCancelling(false);
            setOpenDialog(false);
            toast.error('Erro ao cancelar consulta. Por favor, tente novamente.');
        },
   });

    const handleCancel = async() => {
        setIsCancelling(true);

        try {
            await cancelAppointmentMutation.mutateAsync({ appointmentId });
        } catch (error) {
            console.error('Erro ao cancelar consulta:', error);
            setIsCancelling(false);
        }
    }

    return (
        <div>
            <Button variant="destructive" className="w-full flex items-center md:w-70 cursor-pointer" onClick={() => setOpenDialog(true)} disabled={disabled}>
                <X className="size-4" />
                Cancelar consulta
            </Button>

            <AppointmentDialog
                open={openDialog}
                isLoading={isCancelling}
                onCancel={() => setOpenDialog(false)}
                onConfirm={handleCancel}
                name={name}
                date={date}
                hour={hour}
                type="cancel"
             />
        </div>
    )
}