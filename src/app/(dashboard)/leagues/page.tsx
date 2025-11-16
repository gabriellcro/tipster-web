"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { Search, CircleAlert } from "lucide-react";
import { LeaguesData } from "@/types/league";
import { FadeIn } from "@/components/fade-in";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TypographyH1,
  TypographyH4,
  TypographyLead,
  TypographyMuted,
} from "@/components/ui/typography";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

import data from "@/app/(dashboard)/leagues/data.json"

export default function LeaguePage() {
  const leaguesData: LeaguesData = data;

  const allLeagues = React.useMemo(
    () => Object.values(leaguesData).flatMap((country) => country.leagues),
    [leaguesData]
  );

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredLeagues, setFilteredLeagues] = React.useState(allLeagues);

  React.useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredLeagues(allLeagues);
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();
    const matches = allLeagues.filter(
      (league) =>
        league.name.toLowerCase().includes(lowerSearch) ||
        league.country.toLowerCase().includes(lowerSearch)
    );

    setFilteredLeagues(matches);
  }, [searchTerm, allLeagues]);

  const clearSearch = () => setSearchTerm("");

  return (
    <FadeIn
      className="space-y-4 md:space-y-6"
      aria-label="Lista de ligas de futebol"
    >
      <meta itemProp="name" content="Ligas de Futebol" />
      <meta
        itemProp="description"
        content="Explore todas as principais ligas e campeonatos de futebol disponíveis, filtrando por nome ou país."
      />
      <meta
        itemProp="numberOfItems"
        content={filteredLeagues.length.toString()}
      />

      <header>
        <TypographyH1 itemProp="headline">Ligas</TypographyH1>
        <TypographyLead>
          Explore as principais ligas e competições de futebol
        </TypographyLead>
      </header>

      <InputGroup role="search" aria-label="Buscar liga ou país">
        <InputGroupInput
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar liga ou país..."
          aria-label="Campo de busca de ligas"
        />
        <InputGroupAddon>
          <Search className="text-muted-foreground" aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end" aria-live="polite">
          {filteredLeagues.length} resultado
          {filteredLeagues.length !== 1 && "s"}
        </InputGroupAddon>
      </InputGroup>

      {filteredLeagues.length > 0 ? (
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          role="list"
        >
          {filteredLeagues.map((league, index) => (
            <Link
              href={`leagues/${league.id}`}
              key={league.id}
              className="hover:scale-105 transition-transform duration-200"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/SportsOrganization"
            >
              <meta itemProp="position" content={(index + 1).toString()} />
              <Card
                className="p-0 overflow-hidden flex-1 h-full"
                role="listitem"
                aria-label={`Liga ${league.name} (${league.country})`}
              >
                <CardHeader className="py-4 bg-muted dark:bg-muted-foreground">
                  <Image
                    src={league.logo}
                    alt={`Logo da ${league.name}`}
                    width={48}
                    height={48}
                    className="mx-auto w-12 h-12 object-contain"
                    itemProp="logo"
                  />
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center text-center pb-4">
                  <TypographyMuted itemProp="location">
                    {league.country}
                  </TypographyMuted>
                  <TypographyH4 itemProp="name">{league.name}</TypographyH4>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Empty aria-live="polite">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CircleAlert className="w-10 h-10 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>Nenhuma liga encontrada</EmptyTitle>
            <EmptyDescription>
              Não encontramos resultados para “{searchTerm}”.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" onClick={clearSearch}>
              Limpar pesquisa
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </FadeIn>
  );
}
