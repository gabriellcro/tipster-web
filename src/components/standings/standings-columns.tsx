"use client";
import Link from "next/link";
import Image from "next/image";
import { Standing } from "@/schemas/standings";
import { ColumnDef } from "@tanstack/react-table";
import { getRankStatusByLeague } from "@/utils/standing";

export const columnsStandings: ColumnDef<Standing>[] = [
  {
    accessorKey: "rank",
    header: "Pos",
    cell: ({ row }) => {
      const standing = row.original;
      const { color } = getRankStatusByLeague(standing.group, standing.rank);
      return (
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-5 rounded-full ${color}`} aria-hidden="true" />
          <span className="font-medium text-sm">{standing.rank}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "team",
    header: "Time",
    cell: ({ row }) => {
      const { team } = row.original;
      return (
        <div className="flex items-center gap-3 min-w-[200px]">
          <Image
            src={team.logo}
            alt={team.name}
            width={24}
            height={24}
            className="object-contain w-6 h-6"
          />
          <Link
            href={`/teams/${team.id}`}
            className="font-medium underline-offset-4 hover:underline transition"
          >
            {team.name}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "points",
    header: "Pts",
    cell: ({ row }) => <span className="font-medium">{row.original.points}</span>,
  },
  {
    accessorKey: "all.played",
    header: "J",
    cell: ({ row }) => <span className="font-medium">{row.original.all.played}</span>,
  },
  {
    accessorKey: "all.win",
    header: "V",
    cell: ({ row }) => <span className="font-medium">{row.original.all.win}</span>,
  },
  {
    accessorKey: "all.draw",
    header: "E",
    cell: ({ row }) => <span className="font-medium">{row.original.all.draw}</span>,
  },
  {
    accessorKey: "all.lose",
    header: "D",
    cell: ({ row }) => <span className="font-medium">{row.original.all.lose}</span>,
  },
  {
    accessorKey: "goals.for",
    header: "GP",
    cell: ({ row }) => <span className="font-medium">{row.original.all.goals.for}</span>,
  },
  {
    accessorKey: "goals.against",
    header: "GC",
    cell: ({ row }) => <span className="font-medium">{row.original.all.goals.against}</span>,
  },
  {
    accessorKey: "goalsDiff",
    header: "SG",
    cell: ({ row }) => {
      const diff = row.original.goalsDiff;
      return <span className="font-medium">{diff > 0 ? `+${diff}` : diff}</span>;
    },
  },
  {
    accessorKey: "form",
    header: "Últ. 5",
    cell: ({ row }) => {
      const form = row.original.form || "";
      return (
        <div className="flex gap-1">
          {form.split("").map((result, index) => {
            const bgColor =
              result === "W"
                ? "bg-green-500"
                : result === "D"
                ? "bg-gray-400"
                : "bg-red-500";
            return (
              <div
                key={index}
                className={`w-6 h-6 rounded-md ${bgColor} flex items-center justify-center text-white text-xs font-bold`}
              >
                {result}
              </div>
            );
          })}
        </div>
      );
    },
  },
];
