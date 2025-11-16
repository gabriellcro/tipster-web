import Link from "next/link";
import Image from "next/image";
import { MatchResponse } from "@/schemas/fixtures";
import { EventsApiResponseSchema, EventsResponse } from "@/schemas/fixtures-events";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import goalIcon from "@/assets/icons/goal.svg";
import penaltyGoalIcon from "@/assets/icons/penalty-goal.svg";

// mock data
import fixturesEventsData from "@/mock-data/fixtures-events.json";

export function FixturesEventsGoals({ data }: { data: MatchResponse }) {
  const { teams } = data;
  const { home, away } = teams;

  const parsedEvents = EventsApiResponseSchema.parse(fixturesEventsData);

  const matchGoals = parsedEvents.response.filter(
    (item: EventsResponse) => item.type === "Goal"
  );

  if (!matchGoals.length) return null;

  const homeGoals = matchGoals.filter((item) => item.team.id === home.id);
  const awayGoals = matchGoals.filter((item) => item.team.id === away.id);

  return (
    <section
      className="grid grid-cols-2 gap-4 md:gap-6 text-xs md:text-sm"
      itemScope
      itemType="https://schema.org/SportsEvent"
      aria-label={`Gols da partida entre ${home.name} e ${away.name}`}
    >
      {/* Gols do time da casa */}
      <div itemProp="homeTeam" itemScope itemType="https://schema.org/SportsTeam">
        <meta itemProp="name" content={home.name} />
        {homeGoals.map((item, index) => {
          const { detail, player, time } = item;
          if (!player.name) return null;

          const isPenalty = detail === "Penalty";

          return (
            <article
              key={index}
              className="flex items-center justify-end gap-2"
              itemProp="event"
              itemScope
              itemType="https://schema.org/SportsEvent"
            >
              <time
                className="text-muted-foreground"
                aria-label={`Gol aos ${time.elapsed} minutos`}
                itemProp="startTime"
                content={`${time.elapsed}m`}
              >
                {`${time.elapsed}'`}
              </time>

              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src={isPenalty ? penaltyGoalIcon : goalIcon}
                    alt={isPenalty ? "Gol de pênalti" : "Gol normal"}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                    loading="lazy"
                  />
                </TooltipTrigger>
                <TooltipContent>{detail}</TooltipContent>
              </Tooltip>

              <Link
                href={`/player/${player.id}`}
                className="underline-offset-4 hover:underline transition duration-200"
                aria-label={`Ver perfil do jogador ${player.name}`}
                itemProp="performer"
                itemScope
                itemType="https://schema.org/Person"
              >
                <span itemProp="name">{player.name}</span>
              </Link>
            </article>
          );
        })}
      </div>

      {/* Gols do time visitante */}
      <div itemProp="awayTeam" itemScope itemType="https://schema.org/SportsTeam">
        <meta itemProp="name" content={away.name} />
        {awayGoals.map((item, index) => {
          const { detail, player, time } = item;
          if (!player.name) return null;

          const isPenalty = detail === "Penalty";

          return (
            <article
              key={index}
              className="flex items-center gap-2"
              itemProp="event"
              itemScope
              itemType="https://schema.org/SportsEvent"
            >
              <time
                className="text-muted-foreground"
                aria-label={`Gol aos ${time.elapsed} minutos`}
                itemProp="startTime"
                content={`${time.elapsed}m`}
              >
                {`${time.elapsed}'`}
              </time>

              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src={isPenalty ? penaltyGoalIcon : goalIcon}
                    alt={isPenalty ? "Gol de pênalti" : "Gol normal"}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                    loading="lazy"
                  />
                </TooltipTrigger>
                <TooltipContent>{detail}</TooltipContent>
              </Tooltip>

              <Link
                href={`/player/${player.id}`}
                className="underline-offset-4 hover:underline transition duration-200"
                aria-label={`Ver perfil do jogador ${player.name}`}
                itemProp="performer"
                itemScope
                itemType="https://schema.org/Person"
              >
                <span itemProp="name">{player.name}</span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
