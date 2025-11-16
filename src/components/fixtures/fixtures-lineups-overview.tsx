import Image from "next/image";
import Link from "next/link";
import {
  LineupsApiResponseSchema,
  TeamLineupResponse,
} from "@/schemas/fixtures-lineups";
import { FixturesLineupsFormation } from "@/components/fixtures/fixtures-lineups-formation";
import { FixturesLineupsCoach } from "@/components/fixtures/fixtures-lineups-coach";
import { FixturesLineupsStartXI } from "@/components/fixtures/fixtures-lineups-startXI";
import { FixturesLineupsSubstitutes } from "@/components/fixtures/fixtures-lineups-substitutes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

// mock data
import fixturesLineupsData from "@/mock-data/fixtures-lineups.json";

export function FixturesLineupsOverview() {
  const parsedLineups = LineupsApiResponseSchema.parse(fixturesLineupsData);

  const homeLineups: TeamLineupResponse = parsedLineups.response[0];
  const awayLineups: TeamLineupResponse = parsedLineups.response[1];

  if (!parsedLineups.response || parsedLineups.response.length === 0) {
    return (
      <Card>
        <CardContent>
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle>Escalações Indisponíveis</EmptyTitle>
              <EmptyDescription>
                Não há informações de lineups para esta partida.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    );
  }

  return (
    <article
      className="space-y-4 md:space-y-6"
      aria-label="Escalações da partida"
      itemScope
      itemType="https://schema.org/SportsEvent"
    >
      {/* Overview da partida */}
      <Card>
        <CardContent className="space-y-4 px-0">
          {/* Time da casa */}
          <div
            className="flex items-center justify-between px-6"
            itemScope
            itemType="https://schema.org/SportsTeam"
            itemProp="homeTeam"
          >
            <div className="flex items-center gap-2">
              <Image
                src={homeLineups.team.logo}
                alt={`Escudo do ${homeLineups.team.name}`}
                width={20}
                height={20}
                className="w-5 h-5"
                itemProp="logo"
              />
              <Link
                href={`team/${homeLineups.team.id}`}
                className="text-sm underline-offset-4 hover:underline"
                aria-label={`Ver perfil do time ${homeLineups.team.name}`}
                itemProp="name"
              >
                {homeLineups.team.name}
              </Link>
            </div>
            <FixturesLineupsFormation data={homeLineups.formation} />
          </div>

          {/* Titulares */}
          <div className="md:px-6">
            <FixturesLineupsStartXI
              homeStartXI={homeLineups.startXI}
              awayStartXI={awayLineups.startXI}
              homeColors={homeLineups.team.colors}
              awayColors={awayLineups.team.colors}
            />
          </div>

          {/* Time visitante */}
          <div
            className="flex items-center justify-between px-6"
            itemScope
            itemType="https://schema.org/SportsTeam"
            itemProp="awayTeam"
          >
            <div className="flex items-center gap-2">
              <Image
                src={awayLineups.team.logo}
                alt={`Escudo do ${awayLineups.team.name}`}
                width={20}
                height={20}
                className="w-5 h-5"
                itemProp="logo"
              />
              <Link
                href={`team/${awayLineups.team.id}`}
                className="text-sm underline-offset-4 hover:underline"
                aria-label={`Ver perfil do time ${awayLineups.team.name}`}
                itemProp="name"
              >
                {awayLineups.team.name}
              </Link>
            </div>
            <FixturesLineupsFormation data={awayLineups.formation} />
          </div>
        </CardContent>
      </Card>

      {/* Tabs de reservas e técnico */}
      <Tabs defaultValue={homeLineups.team.name}>
        <TabsList
          className="w-full"
          aria-label="Selecionar equipe para ver reservas e técnico"
        >
          <TabsTrigger value={homeLineups.team.name}>
            <div className="flex items-center gap-2">
              <Image
                src={homeLineups.team.logo}
                alt={`Logo ${homeLineups.team.name}`}
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>{homeLineups.team.name}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value={awayLineups.team.name}>
            <div className="flex items-center gap-2">
              <Image
                src={awayLineups.team.logo}
                alt={`Logo ${awayLineups.team.name}`}
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>{awayLineups.team.name}</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo do time da casa */}
        <TabsContent value={homeLineups.team.name}>
          <section
            aria-label={`Escalação e reservas do ${homeLineups.team.name}`}
            itemScope
            itemType="https://schema.org/SportsTeam"
          >
            <Card>
              <CardContent className="space-y-4 md:space-y-6">
                <FixturesLineupsCoach data={homeLineups.coach} />
                <FixturesLineupsSubstitutes data={homeLineups.substitutes} />
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* Conteúdo do time visitante */}
        <TabsContent value={awayLineups.team.name}>
          <section
            aria-label={`Escalação e reservas do ${awayLineups.team.name}`}
            itemScope
            itemType="https://schema.org/SportsTeam"
          >
            <Card>
              <CardContent className="space-y-4 md:space-y-6">
                <FixturesLineupsCoach data={awayLineups.coach} />
                <FixturesLineupsSubstitutes data={awayLineups.substitutes} />
              </CardContent>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </article>
  );
}
