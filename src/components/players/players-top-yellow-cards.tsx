import { Card, CardContent } from "@/components/ui/card";
import { PlayersTopYellowCardsTable } from "@/components/players/players-top-yellow-cards-table";
import { playersTopYellowCardsColumns } from "@/components/players/players-top-yellow-cards-columns";
import { TopYellowCardsResponse } from "@/schemas/players-top-yellow-cards";
import { Trophy } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function PlayersTopYellowCards({
  data,
}: {
  data: TopYellowCardsResponse[];
}) {
  if (!data || data.length === 0) {
    return (
      <section
        aria-labelledby="top-yellowcards-title"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Trophy aria-hidden="true" />
            </EmptyMedia>

            <EmptyTitle id="top-yellowcards-title">
              Dados Indisponíveis
            </EmptyTitle>

            <EmptyDescription>
              Os dados de cartões amarelos não estão disponíveis para esta
              competição no momento.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="top-yellowcards-title"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <h2 id="top-yellowcards-title" className="sr-only" itemProp="name">
        Jogadores com mais cartões amarelos
      </h2>

      <Card>
        <CardContent role="region" aria-live="polite">
          <PlayersTopYellowCardsTable
            data={data}
            columns={playersTopYellowCardsColumns}
          />
        </CardContent>
      </Card>
    </section>
  );
}
