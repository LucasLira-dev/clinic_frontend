import { CalendarCheck, Stethoscope, Users } from "lucide-react"

const stats = [
  {
    label: "Total Medicos",
    value: 6,
    icon: Stethoscope,
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
  },
  {
    label: "Total Pacientes",
    value: 18,
    icon: Users,
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
  },
  {
    label: "Consultas Semana",
    value: 25,
    icon: CalendarCheck,
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
  },
]

export const AdminStats = () => {
    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat: typeof stats[0]) => (
                    <div key={stat.label} className="flex items-center gap-4 border rounded-lg shadow-md p-4">
                        <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                            <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-lg font-semibold">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}