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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export const fixturesColumns: ColumnDef<MatchResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar todas as partidas"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Selecionar esta partida"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "partidas",
    header: "Partidas",
    cell: ({ row }) => {
      const { teams, goals, fixture } = row.original;

      return (
        <Link href={`/match/${fixture.id}`} className="flex items-center gap-4 relative">
          <div className="flex max-sm:flex-col md:gap-2">
            <time
              className="md:hidden"
              dateTime={fixture.date}
            >
              {formatTime(fixture.date)}
            </time>
            <span
              className={cn(
                getColorLabel(fixture.status),
                "w-9 text-center md:text-start max-sm:text-xs"
              )}
              aria-label={`Status da partida: ${getStatusLabel({ status: fixture.status, variant: "long" })}`}
            >
              {getStatusLabel({ status: fixture.status, variant: "short" })}
            </span>
          </div>

          <div className="h-8 md:hidden">
            <Separator orientation="vertical" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[41%_6%_49%] flex-1 gap-2">
            <div className="flex items-center justify-between md:gap-6">
              <div className="flex items-center max-sm:flex-row-reverse md:justify-end md:flex-1 gap-2">
                <span>{teams.home.name}</span>
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
                <span>{teams.away.name}</span>
              </div>
            </div>
          </div>
        </Link>
      );
    },
  },
];
