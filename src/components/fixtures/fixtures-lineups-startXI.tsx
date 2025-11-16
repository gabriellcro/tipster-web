import Link from "next/link";
import Image from "next/image";

import { TeamColors, PlayerPosition } from "@/schemas/fixtures-lineups";
import { filterByPosition, getColorPlayer } from "@/utils/lineups";
import { UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import soccerField from "@/assets/image/field.jpg";

export function FixturesLineupsStartXI({
  homeStartXI,
  awayStartXI,
  homeColors,
  awayColors,
}: {
  homeStartXI: PlayerPosition[];
  awayStartXI: PlayerPosition[];
  homeColors: TeamColors;
  awayColors: TeamColors;
}) {
  const home = {
    goalkeeper: filterByPosition({ startXI: homeStartXI, pos: "G" }),
    defenders: filterByPosition({ startXI: homeStartXI, pos: "D" }),
    midfielders: filterByPosition({ startXI: homeStartXI, pos: "M" }),
    forwards: filterByPosition({ startXI: homeStartXI, pos: "F" }),
  };

  const away = {
    forwards: filterByPosition({ startXI: awayStartXI, pos: "F" }).reverse(),
    midfielders: filterByPosition({ startXI: awayStartXI, pos: "M" }).reverse(),
    defenders: filterByPosition({ startXI: awayStartXI, pos: "D" }).reverse(),
    goalkeeper: filterByPosition({ startXI: awayStartXI, pos: "G" }).reverse(),
  };

  return (
    <article
      className="flex flex-1 flex-col h-full justify-between gap-4 md:gap-6 z-0 relative"
      aria-label="Escalação inicial das equipes"
      itemScope
      itemType="https://schema.org/SportsEvent"
    >
      <meta
        itemProp="description"
        content="Visualização das escalações iniciais com posições em campo e cores do uniforme de cada time."
      />

      <Image
        src={soccerField}
        alt="Campo de futebol com marcações de posições"
        width={494}
        height={740}
        className="w-full h-full absolute dark:opacity-70"
        priority
      />

      {/* Time da casa */}
      <section
        aria-label="Titulares do time da casa"
        itemProp="homeTeam"
        itemScope
        itemType="https://schema.org/SportsTeam"
      >
        <meta itemProp="name" content="Time da casa" />

        {Object.entries(home).map(([position, players]) => (
          <ul
            key={position}
            className="flex justify-center p-1 gap-2"
            role="list"
            aria-label={`Jogadores da posição ${position}`}
          >
            {players.map((item) => (
              <li
                key={item.player.id}
                className="flex flex-col items-center gap-1 w-1/4"
                itemProp="athlete"
                itemScope
                itemType="https://schema.org/Person"
              >
                <Link
                  href={`/players/${item.player.id}`}
                  className="flex flex-col items-center gap-1"
                  aria-label={`Ver perfil de ${item.player.name}`}
                  itemProp="url"
                >
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={`https://media.api-sports.io/football/players/${item.player.id}.png`}
                        alt={`Foto do jogador ${item.player.name}`}
                        itemProp="image"
                      />
                      <AvatarFallback>
                        <UserCircle2 className="w-8 h-8" aria-hidden="true" />
                      </AvatarFallback>
                    </Avatar>

                    <span
                      className="absolute -bottom-1 -right-0 w-4 h-4 text-xs flex justify-center items-center rounded-full"
                      style={getColorPlayer({
                        position: item.player.pos,
                        colors: homeColors,
                      })}
                      aria-label={`Camisa número ${item.player.number}`}
                      itemProp="identifier"
                    >
                      {item.player.number}
                    </span>
                  </div>

                  <span
                    className="text-white font-semibold text-center z-0 text-xs line-clamp-1"
                    itemProp="name"
                  >
                    {item.player.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </section>

      {/* Time visitante */}
      <section
        aria-label="Titulares do time visitante"
        itemProp="awayTeam"
        itemScope
        itemType="https://schema.org/SportsTeam"
      >
        <meta itemProp="name" content="Time visitante" />

        {Object.entries(away).map(([position, players]) => (
          <ul
            key={position}
            className="flex justify-center p-1 gap-2"
            role="list"
            aria-label={`Jogadores da posição ${position}`}
          >
            {players.map((item) => (
              <li
                key={item.player.id}
                className="flex flex-col items-center gap-1 w-1/4"
                itemProp="athlete"
                itemScope
                itemType="https://schema.org/Person"
              >
                <Link
                  href={`/players/${item.player.id}`}
                  className="flex flex-col items-center gap-1"
                  aria-label={`Ver perfil de ${item.player.name}`}
                  itemProp="url"
                >
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={`https://media.api-sports.io/football/players/${item.player.id}.png`}
                        alt={`Foto do jogador ${item.player.name}`}
                        itemProp="image"
                      />
                      <AvatarFallback>
                        <UserCircle2 className="w-8 h-8" aria-hidden="true" />
                      </AvatarFallback>
                    </Avatar>

                    <span
                      className="absolute -bottom-1 -right-0 w-4 h-4 text-xs flex justify-center items-center rounded-full"
                      style={getColorPlayer({
                        position: item.player.pos,
                        colors: awayColors,
                      })}
                      aria-label={`Camisa número ${item.player.number}`}
                      itemProp="identifier"
                    >
                      {item.player.number}
                    </span>
                  </div>

                  <span
                    className="text-white font-semibold text-center z-0 text-xs line-clamp-1"
                    itemProp="name"
                  >
                    {item.player.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </section>
    </article>
  );
}
