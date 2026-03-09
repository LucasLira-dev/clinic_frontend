import { DashboardStatsResponse, Doctor, DoctorApiResponse, DoctorDetails } from "@/types";

import { AppointmentItem, AppointmentFilter, AppointmentStatus, UserRole } from "@/types";

export interface BookedAppointment {
    id: string;
    appointmentDay: string;
    status: AppointmentStatus;
    doctorProfile: {
        fullName: string;
        specialty: string;
    };
}

export interface AppointmentDetails {
    id: string;
    appointmentDay: string;
    profilePhoto: string;
    doctorName: string;
    specialty: string;
    patientName: string;
    status: AppointmentStatus;
}

export const bookAppointmentF = async (
    doctorId: string,
    date: string,
    time: string
): Promise<BookedAppointment> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                doctorId,
                date,
                time,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao agendar consulta');
        }

        const appointment: BookedAppointment = await response.json();
        return appointment;
    }
    catch (error) {
        console.error('Erro ao agendar consulta:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Erro ao agendar consulta. Por favor, tente novamente.');
    }
}

export const getDoctors = async (): Promise<Doctor[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/doctors`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao buscar médicos');
        }

        const doctors = await response.json();

        const mappedDoctors: Doctor[] = doctors.map((doctor: DoctorApiResponse) => ({
            id: doctor.id,
            fullName: doctor.fullName,
            specialty: doctor.specialties.find(s => s.isPrimary)?.specialty.name || doctor.specialties[0]?.specialty.name || '',
        }))

        return mappedDoctors;
    }
    catch (error) {
        console.error('Erro ao buscar médicos:', error);
        throw new Error('Erro ao buscar médicos. Por favor, tente novamente.');
    }
}

export const getDoctorDetails = async (doctorId: string): Promise<DoctorDetails> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/doctor/${doctorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao buscar detalhes do médico');
        }

        const doctorDetails = await response.json();

        const mappedDoctorDetails: DoctorDetails = {
            id: doctorDetails.id,   
            fullName: doctorDetails.fullName,
            profilePhoto: doctorDetails.profilePhoto,
            crm: doctorDetails.crm,
            specialty: doctorDetails.specialties.find((s: { isPrimary: boolean; specialty: { name: string } }) => s.isPrimary)?.specialty.name || doctorDetails.specialties[0]?.specialty.name || '',
            workingDays: doctorDetails.workingDays.map((day: { dayOfWeek: string }) => day.dayOfWeek),
        };
        return mappedDoctorDetails;
    }
    catch (error) {
        console.error('Erro ao buscar detalhes do médico:', error);
        throw new Error('Erro ao buscar detalhes do médico. Por favor, tente novamente.');
    }
}

export interface DoctorAvailableSlots {
    data: string[];
    canAppoint: boolean;
}

export const getDoctorAvailableSlots = async (
    doctorId: string,
    date: string
): Promise<DoctorAvailableSlots> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/doctor/${doctorId}/available-slots?date=${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao buscar horários disponíveis do médico');
        }

        const availableSlots = await response.json();
        return {
            data: availableSlots.slots as string[],
            canAppoint: availableSlots.canAppoint as boolean,
        };
    }
    catch (error) {
        console.error('Erro ao buscar horários disponíveis do médico:', error);
        throw new Error('Erro ao buscar horários disponíveis do médico. Por favor, tente novamente.');
    }
}

export const getMyAppointments = async (
    filter: AppointmentFilter = 'all',
    userRole: UserRole = 'patient',
): Promise<AppointmentItem[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/my-appointments?filter=${filter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Erro ao buscar consultas')
        }

        const appointments = await response.json();
        return appointments.map((appointment: {
            id: string;
            appointmentDay: string;
            status: AppointmentStatus;
            doctorProfile?: {
                fullName: string;
                specialties: { isPrimary: boolean; specialty: { name: string } }[];
            };
            patient?: {
                name: string;
            };
        }): AppointmentItem => {
            if (userRole === 'doctor') {
                return {
                    id: appointment.id,
                    appointmentDay: appointment.appointmentDay,
                    status: appointment.status,
                    doctorProfile: {
                        fullName: appointment.patient?.name || 'Paciente nao informado',
                        specialty: 'Paciente',
                    },
                };
            }

            const primarySpecialty = appointment.doctorProfile?.specialties?.find((item) => item.isPrimary);
            const fallbackSpecialty = appointment.doctorProfile?.specialties?.[0];
            return {
                id: appointment.id,
                appointmentDay: appointment.appointmentDay,
                status: appointment.status,
                doctorProfile: {
                    fullName: appointment.doctorProfile?.fullName || 'Medico nao informado',
                    specialty: primarySpecialty?.specialty.name || fallbackSpecialty?.specialty.name || 'Especialidade nao informada',
                },
            };
        });
    }
    catch (error) {
        console.error('Erro ao buscar consultas:', error)
        throw new Error('Erro ao buscar consultas. Por favor, tente novamente.')
    }
}

export const getAppointmentDetails = async (
    appointmentId: string,
    userRole: UserRole = 'patient',
): Promise<AppointmentDetails> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/details/${appointmentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao buscar detalhes da consulta');
        }

        const appointment = await response.json();
        const primarySpecialty = appointment.doctorProfile?.specialties?.find((item: { isPrimary: boolean; specialty: { name: string } }) => item.isPrimary);
        const fallbackSpecialty = appointment.doctorProfile?.specialties?.[0];
        return {
            id: appointment.id,
            appointmentDay: appointment.appointmentDay,
            patientName: appointment.patient?.name || (userRole === 'doctor' ? 'Seu paciente' : 'Paciente nao informado'),
            profilePhoto: appointment.doctorProfile?.profilePhoto || '',
            doctorName: appointment.doctorProfile?.fullName || 'Medico nao informado',
            status: appointment.status,
            specialty: primarySpecialty?.specialty.name || fallbackSpecialty?.specialty.name || 'Especialidade nao informada',
        };
    } catch (error) {
        console.error('Erro ao buscar detalhes da consulta:', error);
        throw new Error('Erro ao buscar detalhes da consulta. Por favor, tente novamente.');
    }
}


export const cancelAppointment = async (appointmentId: string): Promise<{ message: string }> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/cancel/${appointmentId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ appointmentId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao cancelar consulta');
        }

        return {
            message: 'Consulta cancelada com sucesso',
        }
    }
    catch (error) {
        console.error('Erro ao cancelar consulta:', error);
        throw new Error('Erro ao cancelar consulta. Por favor, tente novamente.');
    }
}


export const completeAppointment = async (appointmentId: string): Promise<{ message: string }> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/complete/${appointmentId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ appointmentId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao concluir consulta');
        }

        return {
            message: 'Consulta concluída com sucesso',
        }
    }
    catch (error) {
        console.error('Erro ao concluir consulta:', error);
        throw new Error('Erro ao concluir consulta. Por favor, tente novamente.');
    }
}


export const getDashboardStats = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/dashboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao buscar estatísticas do dashboard');
        }

        const data: DashboardStatsResponse = await response.json();

        return data;
    }
    catch (error) {
        console.error('Erro ao buscar estatísticas do dashboard:', error);
        throw new Error('Erro ao buscar estatísticas do dashboard. Por favor, tente novamente.');
    }
}