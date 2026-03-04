'use client';

import { useQuery } from "@tanstack/react-query";
import { PostCard } from "./PostCard"
import { getAllPosts } from "@/services/blogService";

export const BlogContent = () => {

    const {data: posts, isLoading, error} = useQuery({
        queryKey: ["blogPosts"],
        queryFn: () => getAllPosts(),
    })

    if (isLoading) {
        return (
            <div className="space-y-6 px-6 pb-6 pt-5">
                <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight"> Blog dos Médicos </h1>
                        <p className="text-muted-foreground">
                            Artigos e dicas dos nossos profissionais para cuidar melhor da sua saude.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                        {/* Renderize skeletons ou placeholders enquanto os dados estão carregando */}
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="animate-pulse rounded-lg bg-muted h-32" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="space-y-6 px-6 pb-6 pt-5">
                <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight"> Blog dos Médicos </h1>
                        <p className="text-muted-foreground">
                            Erro ao carregar os posts do blog. Por favor, tente novamente mais tarde.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 px-6 pb-6 pt-5">
            <div className="flex flex-col gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight"> Blog dos Médicos </h1>
                    <p className="text-muted-foreground">
                        Artigos e dicas dos nossos profissionais para cuidar melhor da sua saude.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    {
                        posts?.map((post) => {
                            const date = new Date(post.createdAt);
                            const formattedDate = date.toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            });

                            return (
                                <PostCard key={post.id} title={post.title} description={post.description} doctor={post.doctorProfile} tag={post.tag} createdAt={formattedDate} id={post.id}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}