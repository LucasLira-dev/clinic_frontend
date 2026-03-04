import { CreatePostSchemaType } from "@/lib/schema";
import { BlogPostListItem, BlogPostsResponse, PostDetails, PostDetailsResponse } from "@/types";

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


export const getAllPosts = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            throw Error("Erro ao buscar os posts. Por favor, tente novamente.")
        }

        const data: BlogPostsResponse[] = await response.json();

        const mappedPosts: BlogPostListItem[] = data.map((post) => {
            return {
                id: post.id,
                title: post.title,
                description: post.description,
                tag: post.tag,
                doctorProfile: {
                    id: post.doctorProfile.id,
                    fullName: post.doctorProfile.fullName,
                    profilePhoto: post.doctorProfile.profilePhoto,
                    specialty: post.doctorProfile.specialties[0]?.specialty.name || 'Especialidade não informada',
                },
                createdAt: post.createdAt,
            }
        })

        return mappedPosts;
    }
    catch (error) {
        console.log("Error fetching posts:", error)
        throw Error("Erro ao buscar os posts. Por favor, tente novamente.")
    }
}

export const getPostById = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw Error(errorData.message || "Erro ao buscar o post. Por favor, tente novamente.")
        }

        const data: PostDetailsResponse = await response.json();

        const mappedPost: PostDetails = {
            id: data.id,
            title: data.title,
            description: data.description,
            content: data.content,
            tag: data.tag,
            doctorProfile: {
                id: data.doctorProfile.id,
                fullName: data.doctorProfile.fullName,
                profilePhoto: data.doctorProfile.profilePhoto,
                specialty: data.doctorProfile.specialties[0]?.specialty.name || 'Especialidade não informada',
            },
            createdAt: data.createdAt,
        }

        return mappedPost;
    }
    catch (error) {
        console.log("Error fetching post:", error)
        throw Error("Erro ao buscar o post. Por favor, tente novamente.")
    }
}