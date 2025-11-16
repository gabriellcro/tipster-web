// utils/get-rank-status.ts

type RankStatus = {
  color: string;
  label: string;
};

export function getRankStatusByLeague(leagueName: string, rank: number): RankStatus {
  const name = leagueName.toLowerCase();

  // 🇬🇧 Premier League
  if (name.includes("premier")) {
    if (rank <= 4) return { color: "bg-blue-500", label: "Champions League" };
    if (rank === 5) return { color: "bg-green-500", label: "Europa League" };
    if (rank === 6) return { color: "bg-yellow-500", label: "Conference League" };
    if (rank >= 18) return { color: "bg-red-500", label: "Rebaixamento" };
    return { color: "bg-muted-foreground/30", label: "Zona neutra" };
  }

  // 🇪🇸 La Liga
  if (name.includes("la liga")) {
    if (rank <= 4) return { color: "bg-blue-500", label: "Champions League" };
    if (rank === 5) return { color: "bg-green-500", label: "Europa League" };
    if (rank === 6) return { color: "bg-yellow-500", label: "Conference League" };
    if (rank >= 18) return { color: "bg-red-500", label: "Rebaixamento" };
    return { color: "bg-muted-foreground/30", label: "Zona neutra" };
  }

  // 🇮🇹 Serie A
  if (name.includes("serie a") && !name.includes("brasileirão")) {
    if (rank <= 4) return { color: "bg-blue-500", label: "Champions League" };
    if (rank === 5) return { color: "bg-green-500", label: "Europa League" };
    if (rank === 6) return { color: "bg-yellow-500", label: "Conference League" };
    if (rank >= 18) return { color: "bg-red-500", label: "Rebaixamento" };
    return { color: "bg-muted-foreground/30", label: "Zona neutra" };
  }

  // 🇩🇪 Bundesliga
  if (name.includes("bundesliga")) {
    if (rank <= 4) return { color: "bg-blue-500", label: "Champions League" };
    if (rank === 5) return { color: "bg-green-500", label: "Europa League" };
    if (rank === 6) return { color: "bg-yellow-500", label: "Conference League" };
    if (rank === 16) return { color: "bg-orange-500", label: "Playoff de Rebaixamento" };
    if (rank >= 17) return { color: "bg-red-500", label: "Rebaixamento" };
    return { color: "bg-muted-foreground/30", label: "Zona neutra" };
  }

  // 🇫🇷 Ligue 1
  if (name.includes("ligue 1")) {
    if (rank <= 3) return { color: "bg-blue-500", label: "Champions League" };
    if (rank === 4) return { color: "bg-green-500", label: "Europa League" };
    if (rank === 5) return { color: "bg-yellow-500", label: "Conference League" };
    if (rank >= 16) return { color: "bg-red-500", label: "Rebaixamento" };
    return { color: "bg-muted-foreground/30", label: "Zona neutra" };
  }

  // 🇧🇷 Brasileirão Série A
  if (name.includes("brasileirão") || name.includes("brasil")) {
    if (rank <= 4) return { color: "bg-blue-500", label: "Libertadores" };
    if (rank <= 6) return { color: "bg-green-500", label: "Pré-Libertadores" };
    if (rank <= 12) return { color: "bg-yellow-500", label: "Sul-Americana" };
    if (rank >= 17) return { color: "bg-red-500", label: "Rebaixamento" };
    return { color: "bg-muted-foreground/30", label: "Zona neutra" };
  }

  // 🇦🇷 Liga Argentina
  if (name.includes("argentina")) {
    if (rank <= 3) return { color: "bg-blue-500", label: "Libertadores" };
    if (rank <= 6) return { color: "bg-green-500", label: "Sul-Americana" };
    return { color: "bg-muted-foreground/30", label: "Zona neutra / Média de pontos" };
  }

  // 🌍 Padrão genérico
  return {
    color: "bg-muted-foreground/30",
    label: "Posição neutra",
  };
}
