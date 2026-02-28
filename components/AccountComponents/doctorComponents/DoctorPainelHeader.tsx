/* eslint-disable @next/next/no-img-element */
'use client';

import { updateDoctorProfilePhoto } from "@/services/doctorService";
import { Camera } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface DoctorPainelHeaderProps {
    doctorProfile: {
        id: string;
        fullName: string;
        crm: string;
        biography: string | null;
        profilePhoto: string | null;
        specialty: string;
    }
}

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";    
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";

export const DoctorPainelHeader = ({ doctorProfile }: DoctorPainelHeaderProps) => {

    const widgetRef = useRef<CloudinaryWidget | null>(null);
 
    const initials = doctorProfile.fullName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);

    const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false);

    const queryClient = useQueryClient();

    const updateProfilePhotoMutation = useMutation({
        mutationFn: (newPhotoUrl: string) => 
            updateDoctorProfilePhoto(newPhotoUrl),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['doctorProfile'] });
            setIsUpdatingPhoto(false);
            toast.success('Foto de perfil atualizada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao atualizar foto de perfil:', error);
            setIsUpdatingPhoto(false);
            toast.error('Erro ao atualizar foto de perfil. Por favor, tente novamente.');
        },
    })

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const initializeWidget = () => {
            if (!window.cloudinary || widgetRef.current) return false;

            widgetRef.current = window.cloudinary.createUploadWidget({
                cloudName: CLOUDINARY_CLOUD_NAME,
                uploadPreset: CLOUDINARY_UPLOAD_PRESET,
                multiple: false,
                folder: 'doctor_profiles',
                maxFileSize: 5 * 1024 * 1024,
                clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
                },
                async (error, result) => {
                    if (error || result.event !== "success") return;

                    const newPhotoUrl = result.info.secure_url;
                    setIsUpdatingPhoto(true);

                    try {
                        await updateProfilePhotoMutation.mutateAsync(newPhotoUrl);
                    } catch (error) {
                        console.error('Erro ao atualizar foto de perfil:', error);
                        setIsUpdatingPhoto(false);
                        toast.error('Erro ao atualizar foto de perfil. Por favor, tente novamente.');
                    }
                }
            );

            return true;
        };

        if (initializeWidget()) return;

        const intervalId = window.setInterval(() => {
            if (initializeWidget()) {
                window.clearInterval(intervalId);
            }
        }, 500);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [updateProfilePhotoMutation]);

    const handleOpenWidget = () => {
        if (isUpdatingPhoto || updateProfilePhotoMutation.isPending) return;
        widgetRef.current?.open();
    };

    return (
        <div className="border shadow-md w-full p-6 rounded-lg bg-primary-foreground/80 flex flex-col md:flex-row gap-3 items-center">
            <button
                type="button"
                onClick={handleOpenWidget}
                disabled={isUpdatingPhoto || updateProfilePhotoMutation.isPending}
                className="relative rounded-full bg-gray-200 w-16 h-16 flex items-center justify-center overflow-hidden group disabled:opacity-70"
                aria-label="Trocar foto de perfil"
                title="Trocar foto"
            >
                {doctorProfile.profilePhoto ? (
                    <img
                        src={doctorProfile.profilePhoto}
                        alt={`Foto de perfil do Dr. ${doctorProfile.fullName}`}
                        className="w-full h-full object-cover rounded-full"
                    />
                ) : (
                    <span className="text-gray-500 text-sm">{initials}</span>
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-4 w-4 text-white" />
                </span>
            </button>
            <div className="flex flex-col gap-1 items-center md:items-start">
                <h2 className="font-bold text-lg">{doctorProfile.fullName}</h2>
                <p className="text-sm text-muted-foreground">{doctorProfile.specialty} - {doctorProfile.crm}</p>
            </div>
        </div>
    )
}
