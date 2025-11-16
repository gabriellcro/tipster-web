"use client";

import Image from "next/image";
import { TrendingUp } from "lucide-react";
import { TeamsStats } from "@/schemas/predictions";
import { timelinePeriodLabels } from "@/utils/predictions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ChartBarMultiple } from "@/components/chart-bar-multiple";

export function PredictionsGoalsMinuteFor({ data }: { data: TeamsStats }) {
  const { away, home } = data;

  const periods = [
    "0-15",
    "16-30",
    "31-45",
    "46-60",
    "61-75",
    "76-90",
    "91-105",
  ] as const;

  // Preparar dados de gols marcados
  const chartData = periods.map((period) => ({
    period: timelinePeriodLabels[period],
    home: home?.league?.goals?.for?.minute?.[period]?.total ?? 0,
    away: away?.league?.goals?.for?.minute?.[period]?.total ?? 0,
  }));

  // Calcular totais
  const totalHomeGoals = chartData.reduce((sum, item) => sum + item.home, 0);
  const totalAwayGoals = chartData.reduce((sum, item) => sum + item.away, 0);

  if (totalHomeGoals === 0 && totalAwayGoals === 0) {
    return (
      <section
        aria-label={`Gols marcados por período: ${home.name} vs ${away.name}`}
        itemScope
        itemType="https://schema.org/SportsEvent"
      >
        <Card>
          <CardHeader>
            <CardTitle>
              <h2 className="text-lg font-semibold">
                Gols Marcados por Período
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <TrendingUp />
                </EmptyMedia>
                <EmptyTitle>Dados Indisponíveis</EmptyTitle>
                <EmptyDescription>
                  Não há dados de gols marcados disponíveis para esta partida.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section
      aria-label={`Gols marcados por período: ${home.name} vs ${away.name}`}
      itemScope
      itemType="https://schema.org/SportsEvent"
    >
      <meta
        itemProp="description"
        content={`Estatísticas de gols marcados por ${home.name} e ${away.name} em diferentes períodos da partida.`}
      />

      <Card
        itemProp="statistics"
        itemScope
        itemType="https://schema.org/SportsStatistics"
      >
        <CardHeader>
          <CardTitle>
            <h2 className="text-lg font-semibold" itemProp="name">
              Gols Marcados por Período
            </h2>
          </CardTitle>
          <CardDescription itemProp="description">
            <p>
              Distribuição de gols marcados por{" "}
              <strong itemProp="homeTeam">{home.name}</strong> e{" "}
              <strong itemProp="awayTeam">{away.name}</strong> em cada período
              da partida.
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Legenda */}
          <div
            className="flex items-center justify-center gap-6"
            aria-label="Totais de gols marcados por equipe"
          >
            <div
              className="flex items-center gap-2"
              itemProp="valueReference"
              itemScope
              itemType="https://schema.org/SportsTeam"
            >
              <Image
                src={home.logo}
                alt={`Escudo de ${home.name}`}
                width={20}
                height={20}
                className="object-contain"
                itemProp="image"
              />
              <span className="text-sm font-medium" itemProp="name">
                {home.name}
              </span>
              <span
                className="text-xs text-muted-foreground"
                itemProp="value"
                aria-label={`Total de gols marcados: ${totalHomeGoals}`}
              >
                ({totalHomeGoals} gols)
              </span>
            </div>

            <div
              className="flex items-center gap-2"
              itemProp="valueReference"
              itemScope
              itemType="https://schema.org/SportsTeam"
            >
              <Image
                src={away.logo}
                alt={`Escudo de ${away.name}`}
                width={20}
                height={20}
                className="object-contain"
                itemProp="image"
              />
              <span className="text-sm font-medium" itemProp="name">
                {away.name}
              </span>
              <span
                className="text-xs text-muted-foreground"
                itemProp="value"
                aria-label={`Total de gols marcados: ${totalAwayGoals}`}
              >
                ({totalAwayGoals} gols)
              </span>
            </div>
          </div>

          {/* Gráfico */}
          <div
            itemProp="graph"
            itemScope
            itemType="https://schema.org/DataFeed"
            aria-label="Gráfico de comparação de gols marcados por período"
          >
            <ChartBarMultiple
              data={chartData}
              homeLabel={home.name}
              awayLabel={away.name}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}