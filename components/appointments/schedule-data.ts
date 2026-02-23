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

export const DOCTORS: DoctorProfile[] = [
  {
    id: "dr-mariana-silva",
    fullName: "Dra. Mariana Silva",
    profession: "Cardiologista",
    crm: "CRM-SP 145872",
    avatarUrl: "https://i.pravatar.cc/120?img=44",
    availability: [
      {
        date: "2026-02-23",
        label: "Seg, 23 de fevereiro",
        times: ["08:00", "09:30", "14:00", "16:30"],
      },
      {
        date: "2026-02-24",
        label: "Ter, 24 de fevereiro",
        times: ["10:00", "11:00", "15:00"],
      },
    ],
  },
  {
    id: "dr-carlos-moura",
    fullName: "Dr. Carlos Moura",
    profession: "Dermatologista",
    crm: "CRM-SP 98231",
    avatarUrl: "https://i.pravatar.cc/120?img=12",
    availability: [
      {
        date: "2026-02-25",
        label: "Qua, 25 de fevereiro",
        times: ["09:00", "10:30", "13:30"],
      },
      {
        date: "2026-02-27",
        label: "Sex, 27 de fevereiro",
        times: ["08:30", "11:30", "17:00"],
      },
    ],
  },
  {
    id: "dra-leticia-almeida",
    fullName: "Dra. Leticia Almeida",
    profession: "Clinica Geral",
    crm: "CRM-SP 204118",
    avatarUrl: "https://i.pravatar.cc/120?img=5",
    availability: [
      {
        date: "2026-02-24",
        label: "Ter, 24 de fevereiro",
        times: ["07:30", "08:30", "09:30", "10:30"],
      },
      {
        date: "2026-02-26",
        label: "Qui, 26 de fevereiro",
        times: ["14:00", "15:00", "16:00"],
      },
    ],
  },
]

export const APPOINTMENT_TYPES = [
  "Primeira consulta",
  "Retorno",
  "Consulta de rotina",
  "Avaliacao de exames",
]
