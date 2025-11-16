import { Card, CardContent } from "@/components/ui/card";
import { PlayersTopRedCardsTable } from "@/components/players/players-top-red-cards-table";
import { playersTopRedCardsColumns } from "@/components/players/players-top-red-cards-columns";
import { TopRedCardsResponse } from "@/schemas/players-top-red-cards";
import { Trophy } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function PlayersTopRedCards({ data }: { data: TopRedCardsResponse[] }) {
  if (!data || data.length === 0) {
    return (
      <section
        aria-labelledby="top-redcards-title"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Trophy aria-hidden="true" />
            </EmptyMedia>

            <EmptyTitle id="top-redcards-title">Dados Indisponíveis</EmptyTitle>

            <EmptyDescription>
              Os dados de cartões vermelhos não estão disponíveis para esta competição no momento.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="top-redcards-title"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <h2 id="top-redcards-title" className="sr-only" itemProp="name">
        Jogadores com mais cartões vermelhos
      </h2>

      <Card>
        <CardContent role="region" aria-live="polite">
          <PlayersTopRedCardsTable
            data={data}
            columns={playersTopRedCardsColumns}
          />
        </CardContent>
      </Card>
    </section>
  );
}
