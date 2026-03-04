'use client';

import { Card, CardContent } from "../ui/card"
import { AlertCircle } from "lucide-react"
import { Button } from "../ui/button"

interface PostContentErrorProps {
    message?: string;
    onRetry?: () => void;
}

export const PostContentError = ({ message, onRetry }: PostContentErrorProps) => {

    return (
        <div className="mx-auto mt-5 grid w-full max-w-6xl gap-6 px-6">
            <Card className="overflow-hidden">
                <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
                    <AlertCircle className="size-12 text-red-500" />
                    <div className="text-center space-y-2">
                        <h2 className="text-lg font-semibold">Erro ao carregar o post</h2>
                        <p className="text-sm text-muted-foreground">
                            {message || "Ocorreu um erro ao tentar carregar o conteúdo do post."}
                        </p>
                    </div>
                    <Button 
                        onClick={onRetry}
                        variant="default"
                        className="mt-4"
                    >
                        Tentar novamente
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}