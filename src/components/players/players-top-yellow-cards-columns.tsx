import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  formatPlayerRating,
  getPlayerRatingColor,
  translatePosition,
} from "@/utils/players";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TopYellowCardsResponse } from "@/schemas/players-top-yellow-cards";
import yellowCardIcon from "@/assets/icons/yellow-card.svg";

export const playersTopYellowCardsColumns: ColumnDef<TopYellowCardsResponse>[] = [
  {
    id: "playerName",
    accessorFn: (row) => row.player.name,
    header: "Jogador",
    cell: ({ row }) => {
      const player = row.original.player;
      const position = row.original.statistics.games.position;
      const team = row.original.statistics.team;

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
    accessorKey: "statistics.cards.yellow",
    header: () => (
      <div>
        <Image
          src={yellowCardIcon}
          alt="Cartões Amarelos"
          width={16}
          height={16}
          className="w-4 h-4"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span>{row.original.statistics.cards.yellow ?? 0}</span>
      </div>
    ),
  },

  {
    accessorKey: "statistics.games.appearences",
    header: "Partidas",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span>{row.original.statistics.games.appearences ?? 0}</span>
      </div>
    ),
  },

  {
    accessorKey: "statistics.games.rating",
    header: "Nota Média",
    cell: ({ row }) => {
      const rawRating = row.original.statistics.games.rating;
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
