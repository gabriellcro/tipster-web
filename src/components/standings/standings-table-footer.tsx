"use client";
import * as React from "react";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { LegendDot } from "./standings-legend-dot";
import { Standing } from "@/schemas/standings";
import { getRankStatusByLeague } from "@/utils/standing";

interface StandingsTableFooterProps {
  data: Standing[];
  leagueName: string;
  columnsLength: number;
}

export function StandingsTableFooter({
  data,
  leagueName,
  columnsLength,
}: StandingsTableFooterProps) {
  // Gera legendas únicas baseadas nos rankings da liga
  const legends = React.useMemo(() => {
    const legendMap = new Map<string, { color: string; label: string }>();

    data.forEach((standing) => {
      const { color, label } = getRankStatusByLeague(leagueName, standing.rank);
      if (!legendMap.has(label)) {
        legendMap.set(label, { color, label });
      }
    });

    // Remove "Zona neutra" da legenda
    legendMap.delete("Zona neutra");
    legendMap.delete("Posição neutra");

    return Array.from(legendMap.values());
  }, [data, leagueName]);

  if (legends.length === 0) return null;

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={columnsLength}>
          <div className="flex flex-col md:flex-row gap-4 text-xs md:text-sm text-muted-foreground">
            {legends.map((legend) => (
              <LegendDot
                key={legend.label}
                color={legend.color}
                label={legend.label}
              />
            ))}
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}