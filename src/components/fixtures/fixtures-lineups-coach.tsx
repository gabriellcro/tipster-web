import Link from "next/link";
import { UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Coach } from "@/schemas/fixtures-lineups";

export function FixturesLineupsCoach({ data }: { data: Coach }) {
  return (
    <figure
      className="flex items-center gap-2"
      itemScope
      itemType="https://schema.org/Person"
      aria-label={`Informações do técnico ${data.name}`}
    >
      <Avatar className="w-8 h-8" itemProp="image">
        <AvatarImage
          src={data.photo}
          alt={`Foto do técnico ${data.name}`}
          loading="lazy"
        />
        <AvatarFallback aria-hidden="true">
          <UserCircle2 className="w-8 h-8" />
        </AvatarFallback>
      </Avatar>

      <figcaption className="flex flex-col text-xs leading-tight">
        <Link
          href={`/coach/${data.id}`}
          itemProp="url"
          className="underline-offset-4 hover:underline font-medium"
          aria-label={`Ver perfil completo do técnico ${data.name}`}
        >
          <span itemProp="name">{data.name}</span>
        </Link>
        <span className="text-muted-foreground" itemProp="jobTitle">
          Técnico
        </span>
      </figcaption>
    </figure>
  );
}
