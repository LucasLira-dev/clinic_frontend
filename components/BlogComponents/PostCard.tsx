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
                className="cursor-pointer sw-full h-full flex flex-col gap-2 p-6 rounded-lg border-2 hover:border-chart-2 hover:shadow-lg transition-shadow">
                    <span className="bg-chart-2 px-2 py-1 rounded-full inline-flex items-center gap-1 self-start">
                        <span className="text-[12px] font-medium text-white">{tag}</span>
                    </span>
                    <h3 className="text-md font-semibold tracking-tight">{title}</h3>
                    <p className="text-base leading-7 text-muted-foreground">
                        {description}
                    </p>
                    <Separator className="mt-10" />
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-muted">
                            {/* Placeholder para a foto do medico */}
                            {doctor.profilePhoto ?
                                (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={doctor.profilePhoto}
                                        alt="Foto do Medico"
                                        className="rounded-full object-cover w-12 h-12" />)
                                :
                                (
                                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                        <span className="text-xs font-medium text-muted-foreground">{doctorInitials}</span>
                                    </div>
                                )}
                        </div>
                        <div>
                            <h3 className="text-md font-medium">{doctor.fullName}</h3>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{createdAt}</p>

                </Link>
            </div>
        
    )
}