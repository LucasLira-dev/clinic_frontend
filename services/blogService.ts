import { CreatePostSchemaType } from "@/lib/schema";

if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("A variável de ambiente NEXT_PUBLIC_API_URL não está definida.");
}

export const createPost = async (data: CreatePostSchemaType) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/createPost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw Error("Erro ao criar o post. Por favor, tente novamente.")
        }

        return {
            message: "Post criado com sucesso!"
        };
    }
    catch (error) {
        console.log("Error creating post:", error)
        throw Error("Ocorreu um erro ao criar o post. Por favor, tente novamente.")
    }
}