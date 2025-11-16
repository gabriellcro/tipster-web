"use client";

import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartBarMultipleProps {
  data: Array<{
    period: string;
    home: number;
    away: number;
  }>;
  homeLabel: string;
  awayLabel: string;
}

const chartConfig = {
  home: {
    label: "Casa",
    color: "var(--chart-1)",
  },
  away: {
    label: "Visitante",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartBarMultiple({ data }: ChartBarMultipleProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          top: 24,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="period"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />

        {/* Barras e labels */}
        <Bar dataKey="home" fill="var(--color-home)" radius={4}>
          <LabelList
            dataKey="home"
            position="top"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
        <Bar dataKey="away" fill="var(--color-away)" radius={4}>
          <LabelList
            dataKey="away"
            position="top"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
