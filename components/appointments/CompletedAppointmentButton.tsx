'use client'

import { Check } from "lucide-react"
import { Button } from "../ui/button"
import AppointmentDialog from "./AppointmentDialog"
import { completeAppointment } from "@/services/appointmentsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface CompletedAppointmentButtonProps {
    patientName: string;
    date: string;
    hour: string;
    appointmentId: string;
    userId: string;
    userRole: string;
    disabled?: boolean;
}

export const CompletedAppointmentButton = (props: CompletedAppointmentButtonProps) => {
    const { patientName, date, hour, appointmentId, userId, userRole, disabled } = props;

    const [openDialog, setOpenDialog] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const queryClient = useQueryClient();

    const completeAppointmentMutation = useMutation({
        mutationFn: (payload: { appointmentId: string }) => 
            completeAppointment(payload.appointmentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments', userRole, userId] });
            queryClient.invalidateQueries({ queryKey: ['appointment-details', appointmentId] });
            setIsCancelling(false);
            setOpenDialog(false);
                toast.success('Consulta concluída com sucesso!');
        },
        onError: () => {
            setIsCancelling(false);
            setOpenDialog(false);
            toast.error('Erro ao concluir consulta. Por favor, tente novamente.');
        },
   });

    const handleComplete = async() => {
        setIsCancelling(true);

        try {
            await completeAppointmentMutation.mutateAsync({ appointmentId });
        } catch (error) {
            console.error('Erro ao concluir consulta:', error);
            setIsCancelling(false);
        }
    }

    return (
        <div>
            <Button variant="default" className="w-full flex items-center md:w-70 cursor-pointer" onClick={() => setOpenDialog(true)} disabled={disabled}>
                <Check className="size-4" />
                Consulta realizada
            </Button>

            <AppointmentDialog
                open={openDialog}
                isLoading={isCancelling}
                onCancel={() => setOpenDialog(false)}
                onConfirm={handleComplete}
                name={patientName}
                date={date}
                hour={hour}
                type="complete"
             />
        </div>
    )
}