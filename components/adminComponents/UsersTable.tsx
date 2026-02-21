/* eslint-disable @next/next/no-img-element */
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Star, } from "lucide-react"
import { DoctorTableRow, PatientTableRow } from "@/types/index"
import { DeleteButton } from "./DeleteButton"
import { AddDoctorForm } from "./AddDoctorForm"


interface UsersTableProps {
    doctorsData: DoctorTableRow[] | undefined;
    isLoading: boolean;
    error: unknown;
    patientsData: PatientTableRow[] | undefined;
    isLoadingPatients: boolean;
    errorPatients: unknown;
    refetchDoctors?: () => Promise<unknown>; 
}

export default function UsersTable({ doctorsData, isLoading, error, patientsData, isLoadingPatients, errorPatients, refetchDoctors }: UsersTableProps) {

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
          <AddDoctorForm refetchDoctors={refetchDoctors} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
