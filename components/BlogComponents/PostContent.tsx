'use client';

import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { CalendarPlus2, Trash2 } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePostById, getPostById } from "@/services/blogService";
import { PostContentSkeleton } from "../skeletons/PostContentSkeleton";
import { PostContentError } from "./PostContentError";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PostContentProps {
    postId: string;
    userRole?: string;
}

export const PostContent = ({postId, userRole}: PostContentProps) => {

    const queryClient = useQueryClient();
    const router = useRouter();

    const {data: postData, isLoading, error, refetch} = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostById(postId),
    })

    const { mutate: deletePost, isPending: isDeleting } = useMutation({
        mutationFn: () => deletePostById(postId),
        onSuccess: () => {
            toast.success('Post deletado com sucesso');
            queryClient.invalidateQueries({ queryKey: ['blogPosts']});
            queryClient.invalidateQueries({ queryKey: ['post', postId]});
            router.push('/blog');
        },
        onError: () => {
            toast.error('Erro ao deletar o post');
        }
    })

    if (isLoading) {
        return <PostContentSkeleton visibleFooter={userRole === 'patient' || userRole === 'admin'}/>
    }

    if (error) {
        return <PostContentError onRetry={refetch} />
    }

    const doctorInitials = postData?.doctorProfile.fullName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);

    const date = new Date(postData?.createdAt || '');
    const publicationDate = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    const canDelete = userRole === 'doctor' && postData?.doctorProfile.id === postData?.doctorProfile.id || userRole === 'admin';

    return (
        <div className="mx-auto mt-5 grid w-full max-w-6xl gap-6 px-6">
            <Card className="overflow-hidden p-0">
                <div className="h-24 w-full bg-chart-2/20" />

                <CardContent className="space-y-6 px-5 pb-6 pt-0 md:px-6">
                    <div className="-mt-10 flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-muted">
                                {/* Placeholder para a foto do medico */}
                                {postData?.doctorProfile.profilePhoto ?
                                    (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={postData.doctorProfile.profilePhoto}
                                            alt="Foto do Medico"
                                            className="rounded-full object-cover w-12 h-12" />)
                                    :
                                    (
                                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                            <span className="text-xs font-medium text-muted-foreground">{doctorInitials}</span>
                                        </div>
                                    )}
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-lg font-semibold tracking-tight">{postData?.doctorProfile.fullName}</h2>
                                <p className="text-sm text-muted-foreground">{postData?.doctorProfile.specialty}</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Publicado em {publicationDate}</p>

                        {canDelete && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="cursor-pointer mt-6 max-w-30 justify-center"
                                        disabled={isDeleting}
                                    >
                                        <Trash2 className="size-4 mr-1" />
                                        Deletar
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle >Deseja realmente deletar este post?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Essa ação não pode ser desfeita.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => deletePost()}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                            {isDeleting ? 'Deletando...' : 'Deletar'}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                            <h1 className="text-2xl font-bold tracking-tight">{postData?.title}</h1>
                            <span className="bg-chart-2 text-primary-foreground px-3 py-1 rounded-full text-xs max-w-42.5 text-center">{postData?.tag}</span>
                        </div>
                        <p className="text-md text-muted-foreground mt-2">{postData?.description}</p>
                    </div>

                    <div className="prose max-w-none border-b pb-9" style={{ whiteSpace: 'pre-line' }}>
                        {postData?.content}
                    </div>
                </CardContent>

                {
                    userRole !== 'patient' && userRole !== 'admin' ? null : (
                        <CardFooter className="flex bg-chart-2/20 rounded-md p-6 m-8 mr-8 justify-center">
                            <div className="flex flex-col gap-1 justify-center items-center">
                                <span className="text-lg font-semibold"> Gostou do artigo?</span>
                                <span className="text-sm text-muted-foreground"> Agende uma consulta com o Dr. {postData?.doctorProfile.fullName}</span>
                                <Button variant="default" className="bg-chart-2 hover:bg-chart-2/70 cursor-pointer mt-2">
                                    <Link href={`/agendar?doctorId=${postData?.doctorProfile.id}`} className="flex gap-2 items-center">
                                        <CalendarPlus2 className="size-4" />
                                        <span className="text-sm font-semibold"> Agendar Consulta </span>
                                    </Link>
                                </Button>
                            </div>
                        </CardFooter>
                    )
                }
            </Card>
        </div>
    )
}