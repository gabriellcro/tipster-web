import { PredictionsResponse } from "@/schemas/predictions";
import { ChartDonutPercentage } from "../chart-donut-percentage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PredictionsPercent({ data }: { data: PredictionsResponse }) {
  const { predictions, teams } = data;

  const predictionsLabel: Record<string, string> = {
    home: teams.home.name,
    draw: "Empate",
    away: teams.away.name,
  };

  return (
    <section
      aria-labelledby="match-predictions-title"
      itemScope
      itemType="https://schema.org/SportsPrediction"
      className="w-full"
    >
      <meta
        itemProp="name"
        content={`Probabilidades de resultado — ${teams.home.name} vs ${teams.away.name}`}
      />
      <meta
        itemProp="sport"
        content="Soccer"
      />
      <meta
        itemProp="description"
        content={`Análise de probabilidade de vitória, empate ou derrota em ${teams.home.name} vs ${teams.away.name}, baseada em desempenho recente e estatísticas históricas.`}
      />

      <Card itemProp="prediction">
        <CardHeader className="text-center">
          <CardTitle>
            <h2 id="match-predictions-title" itemProp="headline">
              Probabilidade de Resultado
            </h2>
          </CardTitle>
          <CardDescription>
            <p itemProp="comment">
              Probabilidades estimadas de vitória do mandante, empate e vitória
              do visitante, calculadas com base em estatísticas de desempenho e
              forma recente.
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-3" itemScope itemType="https://schema.org/QuantitativeValue">
          {Object.entries(predictions.percent).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col items-center"
              itemProp="valueReference"
              itemScope
              itemType="https://schema.org/PropertyValue"
            >
              <ChartDonutPercentage
                data={value}
                aria-label={`Chance de ${predictionsLabel[key]}: ${value}%`}
              />
              <span
                className="text-sm font-medium text-muted-foreground"
                itemProp="name"
              >
                {predictionsLabel[key]}
              </span>
              <meta itemProp="value" content={`${value}`} />
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
