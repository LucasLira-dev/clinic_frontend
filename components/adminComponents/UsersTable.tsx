/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, } from "lucide-react"
import { createDoctor, DayOfWeek } from "@/services/adminService"
import UploadWidget from "./UploadWidget"
import { DoctorTableRow, PatientTableRow, UploadWidgetValue } from "@/types/index"

import { toast } from "sonner"
import { AdminDataDialog } from "./AdminDataDialog"
import { DeleteButton } from "./DeleteButton"



const especialidades = [
  "Cardiologia",
  "Dermatologia",
  "Ortopedia",
  "Pediatria",
  "Neurologia",
  "Ginecologia",
  "Psiquiatria",
  "Oftalmologia",
]

const diasSemana: DayOfWeek[] = [
  DayOfWeek.SEGUNDA,
  DayOfWeek.TERCA,
  DayOfWeek.QUARTA,
  DayOfWeek.QUINTA,
  DayOfWeek.SEXTA,
  DayOfWeek.SABADO,
  DayOfWeek.DOMINGO,
]

interface UsersTableProps {
    doctorsData: DoctorTableRow[] | undefined;
    isLoading: boolean;
    error: unknown;
    patientsData: PatientTableRow[] | undefined;
    isLoadingPatients: boolean;
    errorPatients: unknown;
}

