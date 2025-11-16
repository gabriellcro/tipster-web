import { cn } from "@/lib/utils";
import { calculateProgressPercentage, isHomeWinning } from "@/utils/statistics";
import {
  StatisticsApiResponseSchema,
  TeamStatistics,
} from "@/schemas/fixtures-statistics";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TypographySmall } from "@/components/ui/typography";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

const statsLabel: Record<string, string> = {
  "Shots on Goal": "Finalizações no Gol",
  "Shots off Goal": "Finalizações Fora do Gol",
  "Total Shots": "Total de Finalizações",
  "Blocked Shots": "Finalizações Bloqueadas",
  "Shots insidebox": "Finalizações na Área",
  "Shots outsidebox": "Finalizações Fora da Área",
  Fouls: "Faltas",
  "Corner Kicks": "Escanteios",
  Offsides: "Impedimentos",
  "Ball Possession": "Posse de Bola",
  "Yellow Cards": "Cartões Amarelos",
  "Red Cards": "Cartões Vermelhos",
  "Goalkeeper Saves": "Defesas do Goleiro",
  "Total passes": "Total de Passes",
  "Passes accurate": "Passes Precisos",
  "Passes %": "% de Passes Precisos",
  expected_goals: "Gols Esperados (xG)",
  goals_prevented: "Gols Evitados",
};

// mock data
import fixturesStatisticsData from "@/mock-data/fixtures-statistics.json";

export function FixturesStatistics() {
  const parsedStats = StatisticsApiResponseSchema.parse(fixturesStatisticsData);

  const homeStats = parsedStats.response[0] as TeamStatistics;
  const awayStats = parsedStats.response[1] as TeamStatistics;

  if (!parsedStats.response || parsedStats.response.length === 0) {
    return (
      <Card>
        <CardContent>
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle>Estatísticas Indisponíveis</EmptyTitle>
              <EmptyDescription>
                Não há estatísticas disponíveis para esta partida.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    );
  }

  return (
    <section
      aria-label="Estatísticas completas da partida de futebol"
      itemScope
      itemType="https://schema.org/SportsEvent"
    >
      <meta
        itemProp="description"
        content="Resumo detalhado das estatísticas da partida, incluindo finalizações, posse de bola, cartões, defesas e gols esperados."
      />

      <Card
        itemProp="statistics"
        itemScope
        itemType="https://schema.org/SportsStatistics"
      >
        <CardContent className="flex flex-col gap-4">
          {homeStats.statistics.map((item, index) => {
            const homeValue = item.value || 0;
            const awayValue = awayStats.statistics[index].value || 0;
            const label = statsLabel[item.type] || item.type;

            return (
              <div
                key={index}
                className="flex flex-col gap-2"
                itemProp="property"
                itemScope
                itemType="https://schema.org/PropertyValue"
              >
                <meta itemProp="name" content={label} />

                <div className="flex justify-between items-center">
                  <div
                    itemProp="valueReference"
                    itemScope
                    itemType="https://schema.org/SportsTeam"
                    aria-label={`Desempenho do time da casa em ${label}`}
                  >
                    <TypographySmall
                      className="w-8"
                      itemProp="value"
                      aria-label={`Time da casa: ${homeValue} ${label}`}
                    >
                      {homeValue}
                    </TypographySmall>
                  </div>
                  <TypographySmall className="text-center" aria-hidden="true">
                    {label}
                  </TypographySmall>
                  <div
                    itemProp="valueReference"
                    itemScope
                    itemType="https://schema.org/SportsTeam"
                    aria-label={`Desempenho do time visitante em ${label}`}
                  >
                    <TypographySmall
                      className="w-8 text-end"
                      itemProp="value"
                      aria-label={`Time visitante: ${awayValue} ${label}`}
                    >
                      {awayValue}
                    </TypographySmall>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {/* Time da casa */}
                  <div>
                    <meta itemProp="name" content="Time da casa" />

                    <Progress
                      value={calculateProgressPercentage({
                        homeScore: homeValue,
                        awayScore: awayValue,
                        side: "home",
                      })}
                      direction="right"
                      className={cn(
                        !isHomeWinning({
                          homeScore: homeValue,
                          awayScore: awayValue,
                        }) && "opacity-60"
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Time visitante */}
                  <div>
                    <meta itemProp="name" content="Time visitante" />
                    <Progress
                      value={calculateProgressPercentage({
                        homeScore: homeValue,
                        awayScore: awayValue,
                        side: "away",
                      })}
                      className={cn(
                        isHomeWinning({
                          homeScore: homeValue,
                          awayScore: awayValue,
                        }) && "opacity-60"
                      )}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
}
