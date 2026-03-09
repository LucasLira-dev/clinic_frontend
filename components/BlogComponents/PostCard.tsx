import Link from "next/link";
import { Separator } from "../ui/separator"

interface PostCardProps {
    id: string;
    title: string;
    description: string;
    tag: string;
    doctor: {
        fullName: string;
        profilePhoto?: string;
        specialty: string;
    }
    createdAt: string;
}

export const PostCard = (props: PostCardProps) => {
    const { title, description, doctor, tag, createdAt, id } = props;
    const doctorInitials = doctor.fullName.split(" ").map(n => n[0]).join("").toUpperCase();

    return (
            <div>
                <Link
                href={`/blog/${id}`}
                className="cursor-pointer sw-full h-full flex flex-col gap-1 p-4 rounded-lg border-2 hover:border-chart-2 hover:shadow-lg transition-shadow">
                    <span className="bg-chart-2 px-2 py-0.5 rounded-full inline-flex items-center gap-1 self-start mb-2">
                        <span className="text-[11px] font-medium text-white">{tag}</span>
                    </span>
                    <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
                    <p className="text-xs leading-5 text-muted-foreground line-clamp-3">
                        {description}
                    </p>
                    <Separator className="mt-4" />
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-muted">
                            {/* Placeholder para a foto do medico */}
                            {doctor.profilePhoto ?
                                (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={doctor.profilePhoto}
                                        alt="Foto do Medico"
                                        className="rounded-full object-cover w-9 h-9" />)
                                :
                                (
                                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                                        <span className="text-xs font-medium text-muted-foreground">{doctorInitials}</span>
                                    </div>
                                )}
                        </div>
                        <div>
                            <h3 className="text-xs font-medium">{doctor.fullName}</h3>
                            <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{createdAt}</p>

                </Link>
            </div>
        
    )
}