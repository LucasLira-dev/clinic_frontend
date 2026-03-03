import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
    password: z.string().min(1, "Senha é obrigatória").min(8, "A senha deve conter no mínimo 8 caracteres"),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>


export const RegisterSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório").min(4, "O nome deve conter no mínimo 4 caracteres"),
    email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
    password: z.string().min(1, "Senha é obrigatória").min(8, "A senha deve conter no mínimo 8 caracteres")
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>



export const CreatePostSchema = z.object({
    title: z.string().min(5, "O título deve conter no mínimo 5 caracteres").max(100, "O título deve conter no máximo 100 caracteres"),
    content: z.string().min(20, "O conteúdo deve conter no mínimo 20 caracteres").max(5000, "O conteúdo deve conter no máximo 5000 caracteres"),
    description: z.string().min(10, "A descrição deve conter no mínimo 10 caracteres").max(300, "A descrição deve conter no máximo 300 caracteres"),
    tag: z.string().min(3, "A tag deve conter no mínimo 3 caracteres").max(80, "A tag deve conter no máximo 80 caracteres")
})

export type CreatePostSchemaType = z.infer<typeof CreatePostSchema>