import Image from "next/image";
import { FixtureApiResponse } from "@/schemas/fixtures";
import { fixturesColumns } from "@/components/fixtures/fixtures-columns";
import { FixturesDataTable } from "@/components/fixtures/fixtures-data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FixturesByLeagues({
  allLeagues,
}: {
  allLeagues: FixtureApiResponse[];
}) {
  return (
    <section
      className="space-y-4 md:space-y-6"
      aria-label="Lista de partidas agrupadas por liga de futebol"
      itemScope
      itemType="https://schema.org/SportsOrganization"
    >
      <meta
        itemProp="description"
        content="Partidas de futebol organizadas por ligas, com informações de rodada, número de jogos e estatísticas detalhadas."
      />

      {Object.values(allLeagues).map((item) => {
        const { league } = item.response[0];

        return (
          <article
            key={league.id || league.name}
            aria-label={`Jogos da ${league.name}`}
            itemScope
            itemType="https://schema.org/SportsLeague"
            itemProp="subOrganization"
          >
            <Card>
              <CardHeader className="flex items-center gap-2">
                <div className="bg-muted dark:bg-white p-1.5 rounded-md">
                  <Image
                    src={league.logo}
                    alt={`Logo da ${league.name}`}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                    itemProp="image"
                  />
                </div>

                <div>
                  <CardTitle>
                    <h2
                      itemProp="name"
                      className="text-sm md:text-base font-semibold"
                    >
                      {league.name}
                    </h2>
                  </CardTitle>
                  <CardDescription>
                    <p
                      itemProp="description"
                      className="text-xs text-muted-foreground"
                    >
                      {league.round}
                    </p>
                  </CardDescription>
                </div>

                <div
                  className="ml-auto"
                  aria-label={`Total de ${item.response.length} jogos nesta liga`}
                >
                  <Badge
                    variant="secondary"
                    title={`Total de ${item.response.length} partidas`}
                    itemProp="numberOfEvents"
                  >
                    {item.response.length}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pb-2">
                <div
                  itemScope
                  itemType="https://schema.org/SportsEvent"
                  itemProp="event"
                >
                  <FixturesDataTable data={item.response} columns={fixturesColumns} />
                </div>
              </CardContent>
            </Card>
          </article>
        );
      })}
    </section>
  );
}
