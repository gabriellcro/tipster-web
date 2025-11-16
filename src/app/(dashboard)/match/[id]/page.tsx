import Link from "next/link";

import { FadeIn } from "@/components/fade-in";

import { PredictionsOverview } from "@/components/predictions/predictions-overview";
import { FixturesOverview } from "@/components/fixtures/fixtures-overview";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import predictionsJson from "@/mock-data/predictions.json";
import fixturesData from "@/mock-data/fixtures-premier-league.json";

import { FixturesApiResponseSchema, MatchResponse } from "@/schemas/fixtures";
import {
  PredictionsApiResponseSchema,
  PredictionsResponse,
} from "@/schemas/predictions";

export default function MatchDetails() {
  const parsedFixtures = FixturesApiResponseSchema.parse(fixturesData);
  const parsedPredictions = PredictionsApiResponseSchema.parse(predictionsJson);
  const match: MatchResponse = parsedFixtures.response[0];
  const predictions: PredictionsResponse = parsedPredictions.response[0];

  const { league } = match;

  return (
    <FadeIn className="space-y-4 md:space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={"/"}>Partidas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`league/${league.id}`}>{league.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{league.round}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="grid grid-cols-1 md:grid-cols-2 items-start gap-4 md:gap-6">
        <FixturesOverview data={match} />
        <PredictionsOverview data={predictions} />
      </section>
    </FadeIn>
  );
}
