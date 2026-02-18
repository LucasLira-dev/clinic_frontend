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
