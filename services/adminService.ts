import { DoctorProfile, DoctorTableRow, PatientTableRow } from "@/types";

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
  senha: string;
  crm: string;
  biografia?: string;
  profilePhoto?: string;
  especialidades: string[];
  diasAtendimento: DayOfWeek[]; 
  startTime: string;
  endTime: string;
}

export type CreateDoctorResponse = {
  userId: string;
  email: string;
  doctorProfile: {
    id: string;
    userId: string;
    fullName: string;
    crm: string;
    biography?: string;
    profilePhoto?: string;
  };
}

type PatientApiResponse = {
    id: string;
    name: string;
    image?: string | null;
    createdAt: string;
};

export const createDoctor = async (doctorData: DoctorData) => {
    try {
        const response = await fetch(`/admin/medicos`, {
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

        return {
            message: 'Médico criado com sucesso',
        }
    }
    catch (error) {
        console.error('Erro ao criar médico:', error);
        throw new Error('Erro ao criar médico. Por favor, tente novamente.');
    }
}


export type UsersResult<T> = { users: T[]; total: number };

export const getDoctors = async (
): Promise<DoctorTableRow[]> => {
    try {
        const response = await fetch(
            `/admin/users?role=doctors`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            },
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao buscar usuários');
        }

        const responseJson = await response.json();

        const doctors: DoctorProfile[] = Array.isArray(responseJson?.data)
                ? responseJson.data
                : [];

        const mapped: DoctorTableRow[] = doctors
            .filter((doctor) => doctor.userId !== undefined)
            .map((doctor) => {
                const primary = doctor.specialties?.find((s) => s.isPrimary) ?? doctor.specialties?.[0];
                return {
                    id: doctor.id,
                    userId: doctor.userId!,
                    medico: doctor.fullName,
                    especialidade: primary?.specialty?.name ?? '',
                    crm: doctor.crm,
                    avaliacao: 0,
                    consultasSemanais: doctor.workingDays?.length ?? 0,
                };
            });


        return mapped;

    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw new Error('Erro ao buscar usuários. Por favor, tente novamente.');
    }
};


export const getPatients = async (): Promise<PatientTableRow[]> => {
    try {
        const response = await fetch(`/admin/users?role=patients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao buscar pacientes');
        }

        const responseJson = await response.json();

        const patients: PatientApiResponse[] = Array.isArray(responseJson?.data)
                ? responseJson.data
                : [];

        const mapped: PatientTableRow[] = patients.map((patient) => ({
            id: patient.id,
            nome: patient.name,
            avatar: patient.image,
            consultas: 0,
            cadastro: new Date(patient.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
            }),
        }));

        return mapped;
    }
    catch (error) {
        console.error('Erro ao buscar pacientes:', error);
        throw new Error('Erro ao buscar pacientes. Por favor, tente novamente.');
    }
}


export const deleteUser = async (userId: string) => {
    try {
        const response = await fetch(`/admin/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao deletar médico');
        }
    }
    catch (error) {
        console.error('Erro ao deletar médico:', error);
        throw new Error('Erro ao deletar médico. Por favor, tente novamente.');
    }
}   