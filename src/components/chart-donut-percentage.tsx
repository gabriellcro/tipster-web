"use client";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";

const chartConfig = {
  probability: {
    label: "Probabilidade",
  },
  filled: {
    label: "Chance",
    color: "var(--chart-1)",
  },
  remaining: {
    label: "Restante",
    color: "var(--muted)",
  },
} satisfies ChartConfig;

export function ChartDonutPercentage({ data }: { data: string }) {
  const isMobile = useIsMobile();
  const probabilityPercent = Number(data.replace("%", "").trim());
  const remainingPercent = 100 - probabilityPercent;

  const chartData = [
    {
      type: "filled",
      value: probabilityPercent,
      fill: "var(--color-filled)",
    },
    {
      type: "remaining",
      value: remainingPercent,
      fill: "var(--color-remaining)",
    },
  ];

  return (
    <div className="flex-1 md:w-full">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square min-h-[100px] md:max-h-[200px]"
      >
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="type"
            innerRadius={isMobile ? 30 : 50}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-lg md:text-3xl font-bold"
                      >
                        {data}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
