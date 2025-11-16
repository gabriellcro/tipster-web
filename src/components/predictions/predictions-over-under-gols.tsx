"use client";

import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { TeamsStats } from "@/schemas/predictions";
import {
  calcMatchOverProbability,
  calcMatchUnderProbability,
  getProbabilityColor,
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

export function PredictionsOverUnderGols({ data }: { data: TeamsStats }) {
  const { away, home } = data;

  // Cálculo de expectativa total de gols
  const homeScoresAvg = parseFloat(home.league.goals.for.average.home);
  const homeConcedesAvg = parseFloat(home.league.goals.against.average.home);
  const awayScoresAvg = parseFloat(away.league.goals.for.average.away);
  const awayConcedesAvg = parseFloat(away.league.goals.against.average.away);

  const homeExpected = (homeScoresAvg + awayConcedesAvg) / 2;
  const awayExpected = (awayScoresAvg + homeConcedesAvg) / 2;
  const totalExpected = homeExpected + awayExpected;

  // Verificar se há dados válidos
  if (
    isNaN(homeScoresAvg) ||
    isNaN(homeConcedesAvg) ||
    isNaN(awayScoresAvg) ||
    isNaN(awayConcedesAvg) ||
    (homeScoresAvg === 0 && homeConcedesAvg === 0 && awayScoresAvg === 0 && awayConcedesAvg === 0)
  ) {
    return (
      <section
        aria-label={`Probabilidades de gols — ${home.name} vs ${away.name}`}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Análise de Gols — Over/Under ({home.name} vs {away.name})</h2>
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
                  Não há dados suficientes de gols para calcular as probabilidades.
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
      aria-label={`Probabilidades de gols — ${home.name} vs ${away.name}`}
      itemScope
      itemType="https://schema.org/SportsPrediction"
    >
      <meta
        itemProp="description"
        content={`Análise de gols esperados para ${home.name} vs ${away.name}, com probabilidades Over/Under calculadas usando distribuição de Poisson. Expectativa: ${totalExpected.toFixed(
          1
        )} gols.`}
      />
      <meta itemProp="sport" content="Soccer" />

      <Card>
        <CardHeader>
          <CardTitle>
            <h2 itemProp="name">
              Análise de Gols — Over/Under ({home.name} vs {away.name})
            </h2>
          </CardTitle>
          <CardDescription itemProp="about">
            <p>
              Probabilidades calculadas com base na{" "}
              <strong>distribuição de Poisson</strong>, considerando o ataque e
              defesa de <strong>{home.name}</strong> (
              {homeScoresAvg.toFixed(1)} gols/jogo em casa) e{" "}
              <strong>{away.name}</strong> ({awayConcedesAvg.toFixed(1)} gols
              sofridos/jogo fora). Expectativa:{" "}
              <strong>{totalExpected.toFixed(1)} gols</strong> no jogo.
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* OVER */}
          <article
            itemProp="prediction"
            itemScope
            itemType="https://schema.org/SportsEvent"
            aria-label="Probabilidades de Over (acima de X gols)"
          >
            <div className="space-y-2 mb-6">
              <TypographyH3 className="text-base" itemProp="name">
                Over (Acima de X gols)
              </TypographyH3>
              <TypographyMuted itemProp="description">
                Estimativa da chance de o jogo ter <strong>mais gols</strong> do
                que o limite indicado.
              </TypographyMuted>

              <div className="space-y-2 mt-4">
                {(["0.5", "1.5", "2.5", "3.5", "4.5"] as const).map((line) => {
                  const threshold = parseFloat(line);
                  const value = calcMatchOverProbability({
                    homeScoresAvg,
                    homeConcedesAvg,
                    awayScoresAvg,
                    awayConcedesAvg,
                    threshold,
                  });
                  const goalsNeeded = Math.floor(threshold) + 1;

                  return (
                    <div
                      key={line}
                      className="flex items-center justify-between"
                      itemProp="possibleOutcome"
                      itemScope
                      itemType="https://schema.org/QuantitativeValue"
                    >
                      <div className="flex flex-col">
                        <TypographySmall itemProp="name">
                          Over {line}
                        </TypographySmall>
                        <TypographyMuted
                          className="text-xs"
                          itemProp="description"
                        >
                          {goalsNeeded}+ gols no jogo
                        </TypographyMuted>
                      </div>
                      <Badge
                        className={cn(
                          getProbabilityColor(value),
                          "w-14 text-white font-semibold"
                        )}
                        aria-label={`Probabilidade Over ${line}: ${value}%`}
                        itemProp="value"
                      >
                        {value}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

          <Separator />

          {/* UNDER */}
          <article
            itemProp="prediction"
            itemScope
            itemType="https://schema.org/SportsEvent"
            aria-label="Probabilidades de Under (abaixo de X gols)"
          >
            <div className="space-y-2 mb-6">
              <TypographyH3 itemProp="name" className="text-base">
                Under (Abaixo de X gols)
              </TypographyH3>
              <TypographyMuted itemProp="description">
                Estimativa da chance de o jogo ter{" "}
                <strong>menos gols</strong> que o limite indicado.
              </TypographyMuted>

              <div className="space-y-2 mt-4">
                {(["0.5", "1.5", "2.5", "3.5", "4.5"] as const).map((line) => {
                  const threshold = parseFloat(line);
                  const value = calcMatchUnderProbability({
                    homeScoresAvg,
                    homeConcedesAvg,
                    awayScoresAvg,
                    awayConcedesAvg,
                    threshold,
                  });
                  const goalsMax = Math.floor(threshold);

                  return (
                    <div
                      key={line}
                      className="flex items-center justify-between"
                      itemProp="possibleOutcome"
                      itemScope
                      itemType="https://schema.org/QuantitativeValue"
                    >
                      <div className="flex flex-col">
                        <TypographySmall itemProp="name">
                          Under {line}
                        </TypographySmall>
                        <TypographyMuted
                          className="text-xs"
                          itemProp="description"
                        >
                          0 a {goalsMax} gols no jogo
                        </TypographyMuted>
                      </div>
                      <Badge
                        className={cn(
                          getProbabilityColor(value),
                          "w-14 text-white font-semibold"
                        )}
                        aria-label={`Probabilidade Under ${line}: ${value}%`}
                        itemProp="value"
                      >
                        {value}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        </CardContent>
      </Card>
    </section>
  );
}