import { z } from 'zod';

const PlayerBirthSchema = z.object({
  date: z.string(),
  place: z.string(),
  country: z.string(),
});

const PlayerInfoSchema = z.object({
  id: z.number(),
  name: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  age: z.number(),
  birth: PlayerBirthSchema,
  nationality: z.string(),
  height: z.string(),
  weight: z.string(),
  injured: z.boolean(),
  photo: z.string().url(),
});

const TeamInfoSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string().url(),
});

const LeagueInfoSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  logo: z.string().url(),
  flag: z.string().url(),
  season: z.number(),
});

const GamesStatisticsSchema = z.object({
  appearences: z.number(),
  lineups: z.number(),
  minutes: z.number(),
  number: z.number().nullable(),
  position: z.string(),
  rating: z.string(),
  captain: z.boolean(),
});

const SubstitutesStatisticsSchema = z.object({
  in: z.number(),
  out: z.number().nullable(),
  bench: z.number().nullable(),
});

const ShotsStatisticsSchema = z.object({
  total: z.number(),
  on: z.number(),
});

const GoalsStatisticsSchema = z.object({
  total: z.number(),
  conceded: z.number(),
  assists: z.number(),
  saves: z.number().nullable(),
});

const PassesStatisticsSchema = z.object({
  total: z.number(),
  key: z.number(),
  accuracy: z.number().nullable(),
});

const TacklesStatisticsSchema = z.object({
  total: z.number(),
  blocks: z.number().nullable(),
  interceptions: z.number(),
});

const DuelsStatisticsSchema = z.object({
  total: z.number(),
  won: z.number(),
});

const DribblesStatisticsSchema = z.object({
  attempts: z.number(),
  success: z.number(),
  past: z.number().nullable(),
});

const FoulsStatisticsSchema = z.object({
  drawn: z.number(),
  committed: z.number(),
});

const CardsStatisticsSchema = z.object({
  yellow: z.number(),
  yellowred: z.number().nullable(),
  red: z.number(),
});

const PenaltyStatisticsSchema = z.object({
  won: z.number().nullable(),
  commited: z.number().nullable(),
  scored: z.number(),
  missed: z.number(),
  saved: z.number().nullable(),
});

const PlayerStatisticsSchema = z.object({
  team: TeamInfoSchema,
  league: LeagueInfoSchema,
  games: GamesStatisticsSchema,
  substitutes: SubstitutesStatisticsSchema,
  shots: ShotsStatisticsSchema,
  goals: GoalsStatisticsSchema,
  passes: PassesStatisticsSchema,
  tackles: TacklesStatisticsSchema,
  duels: DuelsStatisticsSchema,
  dribbles: DribblesStatisticsSchema,
  fouls: FoulsStatisticsSchema,
  cards: CardsStatisticsSchema,
  penalty: PenaltyStatisticsSchema,
});

const TopScorerSchema = z.object({
  player: PlayerInfoSchema,
  statistics: z.array(PlayerStatisticsSchema),
});

const TopScorersPagingSchema = z.object({
  current: z.number(),
  total: z.number(),
});

const TopScorersApiResponseSchema = z.object({
  get: z.string(),
  parameters: z.object({
    league: z.string(),
    season: z.string(),
  }),
  errors: z.array(z.unknown()),
  results: z.number(),
  paging: TopScorersPagingSchema,
  response: z.array(TopScorerSchema),
});

// Exports dos tipos
export type PlayerBirth = z.infer<typeof PlayerBirthSchema>;
export type PlayerInfo = z.infer<typeof PlayerInfoSchema>;
export type TeamInfo = z.infer<typeof TeamInfoSchema>;
export type LeagueInfo = z.infer<typeof LeagueInfoSchema>;
export type GamesStatistics = z.infer<typeof GamesStatisticsSchema>;
export type SubstitutesStatistics = z.infer<typeof SubstitutesStatisticsSchema>;
export type ShotsStatistics = z.infer<typeof ShotsStatisticsSchema>;
export type GoalsStatistics = z.infer<typeof GoalsStatisticsSchema>;
export type PassesStatistics = z.infer<typeof PassesStatisticsSchema>;
export type TacklesStatistics = z.infer<typeof TacklesStatisticsSchema>;
export type DuelsStatistics = z.infer<typeof DuelsStatisticsSchema>;
export type DribblesStatistics = z.infer<typeof DribblesStatisticsSchema>;
export type FoulsStatistics = z.infer<typeof FoulsStatisticsSchema>;
export type CardsStatistics = z.infer<typeof CardsStatisticsSchema>;
export type PenaltyStatistics = z.infer<typeof PenaltyStatisticsSchema>;
export type PlayerStatistics = z.infer<typeof PlayerStatisticsSchema>;
export type TopScorerResponse = z.infer<typeof TopScorerSchema>;
export type TopScorersPaging = z.infer<typeof TopScorersPagingSchema>;
export type TopScorersApiResponse = z.infer<typeof TopScorersApiResponseSchema>;

export { TopScorersApiResponseSchema };