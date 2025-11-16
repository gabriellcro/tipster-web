import Link from "next/link";
import { PlayerPosition } from "@/schemas/fixtures-lineups";
import { UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypographySmall } from "@/components/ui/typography";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export function FixturesLineupsSubstitutes({ data }: { data: PlayerPosition[] }) {
  if (!data || data.length === 0) {
    return (
      <section aria-label="Banco de reservas">
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>Sem jogadores reservas</EmptyTitle>
            <EmptyDescription>
              Nenhuma informação disponível sobre os suplentes desta equipe.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </section>
    );
  }

  return (
    <section aria-label="Banco de reservas" className="space-y-4">
      <h2 className="text-sm font-medium text-muted-foreground">
        Banco de reservas
      </h2>

      <ul className="space-y-2">
        {data.map(({ player }) => (
          <li key={player.id} className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={`https://media.api-sports.io/football/players/${player.id}.png`}
                alt={`Foto do jogador ${player.name}`}
              />
              <AvatarFallback>
                <UserCircle2 className="w-8 h-8" aria-hidden="true" />
              </AvatarFallback>
            </Avatar>

            {player.number && (
              <TypographySmall
                className="w-6 text-center text-muted-foreground"
                aria-label={`Camisa número ${player.number}`}
              >
                {player.number}
              </TypographySmall>
            )}

            <TypographySmall>
              <Link
                href={`/player/${player.id}`}
                className="underline-offset-4 hover:underline"
              >
                {player.name}
              </Link>
            </TypographySmall>
          </li>
        ))}
      </ul>
    </section>
  );
}
