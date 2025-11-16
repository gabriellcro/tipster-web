import type { Cards } from "@/schemas/predictions";

type CardPeriod = "0-15" | "16-30" | "31-45" | "46-60" | "61-75" | "76-90" | "91-105";

// Funções auxiliares para Poisson (versão otimizada com logaritmos)
function logFactorial(n: number): number {
  if (n <= 1) return 0;
  let result = 0;
  for (let i = 2; i <= n; i++) {
    result += Math.log(i);
  }
  return result;
}

function poissonProbability(lambda: number, k: number): number {
  // Usa logaritmos para evitar overflow
  // P(k) = (λ^k * e^(-λ)) / k!
  // log(P(k)) = k*log(λ) - λ - log(k!)
  if (lambda <= 0) return 0;
  const logProb = k * Math.log(lambda) - lambda - logFactorial(k);
  return Math.exp(logProb);
}

function probUnderGoals(expectedGoals: number, threshold: number): number {
  let prob = 0;
  // Limita até 20 para performance (raramente ultrapassa)
  const maxGoals = Math.min(Math.floor(threshold), 20);
  for (let k = 0; k <= maxGoals; k++) {
    prob += poissonProbability(expectedGoals, k);
  }
  return prob;
}

function probOverGoals(expectedGoals: number, threshold: number): number {
  // Over X.5 = 1 - P(0 até X)
  return 1 - probUnderGoals(expectedGoals, Math.floor(threshold));
}

export function calcMatchOverProbability({
  homeScoresAvg,
  homeConcedesAvg,
  awayScoresAvg,
  awayConcedesAvg,
  threshold,
}: {
  homeScoresAvg: number;
  homeConcedesAvg: number;
  awayScoresAvg: number;
  awayConcedesAvg: number;
  threshold: number;
}) {
  // Expectativa de gols do mandante (ataque dele vs defesa visitante)
  const homeExpected = (homeScoresAvg + awayConcedesAvg) / 2;

  // Expectativa de gols do visitante (ataque dele vs defesa mandante)
  const awayExpected = (awayScoresAvg + homeConcedesAvg) / 2;

  // Total de gols esperados no jogo
  const totalExpected = homeExpected + awayExpected;

  // Calcula probabilidade usando Poisson
  const overProb = probOverGoals(totalExpected, threshold);

  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(overProb);
}

export function calcMatchUnderProbability({
  homeScoresAvg,
  homeConcedesAvg,
  awayScoresAvg,
  awayConcedesAvg,
  threshold,
}: {
  homeScoresAvg: number;
  homeConcedesAvg: number;
  awayScoresAvg: number;
  awayConcedesAvg: number;
  threshold: number;
}) {
  // Expectativas
  const homeExpected = (homeScoresAvg + awayConcedesAvg) / 2;
  const awayExpected = (awayScoresAvg + homeConcedesAvg) / 2;
  const totalExpected = homeExpected + awayExpected;

  // Under = probabilidade de ter ATÉ X gols
  const underProb = probUnderGoals(totalExpected, Math.floor(threshold));

  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(underProb);
}

/**
 * Calcula total de cartões amarelos por time
 */
export function getTotalYellowCards(cards: Cards): number {
  const periods: CardPeriod[] = [
    "0-15",
    "16-30",
    "31-45",
    "46-60",
    "61-75",
    "76-90",
    "91-105",
  ];
  
  return periods.reduce((sum, period) => {
    return sum + (cards.yellow[period]?.total || 0);
  }, 0);
}

/**
 * Calcula total de cartões vermelhos por time
 */
export function getTotalRedCards(cards: Cards): number {
  const periods: CardPeriod[] = [
    "0-15",
    "16-30",
    "31-45",
    "46-60",
    "61-75",
    "76-90",
    "91-105",
  ];
  
  return periods.reduce((sum, period) => {
    return sum + (cards.red[period]?.total || 0);
  }, 0);
}

/**
 * Calcula média de cartões por jogo
 */
export function getCardsAverage(
  totalCards: number,
  totalGames: number
): number {
  if (totalGames === 0) return 0;
  return totalCards / totalGames;
}

/**
 * Calcula probabilidade de X+ cartões no jogo usando Poisson
 */
export function calcMatchCardsOverProbability({
  homeYellowAvg,
  homeRedAvg,
  awayYellowAvg,
  awayRedAvg,
  threshold,
}: {
  homeYellowAvg: number;
  homeRedAvg: number;
  awayYellowAvg: number;
  awayRedAvg: number;
  threshold: number;
}) {
  // Total de cartões esperados por time
  const homeExpected = homeYellowAvg + homeRedAvg;
  const awayExpected = awayYellowAvg + awayRedAvg;
  
  // Total de cartões esperados no jogo
  const totalExpected = homeExpected + awayExpected;

  // Probabilidade usando Poisson
  const overProb = probOverGoals(totalExpected, threshold);

  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(overProb);
}

/**
 * Calcula probabilidade de X- cartões no jogo
 */
export function calcMatchCardsUnderProbability({
  homeYellowAvg,
  homeRedAvg,
  awayYellowAvg,
  awayRedAvg,
  threshold,
}: {
  homeYellowAvg: number;
  homeRedAvg: number;
  awayYellowAvg: number;
  awayRedAvg: number;
  threshold: number;
}) {
  // Total de cartões esperados
  const homeExpected = homeYellowAvg + homeRedAvg;
  const awayExpected = awayYellowAvg + awayRedAvg;
  const totalExpected = homeExpected + awayExpected;

  // Under = probabilidade de ter ATÉ X cartões
  const underProb = probUnderGoals(totalExpected, Math.floor(threshold));

  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(underProb);
}


export function getProbabilityColor(percentage: string): string {
  const value = parseFloat(percentage.replace("%", "").replace(",", "."));

  if (value >= 90) return "bg-blue-500";
  if (value >= 70) return "bg-green-500";
  if (value >= 50) return "bg-yellow-500";
  if (value >= 30) return "bg-orange-500";
  return "bg-red-500";
}

/**
 * Calcula a porcentagem de gols em relação ao total do período
 */
export function calculateGoalTimelinePercentage({
  homeGoals,
  awayGoals,
  side,
}: {
  homeGoals: number;
  awayGoals: number;
  side: "home" | "away";
}): number {
  const totalGoals = homeGoals + awayGoals;
  
  if (totalGoals === 0) return 0;
  
  const selectedGoals = side === "home" ? homeGoals : awayGoals;
  const percentage = (100 / totalGoals) * selectedGoals;
  
  return percentage;
}

/**
 * Verifica se o time da casa tem mais gols no período
 */
export function isHomeLeadingInPeriod({
  homeGoals,
  awayGoals,
}: {
  homeGoals: number;
  awayGoals: number;
}): boolean {
  return homeGoals > awayGoals;
}

/**
 * Mapeia os períodos de tempo para labels amigáveis
 */
export const timelinePeriodLabels: Record<string, string> = {
  "0-15": "0' - 15'",
  "16-30": "16' - 30'",
  "31-45": "31' - 45'",
  "46-60": "46' - 60'",
  "61-75": "61' - 75'",
  "76-90": "76' - 90'",
  "91-105": "91' - 105'",
};