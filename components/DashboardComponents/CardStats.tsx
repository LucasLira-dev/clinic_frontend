import { Card, CardContent } from "../ui/card"

interface CardStatsProps {
    title: string;
    value: number,
    icon: React.ElementType;
}

export const CardStats = ({ title, value, icon: Icon }: CardStatsProps) => {
    const iconBg = "bg-chart-2/20"
    const iconColor = "text-chart-2"
    
    return (
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="font-heading text-3xl font-bold text-foreground mt-2">{value}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
    )
    
}