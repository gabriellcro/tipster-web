import {
  PlayerPosition,
  PlayerPositionEnumType,
  TeamColors,
} from "@/schemas/fixtures-lineups";

export function filterByPosition({
  startXI,
  pos,
}: {
  startXI: PlayerPosition[];
  pos: PlayerPositionEnumType;
}) {
  return startXI.filter((item) => item.player.pos === pos);
}

export function getBackgroundColorPlayer({
  position,
  colors,
}: {
  position: PlayerPositionEnumType;
  colors: TeamColors;
}) {
  return position === "G"
    ? `#${colors.goalkeeper.primary}`
    : `#${colors.player.primary}`;
}

export function getColorPlayer({
  position,
  colors,
}: {
  position: PlayerPositionEnumType;
  colors: TeamColors;
}) {
  if (position === "G") {
    return {
      backgroundColor: `#${colors.goalkeeper.primary}`,
      color: `#${colors.goalkeeper.number}`,
      borderColor: `#${colors.goalkeeper.border}`,
    };
  }

  return {
    backgroundColor: `#${colors.player.primary}`,
    color: `#${colors.player.number}`,
    borderColor: `#${colors.player.border}`,
  };
}
