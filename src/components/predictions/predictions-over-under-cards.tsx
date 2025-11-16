"use client";

import Image from "next/image";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { TeamsStats } from "@/schemas/predictions";
import {
  calcMatchCardsOverProbability,
  calcMatchCardsUnderProbability,
  getProbabilityColor,
  getTotalYellowCards,
  getTotalRedCards,
  getCardsAverage,
} from "@/utils/predictions";

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
import {
  TypographyH3,
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import YellowCardIcon from "@/assets/icons/yellow-card.svg";
import RedCardIcon from "@/assets/icons/red-card.svg";

export function PredictionsOverUnderCards({ data }: { data: TeamsStats }) {
  const { away, home } = data;

  // Cálculos de totais e médias
  const homeYellowTotal = getTotalYellowCards(home.league.cards);
  const homeRedTotal = getTotalRedCards(home.league.cards);
  const awayYellowTotal = getTotalYellowCards(away.league.cards);
  const awayRedTotal = getTotalRedCards(away.league.cards);

  const homeTotalGames = home.league.fixtures.played.total;
  const awayTotalGames = away.league.fixtures.played.total;

  const homeYellowAvg = getCardsAverage(homeYellowTotal, homeTotalGames);
  const homeRedAvg = getCardsAverage(homeRedTotal, homeTotalGames);
  const awayYellowAvg = getCardsAverage(awayYellowTotal, awayTotalGames);
  const awayRedAvg = getCardsAverage(awayRedTotal, awayTotalGames);

  const totalYellowExpected = homeYellowAvg + awayYellowAvg;
  const totalRedExpected = homeRedAvg + awayRedAvg;

  // Verificar se há dados suficientes
  if (
    (homeYellowTotal === 0 && awayYellowTotal === 0 && homeRedTotal === 0 && awayRedTotal === 0) ||
    (homeTotalGames === 0 && awayTotalGames === 0)
  ) {
    return (
      <section
        aria-label={`Probabilidades de cartões — ${home.name} vs ${away.name}`}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Análise de Cartões — Over/Under ({home.name} vs {away.name})</h2>
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
                  Não há dados suficientes de cartões para calcular as probabilidades.
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
      aria-label={`Probabilidades de cartões — ${home.name} vs ${away.name}`}
      itemScope
      itemType="https://schema.org/SportsPrediction"
    >
      <meta
        itemProp="description"
        content={`Análise de cartões para ${home.name} vs ${away.name}, com probabilidades Over/Under para cartões amarelos e vermelhos, baseadas em dados históricos e distribuição de Poisson.`}
      />
      <meta itemProp="sport" content="Soccer" />

      <Card>
        <CardHeader>
          <CardTitle>
            <h2 itemProp="name">
              Análise de Cartões — Over/Under ({home.name} vs {away.name})
            </h2>
          </CardTitle>
          <CardDescription itemProp="about">
            <p>
              Probabilidades calculadas com base em{" "}
              <strong>distribuição de Poisson</strong>, considerando o
              histórico de cartões de <strong>{home.name}</strong> e{" "}
              <strong>{away.name}</strong>.
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* === CARTÕES AMARELOS === */}
          <article
            itemProp="prediction"
            itemScope
            itemType="https://schema.org/SportsEvent"
            aria-label="Previsão de cartões amarelos"
          >
            <div className="flex items-center gap-2 mb-2">
              <Image
                src={YellowCardIcon}
                alt="Ícone de cartão amarelo"
                width={16}
                height={24}
              />
              <TypographyH3 className="text-base" itemProp="name">
                Cartões Amarelos
              </TypographyH3>
            </div>

            <TypographyMuted itemProp="description" className="mb-4">
              <strong>{home.name}</strong>: {homeYellowAvg.toFixed(1)} por jogo
              • <strong>{away.name}</strong>: {awayYellowAvg.toFixed(1)} por
              jogo • Expectativa total:{" "}
              <strong>{totalYellowExpected.toFixed(1)}</strong>
            </TypographyMuted>

            {/* OVER */}
            <section aria-label="Probabilidades de Over cartões amarelos">
              <TypographySmall className="font-semibold">
                Over (Mais de X cartões amarelos)
              </TypographySmall>
              <div className="space-y-2 mt-4">
                {(["2.5", "3.5", "4.5", "5.5"] as const).map((line) => {
                  const threshold = parseFloat(line);
                  const value = calcMatchCardsOverProbability({
                    homeYellowAvg,
                    homeRedAvg: 0,
                    awayYellowAvg,
                    awayRedAvg: 0,
                    threshold,
                  });
                  const cardsNeeded = Math.floor(threshold) + 1;

                  return (
                    <div
                      key={line}
                      className="flex items-center justify-between"
                      itemProp="possibleOutcome"
                      itemScope
                      itemType="https://schema.org/WinAction"
                    >
                      <div className="flex flex-col">
                        <TypographySmall itemProp="name">
                          Over {line}
                        </TypographySmall>
                        <TypographyMuted
                          className="text-xs"
                          itemProp="description"
                        >
                          {cardsNeeded}+ cartões amarelos
                        </TypographyMuted>
                      </div>
                      <Badge
                        className={cn(
                          getProbabilityColor(value),
                          "w-14 text-white font-semibold"
                        )}
                        aria-label={`Probabilidade Over ${line}: ${value}%`}
                      >
                        {value}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </section>

            <Separator className="my-4" />

            {/* UNDER */}
            <section aria-label="Probabilidades de Under cartões amarelos">
              <TypographySmall className="font-semibold">
                Under (Menos de X cartões amarelos)
              </TypographySmall>
              <div className="space-y-2 mt-4">
                {(["2.5", "3.5", "4.5", "5.5"] as const).map((line) => {
                  const threshold = parseFloat(line);
                  const value = calcMatchCardsUnderProbability({
                    homeYellowAvg,
                    homeRedAvg: 0,
                    awayYellowAvg,
                    awayRedAvg: 0,
                    threshold,
                  });
                  const cardsMax = Math.floor(threshold);

                  return (
                    <div
                      key={line}
                      className="flex items-center justify-between"
                      itemProp="possibleOutcome"
                      itemScope
                      itemType="https://schema.org/LoseAction"
                    >
                      <div className="flex flex-col">
                        <TypographySmall itemProp="name">
                          Under {line}
                        </TypographySmall>
                        <TypographyMuted
                          className="text-xs"
                          itemProp="description"
                        >
                          0 a {cardsMax} cartões amarelos
                        </TypographyMuted>
                      </div>
                      <Badge
                        className={cn(
                          getProbabilityColor(value),
                          "w-14 text-white font-semibold"
                        )}
                        aria-label={`Probabilidade Under ${line}: ${value}%`}
                      >
                        {value}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </section>
          </article>

          <Separator />

          {/* === CARTÕES VERMELHOS === */}
          <article
            itemProp="prediction"
            itemScope
            itemType="https://schema.org/SportsEvent"
            aria-label="Previsão de cartões vermelhos"
          >
            <div className="flex items-center gap-2 mb-2">
              <Image
                src={RedCardIcon}
                alt="Ícone de cartão vermelho"
                width={16}
                height={24}
              />
              <TypographyH3 className="text-base" itemProp="name">
                Cartões Vermelhos
              </TypographyH3>
            </div>

            <TypographyMuted itemProp="description" className="mb-4">
              <strong>{home.name}</strong>: {homeRedAvg.toFixed(2)} por jogo •{" "}
              <strong>{away.name}</strong>: {awayRedAvg.toFixed(2)} por jogo •
              Expectativa total:{" "}
              <strong>{totalRedExpected.toFixed(2)}</strong>
            </TypographyMuted>

            {/* OVER */}
            <section aria-label="Probabilidades de Over cartões vermelhos">
              <TypographySmall className="font-semibold">
                Over (Mais de X cartões vermelhos)
              </TypographySmall>
              <div className="space-y-2 mt-4">
                {(["0.5", "1.5", "2.5"] as const).map((line) => {
                  const threshold = parseFloat(line);
                  const value = calcMatchCardsOverProbability({
                    homeYellowAvg: 0,
                    homeRedAvg,
                    awayYellowAvg: 0,
                    awayRedAvg,
                    threshold,
                  });
                  const cardsNeeded = Math.floor(threshold) + 1;

                  return (
                    <div
                      key={line}
                      className="flex items-center justify-between"
                      itemProp="possibleOutcome"
                      itemScope
                      itemType="https://schema.org/WinAction"
                    >
                      <div className="flex flex-col">
                        <TypographySmall itemProp="name">
                          Over {line}
                        </TypographySmall>
                        <TypographyMuted
                          className="text-xs"
                          itemProp="description"
                        >
                          {cardsNeeded}+ cartões vermelhos
                        </TypographyMuted>
                      </div>
                      <Badge
                        className={cn(
                          getProbabilityColor(value),
                          "w-14 text-white font-semibold"
                        )}
                        aria-label={`Probabilidade Over ${line}: ${value}%`}
                      >
                        {value}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </section>

            <Separator className="my-4" />

            {/* UNDER */}
            <section aria-label="Probabilidades de Under cartões vermelhos">
              <TypographySmall className="font-semibold">
                Under (Menos de X cartões vermelhos)
              </TypographySmall>
              <div className="space-y-2 mt-4">
                {(["0.5", "1.5", "2.5"] as const).map((line) => {
                  const threshold = parseFloat(line);
                  const value = calcMatchCardsUnderProbability({
                    homeYellowAvg: 0,
                    homeRedAvg,
                    awayYellowAvg: 0,
                    awayRedAvg,
                    threshold,
                  });
                  const cardsMax = Math.floor(threshold);

                  return (
                    <div
                      key={line}
                      className="flex items-center justify-between"
                      itemProp="possibleOutcome"
                      itemScope
                      itemType="https://schema.org/LoseAction"
                    >
                      <div className="flex flex-col">
                        <TypographySmall itemProp="name">
                          Under {line}
                        </TypographySmall>
                        <TypographyMuted
                          className="text-xs"
                          itemProp="description"
                        >
                          0 a {cardsMax} cartões vermelhos
                        </TypographyMuted>
                      </div>
                      <Badge
                        className={cn(
                          getProbabilityColor(value),
                          "w-14 text-white font-semibold"
                        )}
                        aria-label={`Probabilidade Under ${line}: ${value}%`}
                      >
                        {value}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </section>
          </article>
        </CardContent>
      </Card>
    </section>
  );
}