/* eslint-disable @next/next/no-img-element */

interface UserPainelHeaderProps {
    userName: string;
    profilePhoto: string | null;
    createdAt: string;
}

export const UserPainelHeader = ({ userName, profilePhoto, createdAt }: UserPainelHeaderProps) => {

    const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div className="border shadow-md w-full p-6 rounded-lg bg-primary-foreground/80 flex flex-col md:flex-row gap-3 items-center">
            <button
                type="button"
                className="relative rounded-full bg-gray-200 w-16 h-16 flex items-center justify-center overflow-hidden group disabled:opacity-70"
                aria-label="Foto de perfil"
            >
                {profilePhoto ? (
                    <img
                        src={profilePhoto}
                        alt={`Foto de perfil do Dr. ${userName}`}
                        className="w-full h-full object-cover rounded-full"
                    />
                ) : (
                    <span className="text-gray-500 text-sm">{initials}</span>
                )}
            </button>
            <div className="flex flex-col gap-1 items-center md:items-start">
                <h2 className="font-bold text-lg">{userName}</h2>
                <p className="text-sm text-muted-foreground">Membro desde {new Date(createdAt).toLocaleDateString('pt-BR')}</p>
            </div>
        </div>
    )
}