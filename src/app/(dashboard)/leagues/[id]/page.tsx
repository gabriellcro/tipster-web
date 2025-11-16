"use client";

import Link from "next/link";
import {
  StandingsApiResponseSchema,
  StandingsResponse,
} from "@/schemas/standings";
import {
  TopScorerResponse,
  TopScorersApiResponseSchema,
} from "@/schemas/players-top-scorers";
import {
  TopAssistResponse,
  TopAssistsApiResponseSchema,
} from "@/schemas/players-top-assists";
import {
  TopYellowCardsApiResponseSchema,
  TopYellowCardsResponse,
} from "@/schemas/players-top-yellow-cards";
import {
  TopRedCardsApiResponseSchema,
  TopRedCardsResponse,
} from "@/schemas/players-top-red-cards";
import { FadeIn } from "@/components/fade-in";
import { StandingsHeader } from "@/components/standings/standings-header";
import { Standings } from "@/components/standings/standings";
import { FixturesApiResponseSchema, MatchResponse } from "@/schemas/fixtures";
import { FixturesRounds } from "@/components/fixtures/fixtures-rounds";

import { PlayersTopScorers } from "@/components/players/players-top-scorers";
import { PlayersTopAssists } from "@/components/players/players-top-assists";
import { PlayersTopYellowCards } from "@/components/players/players-top-yellow-cards";
import { PlayersTopRedCards } from "@/components/players/players-top-red-cards";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// mock-data
import standingsData from "@/mock-data/standings.json";
import topScorersData from "@/mock-data/players-top-scorers.json";
import topAssistsData from "@/mock-data/players-top-assists.json";
import topYellowCardsData from "@/mock-data/players-top-yellow-cards.json";
import topRedCardsData from "@/mock-data/players-top-red-cards.json";
import roundsData from "@/mock-data/fixtures-premier-league.json";

export default function LeaguePage() {
  const parsedStandings = StandingsApiResponseSchema.parse(standingsData);
  const parsedRounds = FixturesApiResponseSchema.parse(roundsData);
  const parsedTopScorers = TopScorersApiResponseSchema.parse(topScorersData);
  const parsedTopAssists = TopAssistsApiResponseSchema.parse(topAssistsData);
  const parsedTopYellowCards = TopYellowCardsApiResponseSchema.parse(topYellowCardsData);
  const parsedTopRedCards = TopRedCardsApiResponseSchema.parse(topRedCardsData);

  const standings: StandingsResponse = parsedStandings.response[0];
  const rounds: MatchResponse[] = parsedRounds.response;
  const topScorers: TopScorerResponse[] = parsedTopScorers.response;
  const topAssists: TopAssistResponse[] = parsedTopAssists.response;
  const topYellowCards: TopYellowCardsResponse[] = parsedTopYellowCards.response;
  const topRedCards: TopRedCardsResponse[] = parsedTopRedCards.response;

  const { league } = standings;

  return (
    <FadeIn className="space-y-4 md:space-y-6" aria-label={`Página da liga ${league.name}`}>      
      <Breadcrumb aria-label="Navegação de breadcrumbs da liga">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild itemProp="url">
              <Link href="/leagues" itemProp="item">Ligas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage itemProp="name">{league.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header aria-labelledby="league-header" role="banner">
        <h1
          id="league-header"
          className="sr-only"
          itemProp="headline"
        >
          {league.name} — Classificação, Rodadas e Estatísticas Atualizadas
        </h1>
        <StandingsHeader data={standings} />
      </header>

      <main
        className="grid grid-cols-1 items-start md:grid-cols-[2fr_1fr] gap-4 md:gap-6"
        role="main"
        itemScope
        itemType="https://schema.org/SportsOrganization"
      >
        <Tabs defaultValue="standings" aria-label="Classificação e rodadas da liga">
          <TabsList className="w-full" role="tablist">
            <TabsTrigger value="standings" role="tab" aria-selected="true">Classificação</TabsTrigger>
            <TabsTrigger value="rounds" role="tab">Rodadas</TabsTrigger>
          </TabsList>

          <TabsContent value="standings" role="tabpanel">
            <Standings data={standings} />
          </TabsContent>

          <TabsContent value="rounds" role="tabpanel">
            <FixturesRounds data={rounds} />
          </TabsContent>
        </Tabs>

        <aside aria-label="Estatísticas de jogadores" itemScope itemType="https://schema.org/ItemList">
          <Tabs defaultValue="scorers" aria-label="Dados estatísticos da liga">
            <TabsList className="w-full" role="tablist">
              <TabsTrigger value="scorers">Artilharia</TabsTrigger>
              <TabsTrigger value="assists">Assistências</TabsTrigger>
              <TabsTrigger value="cards">Cartões</TabsTrigger>
            </TabsList>

            <TabsContent value="scorers" role="tabpanel">
              <PlayersTopScorers data={topScorers} />
            </TabsContent>

            <TabsContent value="assists" role="tabpanel">
              <PlayersTopAssists data={topAssists} />
            </TabsContent>

            <TabsContent value="cards" role="tabpanel">
              <div className="space-y-4 md:space-y-6">
                <PlayersTopYellowCards data={topYellowCards} />
                <PlayersTopRedCards data={topRedCards} />
              </div>
            </TabsContent>
          </Tabs>
        </aside>
      </main>
    </FadeIn>
  );
}