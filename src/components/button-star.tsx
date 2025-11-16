import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonStar() {
  return (
    <Button
      size="icon-sm"
      variant="ghost"
      aria-label="Favoritar"
      className="rounded-full text-muted-foreground hover:text-yellow-500 dark:hover:text-yellow-400"
    >
      <Star className="w-4 h-4" />
    </Button>
  );
}
