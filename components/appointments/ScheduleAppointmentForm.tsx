"use client"

import { useMemo, useState } from "react"
import { CalendarPlus2, CircleAlert } from "lucide-react"

import { DoctorSummaryCard } from "@/components/appointments/DoctorSummaryCard"
import {
  APPOINTMENT_TYPES,
} from "@/components/appointments/schedule-data"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { bookAppointmentF, getDoctorAvailableSlots, getDoctorDetails, getDoctors } from "@/services/appointmentsService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "sonner"
import { AppointmentState, defaultState, WEEKDAY_INDEX } from "@/types"
import { formatDateToIsoLocal, normalizeDayLabel, parseIsoDate } from "@/lib/utils"



export function ScheduleAppointmentForm() {
  const [formData, setFormData] = useState<AppointmentState>(defaultState)

  const queryClient = useQueryClient()

  const bookAppointment = useMutation({
    mutationFn: (payload: { doctorId: string, date: string, time: string }) => 
      bookAppointmentF(payload.doctorId, payload.date, payload.time),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['available-times', formData.doctorId, formData.date] })

      setFormData(defaultState)

      toast.success('Consulta solicitada com sucesso! Aguarde a confirmacao do medico.')
    },
    onError: (error) => {
      console.error('Erro ao agendar consulta:', error)
      toast.error(error instanceof Error ? error.message : 'Erro ao agendar consulta. Por favor, tente novamente.')
    },
  })

  const { data: doctorsData, isLoading, error } = useQuery({
    queryKey: ['doctors-appointment'],
    queryFn: getDoctors,
  })

  const { data: doctorDetails, isLoading: isLoadingDoctorDetails, error: errorDoctorDetails } = useQuery({
    queryKey: ['doctor-details', formData.doctorId],
    queryFn: () => getDoctorDetails(formData.doctorId),
    enabled: !!formData.doctorId,
  })

  const { data: availableTimes } = useQuery({
    queryKey: ['available-times', formData.doctorId, formData.date],
    queryFn: async () => getDoctorAvailableSlots(formData.doctorId, formData.date),
    enabled: !!formData.doctorId && !!formData.date,
  })

  const selectedDoctor = useMemo(() => {
    return doctorsData?.find((doc) => doc.id === formData.doctorId)
  }, [formData.doctorId, doctorsData])

  const today = useMemo(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return now
  }, [])

  const selectedDate = useMemo(() => {
    if (!formData.date) return undefined
    return parseIsoDate(formData.date)
  }, [formData.date])

  const workingDayIndexes = useMemo(() => {
    return new Set(
      (doctorDetails?.workingDays ?? [])
        .map((day) => WEEKDAY_INDEX[normalizeDayLabel(day)])
        .filter((day): day is number => Number.isInteger(day))
    )
  }, [doctorDetails?.workingDays])

  const isDayDisabled = !selectedDoctor
  const isTimeDisabled = !selectedDoctor || !formData.date

  function handleDoctorChange(doctorId: string) {
    setFormData((prev) => ({
      ...prev,
      doctorId,
      date: "",
      time: "",
    }))
  }

  function handleDayChange(date: string) {
    setFormData((prev) => ({
      ...prev,
      date,
      time: "",
    }))
  }

  function isCalendarDateDisabled(date: Date) {
    const currentDate = new Date(date)
    currentDate.setHours(0, 0, 0, 0)

    if (currentDate < today) return true
    if (!selectedDoctor) return true

    return !workingDayIndexes.has(currentDate.getDay())
  }

  function handleSubmit(event: any) {
    event.preventDefault()

    if (!formData.doctorId || !formData.date || !formData.time) {
      toast.error('Preencha todos os campos obrigatórios.')
      return
    }

    bookAppointment.mutate({
      doctorId: formData.doctorId,
      date: formData.date,
      time: formData.time,
    })
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-6 pt-2 mt-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Solicitar Consulta</h1>
        <p className="text-muted-foreground mt-2">
          Preencha os dados abaixo para solicitar um agendamento.
        </p>
      </div>

      <Card className="border-chart-2/30 bg-chart-2/10 py-4">
        <CardContent className="flex items-start gap-3 px-4">
          <CircleAlert className="mt-0.5 size-4 shrink-0 text-chart-2" />
          <p className="text-sm leading-relaxed">
            Apos enviar a solicitacao, o medico ira analisar e confirmar a
            consulta. Voce recebera uma notificacao por e-mail assim que houver
            uma resposta.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <CalendarPlus2 className="size-5 text-chart-2" />
            Dados da Consulta
          </CardTitle>
          <CardDescription>
            Escolha medico, dia e horario na ordem para liberar os proximos
            campos.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="doctor">Medico</Label>
            <Select 
            value={formData.doctorId} 
            onValueChange={handleDoctorChange}
            disabled={isLoading || !!error}>
              <SelectTrigger id="doctor" className="w-full">
                <SelectValue placeholder="Selecione um medico" />
              </SelectTrigger>
              <SelectContent>
                {doctorsData?.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.fullName} - {doctor.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {doctorDetails && <DoctorSummaryCard doctor={doctorDetails} />}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Dia</Label>
              <div
                className="overflow-hidden rounded-md border"
                aria-disabled={isDayDisabled || isLoadingDoctorDetails || !!errorDoctorDetails}
              >
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => handleDayChange(date ? formatDateToIsoLocal(date) : "")}
                  disabled={isCalendarDateDisabled}
                  className={
                    isDayDisabled || isLoadingDoctorDetails || !!errorDoctorDetails
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </div>
              <p className="text-muted-foreground text-xs">
                {formData.date
                  ? `Dia selecionado: ${parseIsoDate(formData.date).toLocaleDateString("pt-BR")}`
                  : "Selecione um medico para liberar o calendario."}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Horario</Label>
              <Select
                value={formData.time}
                onValueChange={(time) =>
                  setFormData((prev) => ({
                    ...prev,
                    time,
                  }))
                }
                disabled={isTimeDisabled}
              >
                <SelectTrigger id="time" className="w-full">
                  <SelectValue
                    placeholder={
                      isTimeDisabled
                        ? "Selecione o dia primeiro"
                        : "Selecione o horario"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes && availableTimes.data && availableTimes.data.length > 0 ? (
                    availableTimes.data.map((time: string) => (
                      <SelectItem key={time} value={time} disabled={!availableTimes.canAppoint}>
                        {time}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-slots" disabled>
                      Nenhum horario disponivel para o dia selecionado
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <p className="text-muted-foreground text-xs">
                {availableTimes && !availableTimes.canAppoint && (
                  <span className="flex justify-center gap-2 text-red-500">
                    <CircleAlert className="size-4 mt-2" />
                    Voce ja tem 2 consultas agendadas com este medico neste dia.
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointmentType">Tipo da Consulta</Label>
            <Select
              value={formData.appointmentType}
              onValueChange={(appointmentType) =>
                setFormData((prev) => ({
                  ...prev,
                  appointmentType,
                }))
              }
            >
              <SelectTrigger id="appointmentType" className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {APPOINTMENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observacoes (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Descreva seus sintomas ou o motivo da consulta..."
              value={formData.notes}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  notes: event.target.value,
                }))
              }
              className="min-h-28"
            />
          </div>

          <Button
            className="w-full"
            disabled={
              !formData.doctorId ||
              !formData.date ||
              !formData.time ||
              !formData.appointmentType
            }
            onClick={handleSubmit}
          >
            {bookAppointment.isPending ? 'Agendando...' : 'Agendar Consulta'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
