"use client";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  getStatusLabel,
  getColorLabel,
  formatTime,
  isMatchNotStarted,
} from "@/utils/fixtures";
import { MatchResponse } from "@/schemas/fixtures";
import { ColumnDef } from "@tanstack/react-table";
import { Separator } from "@/components/ui/separator";

export const fixturesRoundsColumns: ColumnDef<MatchResponse>[] = [
  {
    accessorKey: "partidas",
    header: "Jogos da rodada",
    cell: ({ row }) => {
      const { teams, goals, fixture } = row.original;

      return (
        <div className="flex items-center gap-4 relative">
          <div className="flex max-sm:flex-col md:gap-2">
            <time className="md:hidden" dateTime={fixture.date}>
              {formatTime(fixture.date)}
            </time>
            <span
              className={cn(
                getColorLabel(fixture.status),
                "w-9 text-center md:text-start max-sm:text-xs"
              )}
              aria-label={`Status da partida: ${getStatusLabel({
                status: fixture.status,
                variant: "long",
              })}`}
            >
              {getStatusLabel({ status: fixture.status, variant: "short" })}
            </span>
          </div>

          <div className="h-8 md:hidden">
            <Separator orientation="vertical" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[40%_8%_48%] flex-1 gap-2">
            <div className="flex items-center justify-between md:gap-6">
              <div className="flex items-center max-sm:flex-row-reverse md:justify-end md:flex-1 gap-2">
                <Link
                  href={`teams/${teams.home.id}`}
                  className="underline-offset-4 hover:underline"
                >
                  {teams.home.name}
                </Link>
                <Image
                  src={teams.home.logo}
                  alt={`Logo ${teams.home.name}`}
                  height={24}
                  width={24}
                  className="w-5 h-5 md:w-6 md:h-6"
                />
              </div>
            </div>

            {isMatchNotStarted(fixture.status) ? (
              <div className="flex justify-center items-center max-sm:hidden">
                <time dateTime={fixture.date}>{formatTime(fixture.date)}</time>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2 max-sm:absolute max-sm:flex-col max-sm:right-0">
                {goals.home !== null && <span>{goals.home}</span>}
                <span className="text-center max-sm:hidden">-</span>
                {goals.away !== null && <span>{goals.away}</span>}
              </div>
            )}

            <div className="flex max-sm:flex-row-reverse items-center justify-between md:gap-6">
              <div className="flex items-center flex-1 gap-2">
                <Image
                  src={teams.away.logo}
                  alt={`Logo ${teams.away.name}`}
                  height={24}
                  width={24}
                  className="w-5 h-5 md:w-6 md:h-6"
                />
                <Link
                  href={`teams/${teams.away.id}`}
                  className="underline-offset-4 hover:underline"
                >
                  {teams.away.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
];
