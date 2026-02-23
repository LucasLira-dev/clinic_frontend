import { Doctor, DoctorApiResponse, DoctorDetails } from "@/types";

export const bookAppointmentF = async (doctorId: string, date: string, time: string) => {
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

        const appointment = await response.json();

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

export const getDoctors = async () => {
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

export const getDoctorDetails = async (doctorId: string) => {
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
            specialty: doctorDetails.specialties.find((s: any) => s.isPrimary)?.specialty.name || doctorDetails.specialties[0]?.specialty.name || '',
            workingDays: doctorDetails.workingDays.map((day: any) => day.dayOfWeek),
        }

        return mappedDoctorDetails;
    }
    catch (error) {
        console.error('Erro ao buscar detalhes do médico:', error);
        throw new Error('Erro ao buscar detalhes do médico. Por favor, tente novamente.');
    }
}

export const getDoctorAvailableSlots = async (doctorId: string, date: string) => {
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

        console.log('Available slots response:', availableSlots);

        return {
            data: availableSlots.slots,
            canAppoint: availableSlots.canAppoint,
        };
    }
    catch (error) {
        console.error('Erro ao buscar horários disponíveis do médico:', error);
        throw new Error('Erro ao buscar horários disponíveis do médico. Por favor, tente novamente.');
    }
}
