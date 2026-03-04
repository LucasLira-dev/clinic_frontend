import { PostContent } from "@/components/BlogComponents/PostContent";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let session = null;
    try {
        session = await authClient.getSession({
            fetchOptions: {
                headers: await headers()
            }
        });
    } catch (error) {
        console.error("Erro ao obter sessao:", error);
    }

    if (!session?.data) {
        redirect("/login");
    }

    const userRole = session?.data?.user?.role;

    return (
        <div className="pb-6">
            <div className="px-6 pt-2 pb-4">
                <h1 className="text-3xl font-bold tracking-tight">Post do médico</h1>
            </div>
            <Separator />

            <div className="mx-auto w-full max-w-6xl px-6 pt-5">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    Voltar para o blog
                </Link>
            </div>

            <PostContent postId={id} userRole={userRole || ''} />
        </div>
    );
}
