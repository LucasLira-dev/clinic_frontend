'use client';

import { useMutation } from "@tanstack/react-query";
import { updateDoctorBiography } from "@/services/doctorService";
import { toast } from "sonner";

import React, { useState } from 'react';

interface DoctorBiographyProps {
    initialBiography?: string;
}

const DoctorBiography: React.FC<DoctorBiographyProps> = ({
    initialBiography = ''
}) => {
    const [biography, setBiography] = useState(initialBiography);
    const [isEditing, setIsEditing] = useState(false);;

    const handleEdit = () => setIsEditing(true);

    const updateBiographyMutation = useMutation({
        mutationFn: (newBiography: string) =>
            updateDoctorBiography(newBiography),
        onSuccess: () => {
            setIsEditing(false);
            toast.success('Biografia atualizada com sucesso!');
        },
        onError: () => {
            toast.error('Erro ao atualizar biografia. Por favor, tente novamente.');
        },
    })

    const handleSave = () => {
        if (biography.trim() === '') {
            toast.error('A biografia não pode ser vazia.');
            return;
        }

        if (biography === initialBiography) {
            setIsEditing(false);
            return;
        }

        updateBiographyMutation.mutate(biography);
    };

    const handleCancel = () => {
        setBiography(initialBiography);
        setIsEditing(false);
    };

    return (
        <div className="w-full p-6 rounded-lg flex flex-col gap-2">
            <h3 className="font-bold text-lg text-primary">Biografia</h3>
            <textarea
                value={biography}
                onChange={e => setBiography(e.target.value)}
                disabled={!isEditing}
                rows={5}
                className={`w-full rounded-md border px-3 py-2 text-sm bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-vertical transition ${isEditing ? 'border-primary' : 'border-muted-foreground/30 text-muted-foreground bg-muted'} `}
                aria-label="Biografia do médico"
            />
            <div className="flex justify-end gap-2">
                {!isEditing ? (
                    <button
                        onClick={handleEdit}
                        className="px-4 py-2 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition cursor-pointer"
                    >
                        Editar
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 rounded-md bg-muted text-gray-700 font-medium hover:bg-gray-200 border border-gray-300 transition cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition cursor-pointer"
                            disabled={biography.trim() === '' || biography === initialBiography || updateBiographyMutation.isPending}
                        >
                            {updateBiographyMutation.isPending ? 'Salvando...' : 'Salvar'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default DoctorBiography;