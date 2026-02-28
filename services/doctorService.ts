import { MyDoctorProfile } from "@/types";

export const getDoctorProfile = async () => {
    try {
       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
       })

       if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || 'Erro ao obter perfil do médico');
       }

        const doctorProfile: MyDoctorProfile = await response.json();
        return doctorProfile;
    }
    catch (error) {
        console.error('Erro ao obter perfil do médico:', error);
        throw error;
    }
}

export const updateDoctorProfilePhoto = async(profilePhoto: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor/me/photo`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ profilePhoto })
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao atualizar foto de perfil do médico');
        }

        return response.json();
    }
    catch (error) {
        console.error('Erro ao atualizar foto de perfil do médico:', error);
        throw error;
    }
}


export const updateDoctorBiography = async(biography: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor/me/biography`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ biography })
        })
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao atualizar biografia do médico');
        }
        
        return response.json();
    }
    catch (error) {
        console.error('Erro ao atualizar biografia do médico:', error);
        throw error;
    }
}