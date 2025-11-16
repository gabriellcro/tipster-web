import { TypographyMuted, TypographySmall } from "@/components/ui/typography";

export function FixturesLineupsFormation({ data }: { data: string }) {
  return (
    <dl
      className="flex items-center gap-2"
      itemScope
      itemType="https://schema.org/SportsTeam"
      aria-label={`Formação tática: ${data}`}
    >
      <dt className="sr-only">Formação</dt>
      <dd className="flex items-center gap-2" itemProp="formation">
        <TypographyMuted>Formação</TypographyMuted>
        <TypographySmall>{data}</TypographySmall>
      </dd>
    </dl>
  );
}
