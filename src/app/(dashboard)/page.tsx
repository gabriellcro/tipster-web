"use client";

import { FadeIn } from "@/components/fade-in";
import { FixturesByLeagues } from "@/components/fixtures/fixtures-by-leagues";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

// mockup-data
import fixturesLaliga from "@/mock-data/fixtures-laliga.json";
import fixturesPremierLeague from "@/mock-data/fixtures-premier-league.json";
import {
  FixturesApiResponseSchema,
  FixtureApiResponse,
} from "@/schemas/fixtures";

export default function MatchesPage() {
  const premierLeague = FixturesApiResponseSchema.parse(fixturesPremierLeague);
  const laLiga = FixturesApiResponseSchema.parse(fixturesLaliga);

  const allLeagues: FixtureApiResponse[] = [premierLeague, laLiga];

  return (
    <FadeIn className="space-y-6 md:space-y-8">
      <header className="max-sm:text-center space-y-2">
        <TypographyH1>Partidas</TypographyH1>
        <TypographyLead>
          Análises pré-jogo, ao vivo e resultados. Use a IA para obter insights
          estratégicos e previsões detalhadas.
        </TypographyLead>
      </header>

      <FixturesByLeagues allLeagues={allLeagues} />

      {/* <Button className="md:absolute top-0 right-0 max-sm:w-full">
        <Sparkles /> Analisar Partidas com IA
      </Button> */}
    </FadeIn>
  );
}
