export enum DayOfWeek {
  SEGUNDA = 'SEGUNDA',
  TERCA = 'TERCA',
  QUARTA = 'QUARTA',
  QUINTA = 'QUINTA',
  SEXTA = 'SEXTA',
  SABADO = 'SABADO',
  DOMINGO = 'DOMINGO',
}

export type DoctorData = {
  nome: string;
  email: string;
  crm: string;
  biografia?: string;
  profilePhoto?: string;
  especialidades: string[];
  diasAtendimento: DayOfWeek[]; // Array de dias da semana
}

export type CreateDoctorResponse = {
  userId: string;
  email: string;
  senhaTemporaria: string;
  doctorProfile: {
    id: string;
    userId: string;
    fullName: string;
    crm: string;
    biography?: string;
    profilePhoto?: string;
  };
}

export const createDoctor = async (doctorData: DoctorData): Promise<CreateDoctorResponse> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/medicos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(doctorData),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao criar médico');
        }

        const responseJson = await response.json();

        const data = responseJson.data;
        return data;
    }
    catch (error) {
        console.error('Erro ao criar médico:', error);
        throw error;
    }
}