"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { MatchResponse } from "@/schemas/fixtures";
import {
  EventsResponse,
  EventDetailEnum,
  EventsApiResponseSchema,
} from "@/schemas/fixtures-events";

import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

import InjuryIcon from "@/assets/icons/injury.svg";
import MissedPenaltyIcon from "@/assets/icons/missed-penalty.svg";
import GoalIcon from "@/assets/icons/goal.svg";
import OwnGoalIcon from "@/assets/icons/own-goal.svg";
import PenaltyGoalIcon from "@/assets/icons/penalty-goal.svg";
import RedCardIcon from "@/assets/icons/red-card.svg";
import SubstitutionIcon from "@/assets/icons/substitution.svg";
import VarIcon from "@/assets/icons/var.svg";
import YellowCardIcon from "@/assets/icons/yellow-card.svg";

const EVENT_ICONS: Record<EventDetailEnum, string> = {
  "Goal cancelled": VarIcon,
  "Goal confirmed": VarIcon,
  Injury: InjuryIcon,
  "Missed Penalty": MissedPenaltyIcon,
  "Normal Goal": GoalIcon,
  "Own Goal": OwnGoalIcon,
  Penalty: PenaltyGoalIcon,
  "Penalty confirmed": VarIcon,
  "Red Card": RedCardIcon,
  "Substitution 1": SubstitutionIcon,
  "Substitution 2": SubstitutionIcon,
  "Substitution 3": SubstitutionIcon,
  "Substitution 4": SubstitutionIcon,
  "Substitution 5": SubstitutionIcon,
  "Yellow Card": YellowCardIcon,
};

const EVENT_LABELS: Record<EventDetailEnum, string> = {
  "Goal cancelled": "Gol cancelado",
  "Goal confirmed": "Gol confirmado",
  Injury: "Lesão",
  "Missed Penalty": "Pênalti perdido",
  "Normal Goal": "Gol",
  "Own Goal": "Gol contra",
  Penalty: "Pênalti",
  "Penalty confirmed": "Pênalti confirmado",
  "Red Card": "Cartão vermelho",
  "Substitution 1": "Substituição",
  "Substitution 2": "Substituição",
  "Substitution 3": "Substituição",
  "Substitution 4": "Substituição",
  "Substitution 5": "Substituição",
  "Yellow Card": "Cartão amarelo",
};

// mock data
import fixturesEventsData from "@/mock-data/fixtures-events.json";

export function FixturesEvents({ data }: { data: MatchResponse }) {
  const { teams, fixture } = data;
  const parsedEvents = EventsApiResponseSchema.parse(fixturesEventsData);
  const fixturesEvents: EventsResponse[] = [...parsedEvents.response].reverse();

  if (!fixturesEvents?.length) {
    return (
      <Card>
        <CardContent>
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle>Eventos indisponíveis</EmptyTitle>
              <EmptyDescription>
                Não há eventos registrados para esta partida.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    );
  }

  return (
    <section
      aria-label={`Eventos da partida entre ${teams.home.name} e ${teams.away.name}`}
      itemScope
      itemType="https://schema.org/SportsEvent"
    >
      <meta
        itemProp="name"
        content={`${teams.home.name} vs ${teams.away.name}`}
      />
      <meta itemProp="sport" content="Soccer" />
      <meta itemProp="startDate" content={fixture.date} />

      <Card>
        <CardContent>
          <ul className="space-y-4">
            {fixturesEvents.map((event, index) => {
              const isAway = event.team.id === teams.away.id;
              const label = EVENT_LABELS[event.detail];
              const icon = EVENT_ICONS[event.detail];

              return (
                <li
                  key={index}
                  className={cn(isAway && "justify-end", "flex items-center")}
                  itemProp="subEvent"
                  itemScope
                  itemType="https://schema.org/SportsEvent"
                >
                  <div
                    className={cn(
                      "flex items-center gap-2",
                      isAway && "flex-row-reverse"
                    )}
                  >
                    {/* Tempo do evento */}
                    <time
                      className="text-sm text-muted-foreground"
                      dateTime={`${event.time.elapsed}${
                        event.time.extra ? `+${event.time.extra}` : ""
                      }'`}
                      itemProp="startTime"
                      aria-label={`Evento aos ${event.time.elapsed} minutos`}
                    >
                      {event.time.elapsed}
                      {event.time.extra && `+${event.time.extra}`}
                    </time>

                    {/* Ícone do evento */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Image
                          src={icon}
                          alt={label}
                          width={16}
                          height={16}
                          className="w-4 h-4"
                          loading="lazy"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{label}</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Jogadores envolvidos */}
                    {event.type === "subst" && event.assist ? (
                      <div
                        className={cn("flex flex-col", isAway && "text-end")}
                        itemProp="performer"
                        itemScope
                        itemType="https://schema.org/Person"
                      >
                        <Link
                          href={`/player/${event.assist.id}`}
                          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                          aria-label={`Substituição: entra ${event.assist.name}`}
                        >
                          <span itemProp="name">{event.assist.name}</span>
                        </Link>
                        <Link
                          href={`/player/${event.player.id}`}
                          className="text-sm underline-offset-4 hover:underline"
                          aria-label={`Substituição: sai ${event.player.name}`}
                        >
                          <span itemProp="name">{event.player.name}</span>
                        </Link>
                      </div>
                    ) : (
                      <Link
                        href={`/player/${event.player.id}`}
                        className="text-sm underline-offset-4 hover:underline"
                        aria-label={`Ver perfil do jogador ${event.player.name}`}
                        itemProp="performer"
                        itemScope
                        itemType="https://schema.org/Person"
                      >
                        <span itemProp="name">{event.player.name}</span>
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
