export function formatPlayerRating(
  rating: number | string | null | undefined
): string {
  if (rating === null || rating === undefined) return "-";

  const value =
    typeof rating === "string" ? parseFloat(rating.replace(",", ".")) : rating;

  if (isNaN(value) || value <= 0) return "-";

  return value.toFixed(2);
}

export function getPlayerRatingColor(
  rating: number | string | null | undefined
): string {
  if (rating === null || rating === undefined) return "bg-gray-500";

  const value =
    typeof rating === "string" ? parseFloat(rating.replace(",", ".")) : rating;

  if (isNaN(value) || value <= 0) return "bg-gray-500";

  // Escala de cores baseada na nota (0-10) - Estilo FIFA
  const colorScale = [
    { threshold: 8.5, color: "bg-emerald-500" }, // Excepcional
    { threshold: 8.0, color: "bg-green-500" }, // Excelente
    { threshold: 7.5, color: "bg-lime-500" }, // Muito Bom
    { threshold: 7.0, color: "bg-yellow-500" }, // Bom
    { threshold: 6.5, color: "bg-amber-500" }, // Regular
    { threshold: 5.0, color: "bg-orange-500" }, // Abaixo da média
    { threshold: 0, color: "bg-red-500" }, // Ruim
  ];

  return (
    colorScale.find((scale) => value >= scale.threshold)?.color ??
    "bg-gray-500"
  );
}


const positionMap: Record<string, string> = {
  // Atacantes
  Attacker: "Atacante",
  Forward: "Atacante",
  Striker: "Centroavante",
  "Centre-Forward": "Centroavante",
  "Left Winger": "Ponta Esquerda",
  "Right Winger": "Ponta Direita",

  // Meio-campistas
  Midfielder: "Meio-campista",
  "Central Midfield": "Meio-campista Central",
  "Defensive Midfield": "Volante",
  "Attacking Midfield": "Meia Atacante",
  "Left Midfield": "Meio-campista Esquerdo",
  "Right Midfield": "Meio-campista Direito",

  // Defensores
  Defender: "Defensor",
  "Centre-Back": "Zagueiro",
  "Left-Back": "Lateral Esquerdo",
  "Right-Back": "Lateral Direito",
  Sweeper: "Líbero",

  // Goleiro
  Goalkeeper: "Goleiro",
  Keeper: "Goleiro",
};


export function translatePosition(
  position: string | null | undefined
): string {
  if (!position) return "N/A";

  return positionMap[position] || position;
}

export function getPositionAbbreviation(
  position: string | null | undefined
): string {
  if (!position) return "N/A";

  const abbreviationMap: Record<string, string> = {
    // Atacantes
    Attacker: "ATA",
    Forward: "ATA",
    Striker: "CA",
    "Centre-Forward": "CA",
    "Left Winger": "PE",
    "Right Winger": "PD",

    // Meio-campistas
    Midfielder: "MC",
    "Central Midfield": "MC",
    "Defensive Midfield": "VOL",
    "Attacking Midfield": "MEI",
    "Left Midfield": "ME",
    "Right Midfield": "MD",

    // Defensores
    Defender: "DEF",
    "Centre-Back": "ZAG",
    "Left-Back": "LE",
    "Right-Back": "LD",
    Sweeper: "LIB",

    // Goleiro
    Goalkeeper: "GOL",
    Keeper: "GOL",
  };

  return abbreviationMap[position] || position.substring(0, 3).toUpperCase();
}

export function getPositionColor(
  position: string | null | undefined
): string {
  if (!position) return "bg-gray-500";

  const positionLower = position.toLowerCase();

  // Atacantes - Vermelho
  if (
    positionLower.includes("attacker") ||
    positionLower.includes("forward") ||
    positionLower.includes("striker") ||
    positionLower.includes("winger")
  ) {
    return "bg-red-500";
  }

  // Meio-campistas - Verde
  if (positionLower.includes("midfield")) {
    return "bg-green-500";
  }

  // Defensores - Azul
  if (
    positionLower.includes("defender") ||
    positionLower.includes("back") ||
    positionLower.includes("sweeper")
  ) {
    return "bg-blue-500";
  }

  // Goleiro - Amarelo
  if (positionLower.includes("goalkeeper") || positionLower.includes("keeper")) {
    return "bg-yellow-500";
  }

  return "bg-gray-500";
}

export function calculateGoalsPerMatch(goals: number, matches: number): string {
  if (matches === 0) return "0.00";
  return (goals / matches).toFixed(2);
}

export function calculateAssistsPerMatch(
  assists: number,
  matches: number
): string {
  if (matches === 0) return "0.00";
  return (assists / matches).toFixed(2);
}

export function calculateAssistEfficiency(
  assists: number,
  keyPasses: number
): string {
  if (keyPasses === 0) return "0%";
  return `${((assists / keyPasses) * 100).toFixed(1)}%`;
}

export function calculateConversionRate(goals: number, shots: number): string {
  if (shots === 0) return "0%";
  return `${((goals / shots) * 100).toFixed(1)}%`;
}

export function calculatePassAccuracy(
  successfulPasses: number,
  totalPasses: number
): string {
  if (totalPasses === 0) return "0%";
  return `${((successfulPasses / totalPasses) * 100).toFixed(1)}%`;
}