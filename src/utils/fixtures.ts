import {
  MatchStatusLong,
  MatchStatusShort,
  Status,
} from "@/schemas/fixtures";

export const LIVE_STATUSES: MatchStatusShort[] = [
  "1H",
  "2H",
  "ET",
  "BT",
  "P",
  "SUSP",
  "INT",
  "LIVE",
];

export const FINISHED_STATUSES: MatchStatusShort[] = [
  "FT",
  "AET",
  "PEN",
  "PST",
  "CANC",
  "ABD",
  "AWD",
  "WO",
];

export const NOTSTARTED_STATUSES: MatchStatusShort[] = ["TBD", "NS"];

export const STATUS_COLORS: Record<MatchStatusShort, string> = {
  // Pré-jogo (Primary)
  TBD: "text-primary",
  NS: "text-primary",

  // Ao vivo (Red)
  "1H": "text-green-500",
  "2H": "text-green-500",
  HT: "text-green-500",
  ET: "text-green-500",
  P: "text-green-500",
  LIVE: "text-green-500",

  SUSP: "text-red-500",
  INT: "text-red-500",
  BT: "text-red-500",

  // Finalizadas (Muted)
  FT: "text-muted-foreground",
  AET: "text-muted-foreground",
  PEN: "text-muted-foreground",
  PST: "text-muted-foreground",
  CANC: "text-muted-foreground",
  ABD: "text-muted-foreground",
  AWD: "text-muted-foreground",
  WO: "text-muted-foreground",
};

export const STATUS_LABELS_SHORT: Record<MatchStatusShort, string> = {
  // Pré-jogo
  TBD: "A definir",
  NS: "Agendado",

  // Ao vivo
  "1H": "1º Tempo",
  HT: "Intervalo",
  "2H": "2º Tempo",
  ET: "Prorrogação",
  P: "Pênaltis",
  LIVE: "Ao vivo",

  BT: "Pausa",
  SUSP: "Suspenso",
  INT: "Interrompido",

  // Finalizadas
  FT: "Encerrado",
  AET: "Enc. Prorrog.",
  PEN: "Enc. Pênaltis",
  PST: "Adiado",
  CANC: "Cancelado",
  ABD: "Abandonado",
  AWD: "W.O.",
  WO: "W.O.",
};

export const STATUS_LABELS_LONG: Record<MatchStatusLong, string> = {
  // Pré-jogo
  "Time To Be Defined": "Horário a definir",
  "Not Started": "Partida não iniciada",

  // Ao vivo
  "First Half, Kick Off": "Primeiro tempo em andamento",
  Halftime: "Intervalo do jogo",
  "Second Half, 2nd Half Started": "Segundo tempo em andamento",
  "Extra Time": "Tempo de prorrogação",
  "Break Time": "Intervalo da prorrogação",
  "Penalty In Progress": "Disputa de pênaltis em andamento",
  "Match Suspended": "Partida suspensa temporariamente",
  "Match Interrupted": "Partida interrompida temporariamente",
  "In Progress": "Partida em andamento",

  // Finalizadas
  "Match Finished": "Partida encerrada",
  "Match Finished After Extra Time": "Encerrada após prorrogação",
  "Match Finished After Penalty": "Encerrada após pênaltis",
  "Match Postponed": "Partida adiada",
  "Match Cancelled": "Partida cancelada",
  "Match Abandoned": "Partida abandonada",
  "Technical Loss": "Derrota técnica aplicada",
  WalkOver: "Vitória por W.O.",
};
export function getColorLabel(status: Status) {
  return STATUS_COLORS[status.short];
}

export function getStatusLabel({
  status,
  variant,
}: {
  status: Status;
  variant: "short" | "long";
}) {
  const { elapsed, long, short } = status;

  if (isMatchLive(status)) return elapsed;

  return variant === "long" ? STATUS_LABELS_LONG[long] : short;
}

export function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateShort(dateString: string) {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function isMatchLive(status: Status) {
  return LIVE_STATUSES.includes(status.short);
}

export function isMatchFinished(status: Status) {
  return FINISHED_STATUSES.includes(status.short);
}

export function isMatchNotStarted(status: Status) {
  return NOTSTARTED_STATUSES.includes(status.short);
}
