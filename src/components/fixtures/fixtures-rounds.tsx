"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RoundsApiResponseSchema } from "@/schemas/fixtures-rounds";
import { MatchResponse } from "@/schemas/fixtures";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fixturesRoundsColumns } from "@/components/fixtures/fixtures-rounds-columns";
import { FixturesRoundsDataTable } from "@/components/fixtures/fixtures-rounds-table";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

// mock-data
import roundsData from "@/mock-data/fixtures-rounds.json";

interface RoundOption {
  value: string;
  label: string;
}

export function FixturesRounds({ data }: { data: MatchResponse[] }) {
  const roundsParsed = RoundsApiResponseSchema.parse(roundsData);

  // Transforma strings em value/label
  const rounds: RoundOption[] = roundsParsed.response.map((round: string) => ({
    value: round,
    label: round,
  }));

  // Última rodada como padrão
  const lastRound = rounds[rounds.length - 1]?.value || "";

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(lastRound);

  return (
    <section
      aria-labelledby="rounds-title"
      itemScope
      itemType="https://schema.org/SportsEvent"
    >
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>
              <h2 id="rounds-title" itemProp="name">
                Rodadas
              </h2>
            </CardTitle>
            <CardDescription itemProp="description">
              <p>Selecione uma rodada para visualizar as partidas</p>
            </CardDescription>
          </div>

          <div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-label="Selecionar rodada"
                  className="w-[200px] justify-between"
                >
                  {value
                    ? rounds.find((round) => round.value === value)?.label
                    : "Selecione a rodada..."}
                  <ChevronsUpDown className="opacity-50" aria-hidden="true" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-[200px] p-0"
                align="start"
                aria-label="Lista de rodadas disponíveis"
              >
                <Command>
                  <CommandInput
                    placeholder="Buscar rodada..."
                    className="h-9"
                    aria-label="Buscar rodada"
                  />

                  <CommandList>
                    <CommandEmpty>Nenhuma rodada encontrada.</CommandEmpty>

                    <CommandGroup heading="Lista de Rodadas">
                      {rounds.map((round: RoundOption) => (
                        <CommandItem
                          key={round.value}
                          value={round.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                          role="option"
                          aria-selected={value === round.value}
                        >
                          {round.label}

                          <Check
                            className={cn(
                              "ml-auto",
                              value === round.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                            aria-hidden="true"
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>

        <CardContent role="region" aria-live="polite">
          {!data || data.length === 0 ? (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Trophy aria-hidden="true" />
                </EmptyMedia>
                <EmptyTitle>Nenhuma Partida Disponível</EmptyTitle>
                <EmptyDescription>
                  Não há partidas disponíveis para esta rodada no momento.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <FixturesRoundsDataTable
              data={data}
              columns={fixturesRoundsColumns}
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
}
