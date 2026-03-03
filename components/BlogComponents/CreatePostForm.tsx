'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostSchema, CreatePostSchemaType } from "@/lib/schema";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/services/blogService";

export const CreatePostForm = () => {

  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const createPostMutation = useMutation({
    mutationFn: async (data: CreatePostSchemaType) =>
      createPost(data),
    onSuccess: () => {
      router.push('/blog')
    },
    onError: (error) => {
      console.log("Error creating post:", error)
      setError("Ocorreu um erro ao criar o post. Por favor, tente novamente.")
    }
  })

  const { register, handleSubmit, formState: { errors, touchedFields }, setValue, control } = useForm<CreatePostSchemaType>({
    resolver: zodResolver(CreatePostSchema),
    mode: 'onTouched',
  })

  const { field } = useController({
    name: "content",
    control,
  })

  const onSubmit = async (data: CreatePostSchemaType) => {
    try {
      createPostMutation.mutate(data)
    }
    catch (error) {
      console.log("Error creating post:", error)
      setError("Ocorreu um erro ao criar o post. Por favor, tente novamente.")
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (contentRef.current) {
      contentRef.current.style.height = "auto";
      contentRef.current.style.height = contentRef.current.scrollHeight + "px";
    }
    setValue("content", e.target.value, { shouldValidate: true, shouldTouch: true });
  };

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-8">
      <Card className="border-border/80 shadow-sm">
        <CardHeader className="space-y-2 border-b bg-muted/30">
          <CardTitle className="text-2xl tracking-tight">Criar novo post</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para publicar um novo conteúdo no blog.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {
              error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )
            }
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Ex.: 5 hábitos para melhorar sua saúde em 2026"
                  {...register("title")}
                />
                {
                  errors.title && touchedFields.title && (
                    <span className="text-red-500 text-xs">{errors.title.message}</span>
                  )
                }
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  rows={8}
                  placeholder="Escreva o conteúdo completo do post..."
                  ref={(el) => {
                    contentRef.current = el;
                    field.ref(el);
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    handleContentChange(e);
                  }}
                  value={field.value}
                  style={{ resize: "none", overflow: "hidden" }}
                  className=""
                />
                {
                  errors.content && touchedFields.content && (
                    <span className="text-red-500 text-xs">{errors.content.message}</span>
                  )
                }
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  type="text"
                  id="description"
                  placeholder="Resumo curto para listagens e SEO"
                  {...register("description")}
                />
                {
                  errors.description && touchedFields.description && (
                    <span className="text-red-500 text-xs">{errors.description.message}</span>
                  )
                }
              </div>

              <div className="space-y-2">
                <Label htmlFor="tag">Tag</Label>
                <Input
                  type="text"
                  id="tag"
                  placeholder="Ex.: prevenção, nutrição, cardio"
                  {...register("tag")}
                />
                {
                  errors.tag && touchedFields.tag && (
                    <span className="text-red-500 text-xs">{errors.tag.message}</span>
                  )
                }
              </div>
            </div>

            <div className="flex justify-end border-t pt-4">
              <Button 
              type="submit" 
              size="lg" 
              className="min-w-36 bg-chart-2 hover:bg-chart-2/70 cursor-pointer"
              disabled={createPostMutation.isPending}>
                {createPostMutation.isPending ? "Publicando..." : "Publicar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
