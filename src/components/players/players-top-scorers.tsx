import { Card, CardContent } from "@/components/ui/card";
import { PlayersTopScorersTable } from "@/components/players/players-top-scorers-table";
import { playersTopScorersColumns } from "@/components/players/players-top-scorers-columns";
import { TopScorerResponse } from "@/schemas/players-top-scorers";
import { Trophy } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function PlayersTopScorers({ data }: { data: TopScorerResponse[] }) {
  if (!data || data.length === 0) {
    return (
      <section
        aria-labelledby="top-scorers-title"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Trophy aria-hidden="true" />
            </EmptyMedia>

            <EmptyTitle id="top-scorers-title">Dados Indisponíveis</EmptyTitle>

            <EmptyDescription>
              Os dados de artilharia não estão disponíveis para esta competição
              no momento.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="top-scorers-title"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <h2 id="top-scorers-title" className="sr-only" itemProp="name">
        Jogadores artilheiros da competição
      </h2>

      <Card>
        <CardContent role="region" aria-live="polite">
          <PlayersTopScorersTable
            data={data}
            columns={playersTopScorersColumns}
          />
        </CardContent>
      </Card>
    </section>
  );
}
