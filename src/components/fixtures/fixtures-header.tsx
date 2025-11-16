"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { MatchResponse } from "@/schemas/fixtures";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatTime, getColorLabel, getStatusLabel } from "@/utils/fixtures";
import { FixturesEventsGoals } from "@/components/fixtures/fixtures-events-gols";
import { ButtonStar } from "@/components/button-star";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyMuted } from "@/components/ui/typography";

export function FixturesHeader({ data }: { data: MatchResponse }) {
  const isMobile = useIsMobile();
  const statusLabel = isMobile ? "short" : "long";
  
  const { fixture, teams, goals, league } = data;

  const matchTitle = `${teams.home.name} vs ${teams.away.name} - ${league.name}`;

  return (
    <article
      itemScope
      itemType="https://schema.org/SportsEvent"
      aria-label={`Partida entre ${teams.home.name} e ${teams.away.name} pela ${league.name}`}
    >
      {/* Microdados importantes para SEO */}
      <meta itemProp="name" content={matchTitle} />
      <meta itemProp="sport" content="Soccer" />
      <meta itemProp="startDate" content={fixture.date} />
      <meta itemProp="location" content={fixture.venue.name} />

      <Card aria-labelledby="match-header-title">
        <CardHeader className="text-center">
          <TypographyMuted
            id="match-header-title"
            className="flex items-center justify-center gap-1 text-sm text-muted-foreground"
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span itemProp="location">{fixture.venue.name}</span>
          </TypographyMuted>
        </CardHeader>

        <CardContent className="space-y-6 px-2">
          {/* Times e placar */}
          <div
            className="flex items-center justify-between max-w-lg mx-auto"
            itemProp="competitor"
          >
            {/* Time da casa */}
            <div className="flex items-center gap-2 md:gap-4">
              <ButtonStar aria-label={`Favoritar ${teams.home.name}`} />

              <div
                className="flex flex-col items-center gap-1"
                itemScope
                itemType="https://schema.org/SportsTeam"
              >
                <Image
                  src={teams.home.logo}
                  alt={`Escudo do ${teams.home.name}`}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                  itemProp="logo"
                  loading="lazy"
                />
                <Button variant="link" className="font-semibold" asChild>
                  <Link
                    href={`/team/${teams.home.id}`}
                    itemProp="name"
                    aria-label={`Ver detalhes do ${teams.home.name}`}
                  >
                    {teams.home.name}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Placar ou horário */}
            <div className="flex flex-col text-center" itemProp="eventStatus">
              {goals.home !== null && goals.away !== null ? (
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="flex items-center gap-2"
                    itemProp="score"
                    aria-label={`Placar: ${teams.home.name} ${goals.home} a ${goals.away} ${teams.away.name}`}
                  >
                    <span className="text-2xl font-semibold" itemProp="homeTeamScore">
                      {goals.home}
                    </span>
                    <span className="text-2xl font-semibold">-</span>
                    <span className="text-2xl font-semibold" itemProp="awayTeamScore">
                      {goals.away}
                    </span>
                  </div>
                </div>
              ) : (
                <time
                  className="font-semibold"
                  dateTime={fixture.date}
                  itemProp="startDate"
                  aria-label={`Horário da partida: ${formatTime(fixture.date)}`}
                >
                  {formatTime(fixture.date)}
                </time>
              )}

              <small
                className={getColorLabel(fixture.status)}
                itemProp="eventStatus"
              >
                {getStatusLabel({
                  status: fixture.status,
                  variant: statusLabel,
                })}
              </small>
            </div>

            {/* Time visitante */}
            <div className="flex items-center gap-2 md:gap-4">
              <div
                className="flex flex-col items-center gap-1"
                itemScope
                itemType="https://schema.org/SportsTeam"
              >
                <Image
                  src={teams.away.logo}
                  alt={`Escudo do ${teams.away.name}`}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                  itemProp="logo"
                  loading="lazy"
                />
                <Button variant="link" className="font-semibold" asChild>
                  <Link
                    href={`/team/${teams.away.id}`}
                    itemProp="name"
                    aria-label={`Ver detalhes do ${teams.away.name}`}
                  >
                    {teams.away.name}
                  </Link>
                </Button>
              </div>

              <ButtonStar aria-label={`Favoritar ${teams.away.name}`} />
            </div>
          </div>

          {/* Gols da partida */}
          <FixturesEventsGoals data={data} />
        </CardContent>
      </Card>
    </article>
  );
}
