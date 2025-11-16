import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  formatPlayerRating,
  getPlayerRatingColor,
  translatePosition,
} from "@/utils/players";

import { ColumnDef } from "@tanstack/react-table";
import { TopRedCardsResponse } from "@/schemas/players-top-red-cards";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import redCardIcon from "@/assets/icons/red-card.svg";

export const playersTopRedCardsColumns: ColumnDef<TopRedCardsResponse>[] = [
  {
    id: "playerName",
    accessorFn: (row) => row.player.name,
    header: "Jogador",
    cell: ({ row }) => {
      const player = row.original.player;
      const stats = row.original.statistics[0];
      const position = stats.games.position;
      const team = stats.team;

      return (
        <div className="flex flex-col gap-1 min-w-[200px]">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={player.photo} alt={player.name} />
              <AvatarFallback />
            </Avatar>

            <div className="flex flex-col">
              <Link
                href={`/players/${player.id}`}
                className="font-medium underline-offset-4 hover:underline transition"
              >
                {player.name}
              </Link>

              <div className="flex items-center gap-2">
                <Image
                  src={team.logo}
                  alt={`logo ${team.name}`}
                  width={12}
                  height={12}
                  className="w-3 h-3"
                />

                <span className="text-xs text-muted-foreground font-medium">
                  {translatePosition(position)}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },

  {
    id: "redCards",
    accessorFn: (row) => row.statistics[0].cards.red,
    header: () => (
      <div className="flex justify-center">
        <Image
          src={redCardIcon}
          alt="Cartões Vermelhos"
          width={16}
          height={16}
          className="w-4 h-4"
        />
      </div>
    ),
    cell: ({ row }) => {
      const red = row.original.statistics[0].cards.red ?? 0;
      return (
        <div className="flex justify-center">
          <span>{red}</span>
        </div>
      );
    },
  },

  {
    id: "appearences",
    accessorFn: (row) => row.statistics[0].games.appearences,
    header: "Partidas",
    cell: ({ row }) => {
      const apps = row.original.statistics[0].games.appearences ?? 0;
      return (
        <div className="flex justify-center">
          <span>{apps}</span>
        </div>
      );
    },
  },

  {
    id: "rating",
    accessorFn: (row) => row.statistics[0].games.rating,
    header: "Nota Média",
    cell: ({ row }) => {
      const rawRating = row.original.statistics[0].games.rating;
      const displayValue = formatPlayerRating(rawRating);

      return (
        <div className="flex justify-center">
          <Badge
            className={cn(
              getPlayerRatingColor(rawRating),
              "w-14 text-white font-semibold"
            )}
            aria-label={`Nota média: ${displayValue}`}
            itemProp="value"
          >
            {displayValue}
          </Badge>
        </div>
      );
    },
  },
];
