"use client";

import { TrendingUp } from "lucide-react";
import { PredictionsPercent } from "@/components/predictions/predictions-percent";
import { PredictionsResponse } from "@/schemas/predictions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PredictionsOverUnderGols } from "@/components/predictions/predictions-over-under-gols";
import { PredictionsOverUnderCards } from "@/components/predictions/predictions-over-under-cards";
import { PredictionsGoalsMinuteFor } from "@/components/predictions/predictions-gols-minute-for";
import { PredictionsGoalsMinuteAgainst } from "@/components/predictions/predictions-gols-minute-against";
import { PredictionsCardsMinuteYellow } from "@/components/predictions/predictions-cards-minute-yellow";
import { PredictionsCardsMinuteRed } from "@/components/predictions/predictions-cards-minute-red";
import { PredictionsH2H } from "@/components/predictions/predictions-h2h";
import {
  Card,
  CardContent,
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

export function PredictionsOverview({ data }: { data: PredictionsResponse }) {
  if (!data || !data.teams) {
    return (
      <section className="space-y-4 md:space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Previsões e Análises</h2>
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
                  Não há dados de previsões disponíveis para esta partida no momento.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CardContent>
        </Card>
      </section>
    );
  }

  const { teams, h2h } = data;
  const homeTeam = teams.home.name;
  const awayTeam = teams.away.name;

  return (
    <section
      aria-labelledby="predictions-title"
      className="space-y-4 md:space-y-6"
      itemScope
      itemType="https://schema.org/SportsPrediction"
    >
      <meta
        itemProp="name"
        content={`Previsões e análises de ${homeTeam} vs ${awayTeam}`}
      />
      <meta
        itemProp="description"
        content={`Análise estatística completa de ${homeTeam} vs ${awayTeam}: gols esperados, cartões, minutos decisivos e histórico H2H (últimos confrontos).`}
      />
      <meta itemProp="sport" content="Soccer" />

      {/* Probabilidade geral */}
      <PredictionsPercent data={data} />

      {/* Tabs principais */}
      <Tabs defaultValue="gols">
        <TabsList
          className="w-full"
          aria-label="Categorias de previsão: gols, cartões e confrontos diretos"
        >
          <TabsTrigger value="gols" aria-controls="tab-gols-content">
            Gols
          </TabsTrigger>
          <TabsTrigger value="cards" aria-controls="tab-cards-content">
            Cartões
          </TabsTrigger>
          <TabsTrigger value="h2h" aria-controls="tab-h2h-content">
            H2H
          </TabsTrigger>
        </TabsList>

        {/* Aba: Gols */}
        <TabsContent
          value="gols"
          id="tab-gols-content"
          role="tabpanel"
          aria-labelledby="tab-gols"
        >
          <section
            className="space-y-4 md:space-y-6"
            aria-label="Previsões de gols e probabilidades Over/Under"
          >
            <PredictionsOverUnderGols data={teams} />
            <PredictionsGoalsMinuteFor data={teams} />
            <PredictionsGoalsMinuteAgainst data={teams} />
          </section>
        </TabsContent>

        {/* Aba: Cartões */}
        <TabsContent
          value="cards"
          id="tab-cards-content"
          role="tabpanel"
          aria-labelledby="tab-cards"
        >
          <section
            className="space-y-4 md:space-y-6"
            aria-label="Previsões de cartões e comportamento disciplinar"
          >
            <PredictionsOverUnderCards data={teams} />
            <PredictionsCardsMinuteYellow data={teams} />
            <PredictionsCardsMinuteRed data={teams} />
          </section>
        </TabsContent>

        {/* Aba: Head-to-Head */}
        <TabsContent
          value="h2h"
          id="tab-h2h-content"
          role="tabpanel"
          aria-labelledby="tab-h2h"
        >
          <section
            aria-label={`Histórico de confrontos diretos entre ${homeTeam} e ${awayTeam}`}
          >
            <PredictionsH2H data={h2h} />
          </section>
        </TabsContent>
      </Tabs>
    </section>
  );
}