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
import YellowCardIcon from "@/assets/icons/yellow-card.svg";

export function PredictionsCardsMinuteYellow({ data }: { data: TeamsStats }) {
  const { home, away } = data;

  const periods = [
    "0-15",
    "16-30",
    "31-45",
    "46-60",
    "61-75",
    "76-90",
    "91-105",
  ] as const;

  const chartData = periods.map((period) => ({
    period: timelinePeriodLabels[period],
    home: home?.league?.cards?.yellow?.[period]?.total ?? 0,
    away: away?.league?.cards?.yellow?.[period]?.total ?? 0,
  }));

  const totalHome = chartData.reduce((sum, item) => sum + item.home, 0);
  const totalAway = chartData.reduce((sum, item) => sum + item.away, 0);

  if (totalHome === 0 && totalAway === 0) {
    return (
      <section
        aria-label={`Estatísticas de cartões amarelos por período: ${home.name} vs ${away.name}`}
        itemScope
        itemType="https://schema.org/SportsEvent"
      >
        <Card>
          <CardHeader>
            <CardTitle>
              <h2 className="flex items-center gap-2">
                <Image
                  src={YellowCardIcon}
                  alt="Ícone de cartão amarelo"
                  width={18}
                  height={24}
                  className="object-contain"
                />
                Cartões Amarelos por Período
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
                  Não há dados de cartões amarelos disponíveis para esta partida.
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
      aria-label={`Estatísticas de cartões amarelos por período: ${home.name} vs ${away.name}`}
      itemScope
      itemType="https://schema.org/SportsEvent"
    >
      <meta
        itemProp="description"
        content={`Distribuição de cartões amarelos de ${home.name} e ${away.name} durante os períodos do jogo.`}
      />

      <Card
        itemProp="statistics"
        itemScope
        itemType="https://schema.org/SportsStatistics"
      >
        <CardHeader>
          <CardTitle>
            <h2 className="flex items-center gap-2" itemProp="name">
              <Image
                src={YellowCardIcon}
                alt="Ícone de cartão amarelo"
                width={18}
                height={24}
                className="object-contain"
              />
              Cartões Amarelos por Período
            </h2>
          </CardTitle>
          <CardDescription itemProp="description">
            <p>
              Estatísticas de cartões amarelos recebidos por{" "}
              <strong itemProp="homeTeam">{home.name}</strong> e{" "}
              <strong itemProp="awayTeam">{away.name}</strong> em cada intervalo
              de tempo da partida.
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Legenda */}
          <div
            className="flex items-center justify-center gap-6"
            aria-label="Resumo total de cartões amarelos por equipe"
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
                aria-label={`Total de cartões amarelos: ${totalHome}`}
              >
                ({totalHome} amarelos)
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
                aria-label={`Total de cartões amarelos: ${totalAway}`}
              >
                ({totalAway} amarelos)
              </span>
            </div>
          </div>

          {/* Gráfico */}
          <div
            itemProp="graph"
            itemScope
            itemType="https://schema.org/DataFeed"
            aria-label="Gráfico comparativo de cartões amarelos por período"
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