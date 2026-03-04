'use client';

import { useQuery } from "@tanstack/react-query";
import { DoctorPainelHeader } from "./doctorComponents/DoctorPainelHeader"
import { getDoctorProfile } from "@/services/doctorService";
import DoctorBiography from "./doctorComponents/DoctorBiography";
import UserEmail from "./userEmail";
import { UserPainelHeader } from "./UserPainelHeader";
import { UpdateUserPassword } from "./UpdateUserPassword";
import { DeleteAccount } from "./DeleteAccount";
import { useIsMobile } from "@/hooks/use-mobile";
import { DoctorsBlogHighlight } from "./DoctorsBlogHighlight";
import { UserPainelContentSkeleton } from "../skeletons/UserPainelContentSkeleton";
import { UserPainelContentError } from "./UserPainelContentError";

interface UserPainelContentProps {
    userEmail: string;
    userRole: string;
    userName: string;
    profilePhoto: string | null;
    createdAt: string;
    hasSocialLogin: boolean;
}

export const UserPainelContent = ({ userEmail, userRole, userName, profilePhoto, createdAt, hasSocialLogin }: UserPainelContentProps) => {

    const isMobile = useIsMobile();

    const { data: doctorProfile, isLoading, isError, refetch } = useQuery({
        queryKey: ['doctorProfile'],
        queryFn: getDoctorProfile,
        enabled: userRole === 'doctor',
    })

    if (isLoading) {
        return <UserPainelContentSkeleton />
    }

    if (isError) {
        return <UserPainelContentError onRetry={refetch} userRole={userRole} />;
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
                {isMobile ? (
                    <div className="flex flex-col md:flex-row gap-6">
                        <UserEmail initialEmail={userEmail || ''} />
                        {
                            hasSocialLogin ? <DoctorsBlogHighlight /> : <UpdateUserPassword hasSocialLogin={hasSocialLogin} />
                        }
                        <DeleteAccount userName={userName} />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6">
                            <UserEmail initialEmail={userEmail || ''} />
                            <DeleteAccount userName={userName} />
                        </div>
                        {
                            hasSocialLogin ? <DoctorsBlogHighlight /> : <UpdateUserPassword hasSocialLogin={hasSocialLogin} />
                        }
                    </div>
                )}
            </div>
        </div>
    )
}
