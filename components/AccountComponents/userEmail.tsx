'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface DoctorEmailProps {
    initialEmail?: string;
}

const DoctorEmail: React.FC<DoctorEmailProps> = ({
    initialEmail = ''
}) => {
    const router = useRouter();
    const [email, setEmail] = useState(initialEmail);
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEdit = () => setIsEditing(true);

    const handleSave =  async () => {
        try {
            setIsSubmitting(true);
            const callbackURL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/conta/email/alteracao-confirmada?email=${encodeURIComponent(email)}`;
           
            const result = await authClient.changeEmail({
                newEmail: email,
                callbackURL,
            });

            if (result?.error) {
                toast.error(result.error.message || 'Não foi possível alterar o e-mail.');
                return;
            }

            setIsEditing(false);
            router.push(`/conta/email/alteracao-solicitada?email=${encodeURIComponent(email)}`);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : '';

            if (message.includes('401')) {
                toast.error('Sessão expirada. Faça login novamente.');
                return;
            }

            toast.error('Não foi possível alterar o e-mail. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setEmail(initialEmail);
        setIsEditing(false);
    };

    return (
        <div className="p-6 rounded-lg flex flex-col gap-2">
            <h3 className="font-bold text-lg text-primary">Email</h3>
            <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={!isEditing}
                className={`w-full rounded-md border px-3 py-2 text-sm bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-vertical transition ${isEditing ? 'border-primary' : 'border-muted-foreground/30 text-primary bg-muted'} `}
                aria-label="Email do médico"
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
                            disabled={isSubmitting}
                            
                        >
                            {isSubmitting ? 'Salvando...' : 'Salvar'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default DoctorEmail;
