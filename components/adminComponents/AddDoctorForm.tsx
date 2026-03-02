'use client';

import { createDoctor, DayOfWeek } from "@/services/adminService";
import { UploadWidgetValue } from "@/types"
import { useState } from "react"
import { Eye, EyeOff, Copy } from "../ui/icons"
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import UploadWidget from "./UploadWidget";
import { Button } from "../ui/button";



const especialidades = [
  "Cardiologia",
  "Ortopedia",
  "Pediatria",
  "Ginecologia",
  "Psiquiatria",
  "Nutrição",
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

export const AddDoctorForm = ({ refetchDoctors }: { refetchDoctors?: () => Promise<unknown> }) => {

    const [uploadedImage, setUploadedImage] = useState<UploadWidgetValue | null>(null)

  const [diasSelecionados, setDiasSelecionados] = useState<DayOfWeek[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [horario, setHorario] = useState<{ inicio: string, fim: string }>({ inicio: '', fim: '' })

  // Form state
  const [formData, setFormData] = useState({
    nome: "",
    crm: "",
    email: "",
    senha: "",
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
    if (!formData.senha || formData.senha.length < 8) {
      toast.error("A senha precisa ter pelo menos 8 caracteres.")
      return
    }
    if (!horario.inicio || !horario.fim) {
      toast.error("Defina o horário de atendimento.")
      return;
    }
    
    // Validação para HH:MM
    const inicioHora = parseInt(horario.inicio.split(":")[0], 10);
    const inicioMin = parseInt(horario.inicio.split(":")[1], 10);
    const fimHora = parseInt(horario.fim.split(":")[0], 10);
    const fimMin = parseInt(horario.fim.split(":")[1], 10);
    // Horário de atendimento entre 08:00 e 18:00
    if (
      inicioHora < 8 ||
      fimHora > 18 ||
      (inicioHora > fimHora || (inicioHora === fimHora && inicioMin >= fimMin))
    ) {
      toast.error("Horário inválido. O atendimento deve ser entre 08:00 e 18:00 e o início deve ser antes do fim.");
      return;
    }
    setIsSubmitting(true)
    try {
      await createDoctor({
        nome: formData.nome,
        crm: formData.crm,
        email: formData.email,
        senha: formData.senha,
        biografia: formData.biografia,
        profilePhoto: uploadedImage?.url || "",
        especialidades: [formData.especialidade],
        diasAtendimento: diasSelecionados,
        startTime: horario.inicio,
        endTime: horario.fim,
      })
      toast.success("Médico criado com sucesso!")
      setFormData({
        nome: "",
        crm: "",
        email: "",
        senha: "",
        biografia: "",
        especialidade: "",
      })
      setUploadedImage(null)
      setDiasSelecionados([])
      setHorario({ inicio: '', fim: '' })
      if (refetchDoctors) {
        await refetchDoctors()
      }
    } catch (error) {
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
      senha: "",
      biografia: "",
      especialidade: "",
    })
    setUploadedImage(null)
    setDiasSelecionados([])
  }

    return (
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

              {/* Senha definida pelo admin */}
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative flex items-center">
                  <Input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    value={formData.senha}
                    onChange={(e) =>
                      setFormData({ ...formData, senha: e.target.value })
                    }
                    placeholder="Defina a senha do médico"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-10 p-1 text-muted-foreground hover:text-primary"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button
                    type="button"
                    aria-label="Copiar senha"
                    onClick={() => {
                      if (formData.senha) {
                        navigator.clipboard.writeText(formData.senha)
                        toast.success("Senha copiada!")
                      }
                    }}
                    className="absolute right-2 p-1 text-muted-foreground hover:text-primary"
                    tabIndex={-1}
                  >
                    <Copy size={18} />
                  </button>
                </div>
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

              {/* Horário de Atendimento */}
              <div className="space-y-2">
                <Label>Horário de Atendimento</Label>
                <div className="flex gap-2 items-center">
                  <label className="text-xs">Início:</label>
                  <Input
                    type="time"
                    value={horario.inicio}
                    onChange={e => setHorario(h => ({ ...h, inicio: e.target.value }))}
                    className="w-24"
                    placeholder="08:00"
                  />
                  <label className="text-xs">Fim:</label>
                  <Input
                    type="time"
                    value={horario.fim}
                    onChange={e => setHorario(h => ({ ...h, fim: e.target.value }))}
                    className="w-24"
                    placeholder="18:00"
                  />
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
    )
}