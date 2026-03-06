import { AppointmentFilter, AppointmentStatus } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function normalizeDayLabel(day: string) {
  return day
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim()
}

export function formatDateToIsoLocal(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function parseIsoDate(date: string) {
  return new Date(`${date}T00:00:00`)
}


export const filters: { value: AppointmentFilter; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "upcoming", label: "Proximas" },
  { value: "completed", label: "Concluidas" },
  { value: "canceled", label: "Canceladas" },
]

export const monthMap = [
  "JAN.",
  "FEV.",
  "MAR.",
  "ABR.",
  "MAI.",
  "JUN.",
  "JUL.",
  "AGO.",
  "SET.",
  "OUT.",
  "NOV.",
  "DEZ.",
]

export const statusMap: Record<
  AppointmentStatus,
  { label: string; badgeClass: string; cardClass: string }
> = {
  SCHEDULED: {
    label: "Confirmada",
    badgeClass: "bg-chart-2 text-white/90 border border-sucess-200",
    cardClass: "",
  },
  COMPLETED: {
    label: "Concluida",
    badgeClass: "bg-success/10 text-success border border-success/25",
    cardClass: "border-success/30",
  },
  CANCELED: {
    label: "Cancelada",
    badgeClass: "bg-destructive/10 text-destructive border border-destructive/25",
    cardClass: "",
  },
  NO_SHOW: {
    label: "Nao compareceu",
    badgeClass: "bg-muted text-muted-foreground border border-border",
    cardClass: "",
  },
}

export function formatDateParts(isoDate?: string) {
  if (!isoDate) return undefined;
  const date = new Date(isoDate)

  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: monthMap[date.getMonth()] ?? "---",
    fullDate: date.toLocaleDateString("pt-BR"),
    hour: date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  }
}

export const weekdayOrder = [
  'DOMINGO',
  'SEGUNDA',
  'TERCA',
  'QUARTA',
  'QUINTA',
  'SEXTA',
  'SABADO'
]

export const weekdayLabels = {
  DOMINGO: 'Domingo',
  SEGUNDA: 'Segunda',
  TERCA: 'Terça',
  QUARTA: 'Quarta',
  QUINTA: 'Quinta',
  SEXTA: 'Sexta',
  SABADO: 'Sábado'
}