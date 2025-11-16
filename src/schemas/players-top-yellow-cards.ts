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
  position: z.string(),
  rating: z.string(),
});

// Schema para gols
const GoalsSchema = z.object({
  total: z.number(),
  assists: z.number().nullable(),
});

// Schema para cartões
const CardsSchema = z.object({
  yellow: z.number(),
  yellowred: z.number().nullable(),
  red: z.number(),
});

// Schema para estatísticas completas
const StatisticsSchema = z.object({
  team: TeamSchema,
  league: LeagueSchema,
  games: GamesSchema,
  goals: GoalsSchema,
  cards: CardsSchema,
});

// Schema para resposta individual do jogador
const TopYellowCardsSchema = z.object({
  player: PlayerSchema,
  statistics: StatisticsSchema,
});

// Schema para parâmetros da requisição
const ParametersSchema = z.object({
  league: z.string(),
  season: z.string(),
});

// Schema para paginação
const PagingSchema = z.object({
  current: z.number(),
  total: z.number(),
});

// Schema principal da resposta da API
const TopYellowCardsApiResponseSchema = z.object({
  get: z.string(),
  parameters: ParametersSchema,
  results: z.number(),
  paging: PagingSchema,
  response: z.array(TopYellowCardsSchema),
});

// Tipos TypeScript inferidos do schema
export type Birth = z.infer<typeof BirthSchema>;
export type Player = z.infer<typeof PlayerSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type League = z.infer<typeof LeagueSchema>;
export type Games = z.infer<typeof GamesSchema>;
export type Goals = z.infer<typeof GoalsSchema>;
export type Cards = z.infer<typeof CardsSchema>;
export type Statistics = z.infer<typeof StatisticsSchema>;
export type TopYellowCardsResponse = z.infer<typeof TopYellowCardsSchema>;
export type Parameters = z.infer<typeof ParametersSchema>;
export type Paging = z.infer<typeof PagingSchema>;
export type TopYellowCardsApiResponse = z.infer<typeof TopYellowCardsApiResponseSchema>;

export { TopYellowCardsApiResponseSchema };