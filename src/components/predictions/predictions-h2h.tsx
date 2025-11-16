"use client";

import Image from "next/image";
import { TrendingUp } from "lucide-react";
import { formatDateShort } from "@/utils/fixtures";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import { H2HMatchResponse } from "@/schemas/fixtures-headtohead";
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

export function PredictionsH2H({ data }: { data: H2HMatchResponse[] }) {
  if (!data || data.length === 0) {
    return (
      <Card aria-labelledby="h2h-title">
        <CardHeader>
          <CardTitle>
            <h2 id="h2h-title">Histórico de Confrontos</h2>
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
                Não há histórico de confrontos disponível entre essas equipes.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    );
  }

  const firstMatch = data[0];
  
  const homeTeam = firstMatch.teams.home.name;
  const awayTeam = firstMatch.teams.away.name;

  return (
    <Card
      aria-labelledby="h2h-title"
      itemScope
      itemType="https://schema.org/SportsEvent"
    >
      <CardHeader>
        <CardTitle>
          <h2 id="h2h-title" itemProp="name">
            Histórico de Confrontos: {homeTeam} x {awayTeam}
          </h2>
        </CardTitle>
        <CardDescription itemProp="description">
          Veja o histórico de confrontos diretos entre{" "}
          <strong itemProp="competitor" itemScope itemType="https://schema.org/SportsTeam">
            <span itemProp="name">{homeTeam}</span>
          </strong>{" "}
          e{" "}
          <strong itemProp="competitor" itemScope itemType="https://schema.org/SportsTeam">
            <span itemProp="name">{awayTeam}</span>
          </strong>
          . Confira resultados anteriores, número de vitórias, empates e o desempenho recente de ambas as equipes.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div itemProp="subEvent" itemScope itemType="https://schema.org/SportsEvent">
          {data.map((match, index) => {
            const { fixture, teams, goals, league } = match;

            return (
              <article
                key={index}
                className="space-y-3 border-b last:border-none py-4"
                itemScope
                itemType="https://schema.org/SportsEvent"
                aria-label={`Partida entre ${teams.home.name} e ${teams.away.name} em ${new Date(
                  fixture.date
                ).toLocaleDateString("pt-BR")}`}
              >
                <meta itemProp="startDate" content={fixture.date} />
                <meta itemProp="sport" content="Soccer" />

                <div className="flex flex-col items-center gap-4 text-center">
                  <div>
                    <TypographyMuted className="text-xs" itemProp="startDate">
                      {formatDateShort(fixture.date)}
                    </TypographyMuted>
                    <TypographySmall itemProp="eventSeries">
                      {league.name}
                    </TypographySmall>
                  </div>

                  <div className="grid grid-cols-[2fr_1fr_2fr] gap-3 items-center">
                    {/* Time da casa */}
                    <div
                      className="flex items-center justify-end gap-2"
                      itemProp="homeTeam"
                      itemScope
                      itemType="https://schema.org/SportsTeam"
                    >
                      <TypographySmall itemProp="name">
                        {teams.home.name}
                      </TypographySmall>
                      <Image
                        src={teams.home.logo}
                        alt={`Escudo do ${teams.home.name}`}
                        width={24}
                        height={24}
                        itemProp="logo"
                      />
                    </div>

                    {/* Placar */}
                    <div
                      className="space-x-2 text-center font-medium"
                      itemProp="aggregateScore"
                      itemScope
                      itemType="https://schema.org/QuantitativeValue"
                    >
                      <TypographySmall itemProp="homeScore">
                        {goals.home}
                      </TypographySmall>
                      <TypographySmall>-</TypographySmall>
                      <TypographySmall itemProp="awayScore">
                        {goals.away}
                      </TypographySmall>
                    </div>

                    {/* Time visitante */}
                    <div
                      className="flex items-center gap-2"
                      itemProp="awayTeam"
                      itemScope
                      itemType="https://schema.org/SportsTeam"
                    >
                      <Image
                        src={teams.away.logo}
                        alt={`Escudo do ${teams.away.name}`}
                        width={24}
                        height={24}
                        itemProp="logo"
                      />
                      <TypographySmall itemProp="name">
                        {teams.away.name}
                      </TypographySmall>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}