export type DoctorAvailability = {
  date: string
  label: string
  times: string[]
}

export type DoctorProfile = {
  id: string
  fullName: string
  profession: string
  crm: string
  avatarUrl?: string
  availability: DoctorAvailability[]
}

export const APPOINTMENT_TYPES = [
  "Primeira consulta",
  "Retorno",
  "Consulta de rotina",
  "Avaliacao de exames",
]