export default function UsersTable({ doctorsData, isLoading, error, patientsData, isLoadingPatients, errorPatients }: UsersTableProps) {
  const [uploadedImage, setUploadedImage] = useState<UploadWidgetValue | null>(null)
  const [diasSelecionados, setDiasSelecionados] = useState<DayOfWeek[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newDoctorData, setNewDoctorData] = useState({
    email: "",
    senhaTemporaria: "",
  })
  
  // Form state
  const [formData, setFormData] = useState({
    nome: "",
    crm: "",
    email: "",
    biografia: "",
    especialidade: "",
  })


  const toggleDia = (dia: DayOfWeek) => {
    setDiasSelecionados((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    )
  }

  const handleSubmitMedico = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) {
      console.log("Já está processando...")
      return
    }
    
    if (diasSelecionados.length === 0) {
      toast.error("Por favor, selecione pelo menos um dia de atendimento.")
      return
    }

    if (!uploadedImage) {
      toast.error("Por favor, faça o upload da foto do médico.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await createDoctor({
        nome: formData.nome,
        crm: formData.crm,
        email: formData.email,
        biografia: formData.biografia,
        profilePhoto: uploadedImage?.url || "",
        especialidades: [formData.especialidade],
        diasAtendimento: diasSelecionados,
      })

      if (response){
        setNewDoctorData({
          email: response.email,
          senhaTemporaria: response.senhaTemporaria,
        })
        setDialogOpen(true)
      }

      setFormData({
        nome: "",
        crm: "",
        email: "",
        biografia: "",
        especialidade: "",
      })
      setUploadedImage(null)
      setDiasSelecionados([])
    } 
    catch (error) {
      console.error("Erro ao criar médico:", error)
      toast.error("Erro ao criar médico. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancelar = () => {
    setFormData({
      nome: "",
      crm: "",
      email: "",
      biografia: "",
      especialidade: "",
    })
    setUploadedImage(null)
    setDiasSelecionados([])
  }

  if (isLoading || isLoadingPatients) {
    return <div>Carregando dados...</div>
  }

  if (error || errorPatients) {
    return <div>Erro ao carregar dados. Por favor, tente novamente.</div>
  }

  return (
    <div className="w-full mt-12">
      <Tabs defaultValue="medicos" className="w-full">
        <TabsList variant="line">
          <TabsTrigger value="medicos">Médicos</TabsTrigger>
          <TabsTrigger value="pacientes">Pacientes</TabsTrigger>
          <TabsTrigger value="adicionar">Adicionar Médico</TabsTrigger>
        </TabsList>

        {/* Tab Médicos */}
        <TabsContent value="medicos" className="mt-6">
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Médico</TableHead>
                  <TableHead>Especialidade</TableHead>
                  <TableHead>CRM</TableHead>
                  <TableHead>Avaliação</TableHead>
                  <TableHead>Consultas Semanais</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctorsData?.map((medico: DoctorTableRow) => (
                  <TableRow key={medico.id}>
                    <TableCell className="font-medium">{medico.medico}</TableCell>
                    <TableCell>{medico.especialidade}</TableCell>
                    <TableCell>{medico.crm}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="size-4 fill-warning text-warning" />
                        <span> 5.0 </span>
                      </div>
                    </TableCell>
                    <TableCell>{medico.consultasSemanais}</TableCell>
                    <TableCell className="text-right">
                      <DeleteButton userId={medico.userId} userType="doctor" userName={medico.medico}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Tab Pacientes */}
        <TabsContent value="pacientes" className="mt-6">
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Consultas</TableHead>
                  <TableHead>Cadastro</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientsData?.map((paciente: PatientTableRow) => (
                  <TableRow key={paciente.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {paciente.avatar ? (
                          <img
                            src={paciente.avatar}
                            alt={paciente.nome}
                            className="size-10 rounded-full"
                          />
                        ) : (
                          <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                            {paciente.nome.charAt(0)}
                          </div>
                        )}
                        <span className="font-medium">{paciente.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell>{paciente.consultas}</TableCell>
                    <TableCell>{paciente.cadastro}</TableCell>
                    <TableCell className="text-right">
                      <DeleteButton userId={paciente.id}  userType="patient" userName={paciente.nome}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Tab Adicionar Médico */}
        <TabsContent value="adicionar" className="mt-6">
          <div className="rounded-lg border bg-card p-6">
            <form onSubmit={handleSubmitMedico} className="space-y-6">
              {/* Upload de Imagem */}
              <div className="space-y-2">
                <Label htmlFor="imagem">Foto do Médico</Label>
                <UploadWidget 
                  value={uploadedImage}
                  onChange={setUploadedImage}
                />
              </div>

              {/* Nome Completo */}
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  placeholder="Digite o nome completo"
                  required
                />
              </div>

              {/* CRM */}
              <div className="space-y-2">
                <Label htmlFor="crm">CRM</Label>
                <Input
                  id="crm"
                  value={formData.crm}
                  onChange={(e) =>
                    setFormData({ ...formData, crm: e.target.value })
                  }
                  placeholder="12345-UF"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="medico@exemplo.com"
                  required
                />
              </div>

              {/* Biografia */}
              <div className="space-y-2">
                <Label htmlFor="biografia">Biografia</Label>
                <textarea
                  id="biografia"
                  value={formData.biografia}
                  onChange={(e) =>
                    setFormData({ ...formData, biografia: e.target.value })
                  }
                  placeholder="Conte um pouco sobre a formação e experiência do médico..."
                  className="flex min-h-30 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>

              {/* Especialidade */}
              <div className="space-y-2">
                <Label htmlFor="especialidade">Especialidade</Label>
                <select
                  id="especialidade"
                  value={formData.especialidade}
                  onChange={(e) =>
                    setFormData({ ...formData, especialidade: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Selecione uma especialidade</option>
                  {especialidades.map((esp) => (
                    <option key={esp} value={esp}>
                      {esp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dias de Atendimento */}
              <div className="space-y-2">
                <Label>Dias de Atendimento</Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {diasSemana.map((dia) => (
                    <label
                      key={dia}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={diasSelecionados.includes(dia)}
                        onChange={() => toggleDia(dia)}
                        className="size-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      />
                      <span className="text-sm">{dia}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Criando..." : "Adicionar Médico"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelar}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>

      <AdminDataDialog
        email={newDoctorData.email}
        password={newDoctorData.senhaTemporaria}
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        />
    </div>
  )
}
