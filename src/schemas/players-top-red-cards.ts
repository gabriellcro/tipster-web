import { z } from "zod";

const BirthSchema = z.object({
  date: z.string(),
  place: z.string(),
  country: z.string(),
});

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

const TeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string().url(),
});

const LeagueSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  logo: z.string().url(),
  flag: z.string().url(),
  season: z.number(),
});

const GamesSchema = z.object({
  appearences: z.number().nullable(),
  lineups: z.number().nullable(),
  minutes: z.number().nullable(),
  number: z.number().nullable(),
  position: z.string(),
  rating: z.string().nullable(),
  captain: z.boolean(),
});

const SubstitutesSchema = z.object({
  in: z.number().nullable(),
  out: z.number().nullable(),
  bench: z.number().nullable(),
});

const ShotsSchema = z.object({
  total: z.number().nullable(),
  on: z.number().nullable(),
});

const GoalsSchema = z.object({
  total: z.number().nullable(),
  conceded: z.number().nullable(),
  assists: z.number().nullable(),
  saves: z.number().nullable(),
});

const PassesSchema = z.object({
  total: z.number().nullable(),
  key: z.number().nullable(),
  accuracy: z.number().nullable(),
});

const TacklesSchema = z.object({
  total: z.number().nullable(),
  blocks: z.number().nullable(),
  interceptions: z.number().nullable(),
});

const DuelsSchema = z.object({
  total: z.number().nullable(),
  won: z.number().nullable(),
});

const DribblesSchema = z.object({
  attempts: z.number().nullable(),
  success: z.number().nullable(),
  past: z.number().nullable(),
});

const FoulsSchema = z.object({
  drawn: z.number().nullable(),
  committed: z.number().nullable(),
});

const CardsSchema = z.object({
  yellow: z.number().nullable(),
  yellowred: z.number().nullable(),
  red: z.number().nullable(),
});

const PenaltySchema = z.object({
  won: z.number().nullable(),
  commited: z.number().nullable(),
  scored: z.number().nullable(),
  missed: z.number().nullable(),
  saved: z.number().nullable(),
});

const StatisticSchema = z.object({
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

export const TopRedCardsSchema = z.object({
  player: PlayerSchema,
  statistics: z.array(StatisticSchema),
});

const PagingSchema = z.object({
  current: z.number(),
  total: z.number(),
});

const ParametersSchema = z.object({
  league: z.string(),
  season: z.string(),
});

const TopRedCardsApiResponseSchema = z.object({
  get: z.string(),
  parameters: ParametersSchema,
  errors: z.array(z.unknown()),
  results: z.number(),
  paging: PagingSchema,
  response: z.array(TopRedCardsSchema),
});

export type TopRedCardsResponse = z.infer<typeof TopRedCardsSchema>;
export type Player = z.infer<typeof PlayerSchema>;
export type Statistics = z.infer<typeof StatisticSchema>;
export type Cards = z.infer<typeof CardsSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type Games = z.infer<typeof GamesSchema>;
export type TopRedCardsApiResponse = z.infer<
  typeof TopRedCardsApiResponseSchema
>;

export { TopRedCardsApiResponseSchema };
