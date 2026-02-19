declare global {
    interface CloudinaryUploadWidgetResults {
        event: string;
        info: {
            secure_url: string;
            public_id: string;
            delete_token?: string;
            resource_type: string;
            original_filename: string;
        };
    }

    interface CloudinaryWidget {
        open: () => void;
    }

    interface Window {
        cloudinary?: {
            createUploadWidget: (
                options: Record<string, unknown>,
                callback: (
                    error: unknown,
                    result: CloudinaryUploadWidgetResults
                ) => void
            ) => CloudinaryWidget;
        };
    }
}

export interface UploadWidgetValue {
    url: string;
    publicId: string;
}

export interface UploadWidgetProps {
    value?: UploadWidgetValue | null;
    onChange?: (value: UploadWidgetValue | null) => void;
    disabled?: boolean;
}


export interface Specialty {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface DoctorSpecialty {
    id: string;
    doctorProfileId: string;
    specialtyId: string;
    isPrimary: boolean;
    createdAt: string;
    specialty: Specialty;
}

export interface DoctorProfile {
    id: string;
    userId?: string;
    fullName: string;
    crm: string;
    biography: string | null;
    profilePhoto: string | null;
    createdAt: string;
    specialties: DoctorSpecialty[];
    workingDays?: { dayOfWeek: string }[];
}

export interface DoctorTableRow {
    id: string;
    userId: string;
    medico: string; // Nome do médico exibido na tabela
    especialidade: string;
    crm: string;
    avaliacao: number; // Nota de avaliação (ex: 4.5)
    consultasSemanais: number;
}

export interface PatientTableRow {
    id: string;
    nome: string;
    avatar?: string | null;
    consultas: number;
    cadastro?: string;
}
