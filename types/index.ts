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



export type DoctorApiResponse = {
  id: string;
  fullName: string;
  specialties: {
    isPrimary: boolean;
    specialty: {
      name: string;
    };
  }[];
};

// Type for the mapped doctor object (id, fullName, specialty)
export type Doctor = {
  id: string;
  fullName: string;
  specialty: string;
};


export type DoctorDetailsApiResponse = {
    id: string;
    fullName: string;
    profilePhoto: string;
    crm: string;
    specialties: {
        isPrimary: boolean;
        specialty: {
            name: string;
        };
    }[];
    workingDays: {
        dayOfWeek: string;
    }[];
}

export type DoctorDetails = {
    id: string;
    fullName: string;
    profilePhoto: string;
    crm: string;
    specialty: string;
    workingDays: string[];
}


export type AppointmentState = {
  doctorId: string
  date: string
  time: string
  appointmentType: string
  notes: string
}

export const defaultState: AppointmentState = {
  doctorId: "",
  date: "",
  time: "",
  appointmentType: "",
  notes: "",
}

export const WEEKDAY_INDEX: Record<string, number> = {
  DOMINGO: 0,
  SEGUNDA: 1,
  TERCA: 2,
  QUARTA: 3,
  QUINTA: 4,
  SEXTA: 5,
  SABADO: 6,
  DOM: 0,
  SEG: 1,
  TER: 2,
  QUA: 3,
  QUI: 4,
  SEX: 5,
  SAB: 6,
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
}
