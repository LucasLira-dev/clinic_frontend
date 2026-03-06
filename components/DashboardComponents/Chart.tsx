"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A bar chart"

interface ChartBarDefaultProps {
    data: {
        day: string;
        consultas: number;
    }[]
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartBarDefault({ data }: ChartBarDefaultProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atendimentos por dia da semana </CardTitle>
        <CardDescription>  </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="xl:h-80">
          <BarChart accessibilityLayer data={data} >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis 
                tickLine={false}
                tickMargin={2}
                axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="consultas" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
