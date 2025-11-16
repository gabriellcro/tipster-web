import { FixturesHeader } from "@/components/fixtures/fixtures-header";
import { FixturesStatistics } from "@/components/fixtures/fixtures-statistics";
import { FixturesEvents } from "@/components/fixtures/fixtures-events";
import { FixturesLineupsOverview } from "@/components/fixtures/fixtures-lineups-overview";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchResponse } from "@/schemas/fixtures";

export function FixturesOverview({ data }: { data: MatchResponse }) {
  const {
    teams,
    fixture,
    league,
  } = data;

  const pageTitle = `${teams.home.name} vs ${teams.away.name} - ${league.name} ${fixture.date ? new Date(fixture.date).getFullYear() : ""}`;
  const description = `Confira escalações, eventos e estatísticas completas da partida entre ${teams.home.name} e ${teams.away.name} pelo ${league.name}.`;

  return (
    <section
      className="space-y-4 md:space-y-6"
      itemScope
      itemType="https://schema.org/SportsEvent"
    >
      <h1 className="sr-only">{pageTitle}</h1>
      <meta itemProp="name" content={pageTitle} />
      <meta itemProp="description" content={description} />
      <meta itemProp="sport" content="Soccer" />
      <meta itemProp="eventStatus" content={fixture.status.long} />

      <FixturesHeader data={data} />

      <Tabs defaultValue="lineups">
        <TabsList className="w-full" aria-label="Informações da partida">
          <TabsTrigger value="lineups">Escalações</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="lineups" role="tabpanel" aria-label="Escalações da partida">
          <FixturesLineupsOverview />
        </TabsContent>

        <TabsContent value="events" role="tabpanel" aria-label="Eventos da partida">
          <FixturesEvents data={data} />
        </TabsContent>

        <TabsContent value="stats" role="tabpanel" aria-label="Estatísticas da partida">
          <FixturesStatistics />
        </TabsContent>
      </Tabs>
    </section>
  );
}
