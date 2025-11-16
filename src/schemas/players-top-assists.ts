import { z } from "zod";

// Schema para informações de nascimento
const BirthSchema = z.object({
  date: z.string(),
  place: z.string(),
  country: z.string(),
});

// Schema para informações do jogador
const PlayerSchema = z.object({
  id: z.number(),
  name: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  age: z.number(),
  birth: BirthSchema,
  nationality: z.string(),
  height: z.string(),
  weight: z.string(),
  injured: z.boolean(),
  photo: z.string().url(),
});

// Schema para informações do time
const TeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string().url(),
});

// Schema para informações da liga
const LeagueSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  logo: z.string().url(),
  flag: z.string().url(),
  season: z.number(),
});

// Schema para estatísticas de jogos
const GamesSchema = z.object({
  appearences: z.number(),
  lineups: z.number(),
  minutes: z.number(),
  number: z.number().nullable(),
  position: z.string(),
  rating: z.string(),
  captain: z.boolean(),
});

// Schema para substituições
const SubstitutesSchema = z.object({
  in: z.number(),
  out: z.number().nullable(),
  bench: z.number().nullable(),
});

// Schema para chutes
const ShotsSchema = z.object({
  total: z.number(),
  on: z.number(),
});

// Schema para gols
const GoalsSchema = z.object({
  total: z.number(),
  conceded: z.number(),
  assists: z.number(),
  saves: z.number().nullable(),
});

// Schema para passes
const PassesSchema = z.object({
  total: z.number(),
  key: z.number(),
  accuracy: z.number().nullable(),
});

// Schema para desarmes
const TacklesSchema = z.object({
  total: z.number(),
  blocks: z.number().nullable(),
  interceptions: z.number(),
});

// Schema para duelos
const DuelsSchema = z.object({
  total: z.number(),
  won: z.number(),
});

// Schema para dribles
const DribblesSchema = z.object({
  attempts: z.number(),
  success: z.number(),
  past: z.number().nullable(),
});

// Schema para faltas
const FoulsSchema = z.object({
  drawn: z.number(),
  committed: z.number(),
});

// Schema para cartões
const CardsSchema = z.object({
  yellow: z.number(),
  yellowred: z.number().nullable(),
  red: z.number(),
});

// Schema para pênaltis
const PenaltySchema = z.object({
  won: z.number().nullable(),
  commited: z.number().nullable(),
  scored: z.number(),
  missed: z.number(),
  saved: z.number().nullable(),
});

// Schema para estatísticas completas
const StatisticsSchema = z.object({
  team: TeamSchema,
  league: LeagueSchema,
  games: GamesSchema,
  substitutes: SubstitutesSchema,
  shots: ShotsSchema,
  goals: GoalsSchema,
  passes: PassesSchema,
  tackles: TacklesSchema,
  duels: DuelsSchema,
  dribbles: DribblesSchema,
  fouls: FoulsSchema,
  cards: CardsSchema,
  penalty: PenaltySchema,
});

// Schema para cada jogador na resposta
const TopAssist = z.object({
  player: PlayerSchema,
  statistics: z.array(StatisticsSchema),
});

// Schema para paginação
const PagingSchema = z.object({
  current: z.number(),
  total: z.number(),
});

// Schema para parâmetros da requisição
const ParametersSchema = z.object({
  league: z.string(),
  season: z.string(),
});

const TopAssistsApiResponseSchema = z.object({
  get: z.string(),
  parameters: ParametersSchema,
  errors: z.array(z.unknown()),
  results: z.number(),
  paging: PagingSchema,
  response: z.array(TopAssist),
});

// Tipos TypeScript derivados do schema
export type TopAssistsResponse = z.infer<typeof TopAssistsApiResponseSchema>;
export type TopAssistResponse = z.infer<typeof TopAssist>; 
export type Player = z.infer<typeof PlayerSchema>;
export type Statistics = z.infer<typeof StatisticsSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type League = z.infer<typeof LeagueSchema>;
export type Games = z.infer<typeof GamesSchema>;
export type Goals = z.infer<typeof GoalsSchema>;

export { TopAssistsApiResponseSchema };
