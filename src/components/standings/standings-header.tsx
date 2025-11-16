import Image from "next/image";
import { StandingsResponse } from "@/schemas/standings";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StandingsHeader({ data }: { data: StandingsResponse }) {
  const { league } = data;

  return (
    <Card
      aria-label={`Informações da ${league.name}`}
      itemScope
      itemType="https://schema.org/SportsOrganization"
    >
      <CardHeader>
        <div className="flex items-center gap-2 md:gap-3">
          {/* Logo da liga */}
          <div className="bg-muted dark:bg-muted-foreground p-2 rounded-lg">
            <Image
              src={league.logo}
              alt={`Escudo e logotipo da ${league.name}`}
              height={48}
              width={48}
              className="w-6 h-6 md:w-8 md:h-8"
              itemProp="logo"
            />
          </div>

          <div>
            <CardTitle itemProp="name">
              <h1 className="md:text-xl">{league.name}</h1>
            </CardTitle>
            <CardDescription itemProp="location">
              <p>{league.country}</p>
            </CardDescription>
          </div>
        </div>

        <CardAction>
          <Select defaultValue="season-2023">
            <SelectTrigger
              size="sm"
              aria-label="Selecionar temporada"
              itemProp="season"
            >
              <SelectValue placeholder="Selecione uma temporada" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectLabel>Temporadas</SelectLabel>
                <SelectItem value="season-2021">2021</SelectItem>
                <SelectItem value="season-2022">2022</SelectItem>
                <SelectItem value="season-2023">2023</SelectItem>
                <SelectItem value="season-2024">2024</SelectItem>
                <SelectItem value="season-2025">2025</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
