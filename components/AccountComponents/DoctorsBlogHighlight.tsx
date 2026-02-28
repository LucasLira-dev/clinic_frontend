import Link from "next/link";
import { ArrowRight, Newspaper, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export const DoctorsBlogHighlight = () => {
    return (
        <section className="relative overflow-hidden rounded-lg border shadow-md bg-linear-to-br from-chart-2/20 via-background to-primary/10 p-6">
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-chart-2/20 blur-2xl" />
            <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />

            <div className="relative flex flex-col gap-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 space-y-2">
                        <p className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-semibold text-muted-foreground">
                            <Sparkles className="h-3.5 w-3.5" />
                            Conteudo recomendado
                        </p>
                        <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                            Veja o blog dos medicos e fique por dentro do mundo da saude
                        </h3>
                        <p className="max-w-2xl text-sm text-muted-foreground">
                            Dicas de prevencao, novidades da medicina e orientacoes dos profissionais para voce cuidar melhor da sua saude no dia a dia.
                        </p>
                    </div>
                    <div className="hidden shrink-0 self-start rounded-full border bg-background/70 p-3 lg:flex">
                        <Newspaper className="h-6 w-6 text-primary" />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Button asChild className="cursor-pointer">
                        <Link href="/blog">
                            Explorar Blog
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                    <span className="text-xs text-muted-foreground">
                        Novos conteudos publicados regularmente
                    </span>
                </div>
            </div>
        </section>
    );
};
