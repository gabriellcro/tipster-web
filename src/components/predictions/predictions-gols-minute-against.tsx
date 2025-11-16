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

export function PredictionsGoalsMinuteAgainst({ data }: { data: TeamsStats }) {
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

  // Preparar dados de gols sofridos
  const chartData = periods.map((period) => ({
    period: timelinePeriodLabels[period],
    home: home?.league?.goals?.against?.minute?.[period]?.total ?? 0,
    away: away?.league?.goals?.against?.minute?.[period]?.total ?? 0,
  }));

  // Calcular totais
  const totalHomeGoals = chartData.reduce((sum, item) => sum + item.home, 0);
  const totalAwayGoals = chartData.reduce((sum, item) => sum + item.away, 0);

  if (totalHomeGoals === 0 && totalAwayGoals === 0) {
    return (
      <section
        aria-label={`Estatísticas de gols sofridos por período: ${home.name} vs ${away.name}`}
        itemScope
        itemType="https://schema.org/SportsEvent"
      >
        <Card>
          <CardHeader>
            <CardTitle>
              <h2 className="text-lg font-semibold">
                Gols Sofridos por Período
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
                  Não há dados de gols sofridos disponíveis para esta partida.
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
      aria-label={`Estatísticas de gols sofridos por período: ${home.name} vs ${away.name}`}
      itemScope
      itemType="https://schema.org/SportsEvent"
    >
      <meta
        itemProp="description"
        content={`Distribuição dos gols sofridos por ${home.name} e ${away.name} em cada período da partida.`}
      />

      <Card
        itemProp="statistics"
        itemScope
        itemType="https://schema.org/SportsStatistics"
      >
        <CardHeader>
          <CardTitle>
            <h2 className="text-lg font-semibold" itemProp="name">
              Gols Sofridos por Período
            </h2>
          </CardTitle>
          <CardDescription itemProp="description">
            <p>
              Estatísticas que mostram a distribuição de gols sofridos por{" "}
              <strong itemProp="homeTeam">{home.name}</strong> e{" "}
              <strong itemProp="awayTeam">{away.name}</strong> durante os
              diferentes períodos do jogo.
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Legenda */}
          <div
            className="flex items-center justify-center gap-6"
            aria-label="Totais de gols sofridos por equipe"
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
                aria-label={`Total de gols sofridos: ${totalHomeGoals}`}
              >
                ({totalHomeGoals} gols sofridos)
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
                aria-label={`Total de gols sofridos: ${totalAwayGoals}`}
              >
                ({totalAwayGoals} gols sofridos)
              </span>
            </div>
          </div>

          {/* Gráfico */}
          <div
            itemProp="graph"
            itemScope
            itemType="https://schema.org/DataFeed"
            aria-label="Gráfico de comparação de gols sofridos por período"
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