import { Stethoscope } from "lucide-react"

export const Apresentation = () => {
    return (
        
            <div className="flex flex-col justify-between gap-2 w-full h-full bg-chart-2 p-8 text-white">
                <div className="flex gap-3 items-center">
                    <div className="bg-chart-3/20 p-2 rounded-lg">
                        <Stethoscope className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-muted font-bold text-lg"> ClinicFlow </span>
                </div>

                <div className="flex flex-col gap-2 ">
                    <h2 className="text-muted- font-bold text-3xl">
                        Cuide da sua saúde com praticide e confiança.
                    </h2>
                    <p className="text-muted/80">
                        Agende suas consultas, acompanhe seus atendimentos e tenha acesso aos melhores profissionais de saúde em um só lugar. Sua jornada para uma vida mais saudável começa aqui.
                    </p>
                </div>

                <div>
                    <p className="text-muted text-sm">
                        ClinicFlow {new Date().getFullYear()} &copy; Todos os direitos reservados.
                    </p>
                </div>
            </div>
    )
}