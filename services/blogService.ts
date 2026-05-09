import { CreatePostSchemaType } from "@/lib/schema";
import { BlogPostListItem, BlogPostsResponse, PostDetails, PostDetailsResponse } from "@/types";

const BLOG_API_BASE = '/blog-api';

export const createPost = async (data: CreatePostSchemaType) => {
    try {
        const response = await fetch(`${BLOG_API_BASE}/createPost`, {
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
        const response = await fetch(BLOG_API_BASE, {
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
        const response = await fetch(`${BLOG_API_BASE}/${id}`, {
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


export const deletePostById = async (id: string) => {
    try {
        const response = await fetch(`${BLOG_API_BASE}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw Error(errorData.message || "Erro ao deletar o post. Por favor, tente novamente.")
        }

        return {
            message: "Post deletado com sucesso!"
        }
    }
    catch (error) {
        console.log("Error deleting post:", error)
        throw Error("Erro ao deletar o post. Por favor, tente novamente.")
    }
}
