import { Trophy } from "lucide-react";
import { TopAssistResponse } from "@/schemas/players-top-assists";
import { playersTopAssistsColumns } from "@/components/players/players-top-assists-columns";
import { PlayersTopAssistsTable } from "@/components/players/players-top-assists-table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function PlayersTopAssists({ data }: { data: TopAssistResponse[] }) {
  if (!data || data.length === 0) {
    return (
      <section
        aria-labelledby="top-assists-title"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <Card>
          <CardContent role="region" aria-live="polite">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Trophy aria-hidden="true" />
                </EmptyMedia>
                <EmptyTitle id="top-assists-title">
                  Dados Indisponíveis
                </EmptyTitle>
                <EmptyDescription>
                  Os dados de assistências não estão disponíveis para esta
                  competição no momento.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="top-assists-title"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <Card>
        <CardContent role="region" aria-live="polite">
          <h2 id="top-assists-title" className="sr-only" itemProp="name">
            Jogadores com mais assistências
          </h2>
          <PlayersTopAssistsTable
            data={data}
            columns={playersTopAssistsColumns}
          />
        </CardContent>
      </Card>
    </section>
  );
}
