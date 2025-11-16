"use client";

import Link from "next/link";
import { Clock, Newspaper, Star, Trophy } from "lucide-react";
import { NavMenu } from "@/components/nav-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { TypographyLarge } from "@/components/ui/typography";

const items = [
  { url: "/", title: "Partidas", icon: Clock },
  { url: "/leagues", title: "Ligas", icon: Trophy },
  { url: "/favoritos", title: "Favoritos", icon: Star },
  { url: "/feed", title: "Feed", icon: Newspaper },
];

export function Navbar() {
  return (
    <header className="border-b px-4 md:px-6 fixed top-0 inset-x-0 z-10 bg-background">
      <div className="flex h-16 justify-between gap-4">
        <div className="flex items-center gap-6">
          <TypographyLarge>
            <h1>Tipster</h1>
          </TypographyLarge>

          <NavMenu items={items} />
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />

          <div className="h-6">
            <Separator orientation="vertical" />
          </div>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/login" aria-label="Entrar na sua conta">
              Entrar
            </Link>
          </Button>

          <Button size="sm" asChild>
            <Link href="/signup" aria-label="Criar nova conta">
              Criar conta
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
