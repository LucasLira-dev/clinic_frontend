'use client';

import { useQuery } from "@tanstack/react-query";
import { DoctorPainelHeader } from "./doctorComponents/DoctorPainelHeader"
import { getDoctorProfile } from "@/services/doctorService";
import DoctorBiography from "./doctorComponents/DoctorBiography";
import UserEmail from "./userEmail";
import { UserPainelHeader } from "./UserPainelHeader";

interface UserPainelContentProps {
    userEmail: string;
    userRole: string;
    userName: string;
    profilePhoto: string | null;
    createdAt: string;
}

export const UserPainelContent = ({ userEmail, userRole, userName, profilePhoto, createdAt }: UserPainelContentProps) => {

    const { data: doctorProfile, isLoading, isError } = useQuery({
        queryKey: ['doctorProfile'],
        queryFn: getDoctorProfile,
        enabled: userRole === 'doctor',
    })

    if (isLoading) {
        return <div className="flex justify-center items-center h-64 text-muted-foreground">Carregando perfil do médico...</div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-64 text-red-500">Erro ao carregar perfil do médico</div>;
    }

    return (
        <div className="space-y-6 px-6 pb-6 pt-5">
            <div className="flex flex-col gap-2">
                {/* div do header */}
                {
                    userRole === 'doctor' && doctorProfile ? <DoctorPainelHeader doctorProfile={doctorProfile} /> : <UserPainelHeader userName={userName} profilePhoto={profilePhoto} createdAt={createdAt} />
                }
                {
                    userRole === 'doctor' && doctorProfile && (
                        <DoctorBiography initialBiography={doctorProfile?.biography || ''}/>
                    )
                }
                <div className="border shadow-md max-w-2xl p-6 rounded-lg bg-primary-foreground/80 flex flex-col gap-3">
                    <UserEmail initialEmail={userEmail || ''} />
                </div>
            </div>
        </div>
    )
}