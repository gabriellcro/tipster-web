import { Card, CardContent } from "@/components/ui/card";
import { StandingsTable } from "@/components/standings/standings-table";
import { StandingsResponse } from "@/schemas/standings";
import { columnsStandings } from "@/components/standings/standings-columns";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Trophy } from "lucide-react";

export function Standings({ data }: { data: StandingsResponse }) {
  const league = data.league;
  const standings = league.standings[0];

  if (!standings) {
    return (
      <Card>
        <CardContent>
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Trophy />
              </EmptyMedia>
              <EmptyTitle>Tabela de Classificação Indisponível</EmptyTitle>
              <EmptyDescription>
                A tabela de classificação não está disponível para esta
                competição no momento. Isso pode ocorrer em copas ou torneios
                eliminatórios.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card itemScope itemType="https://schema.org/Table">
      <CardContent>
        <StandingsTable
          data={standings}
          leagueName={league.name}
          columns={columnsStandings}
        />
      </CardContent>
    </Card>
  );
}
