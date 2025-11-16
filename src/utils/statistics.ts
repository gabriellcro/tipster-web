export function calculateProgressPercentage({
  homeScore,
  awayScore,
  side,
}: {
  homeScore: number | string;
  awayScore: number | string;
  side: "home" | "away";
}) {
  const totalScore = Number(homeScore) + Number(awayScore);

  if (typeof homeScore === "string" && typeof awayScore === "string") {
    const newHomeScore = homeScore.replace(/\D/, "");
    const newAwayScore = awayScore.replace(/\D/, "");

    return side === "home" ? Number(newHomeScore) : Number(newAwayScore);
  }

  const selectedScore = side === "home" ? Number(homeScore) : Number(awayScore);
  const percentage = (100 / totalScore) * selectedScore;

  return percentage;
}

export function isHomeWinning({
  homeScore,
  awayScore,
}: {
  homeScore: number | string;
  awayScore: number | string;
}) {

  if (typeof homeScore === "string" && typeof awayScore === "string") {
    const newHomeScore = homeScore.replace(/\D/, "");
    const newAwayScore = awayScore.replace(/\D/, "");

    return Number(newHomeScore) > Number(newAwayScore);
  }


  return Number(homeScore) > Number(awayScore);
}
