import { z } from "zod";

const WinnerSchema = z.object({
  id: z.number(),
  name: z.string(),
  comment: z.string().nullable(),
});

const PredictionGoalsSchema = z.object({
  home: z.string(),
  away: z.string(),
});

const PercentSchema = z.object({
  home: z.string(),
  draw: z.string(),
  away: z.string(),
});

const PredictionsSchema = z.object({
  winner: WinnerSchema,
  win_or_draw: z.boolean(),
  under_over: z.string().nullable(),
  goals: PredictionGoalsSchema,
  advice: z.string(),
  percent: PercentSchema,
});

const PredictionLeagueSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  logo: z.string().url(),
  flag: z.union([z.string().url(), z.null()]),
  season: z.number(),
});

const GoalStatsSchema = z.object({
  total: z.number(),
  average: z.string(),
});

const Last5GoalsSchema = z.object({
  for: GoalStatsSchema,
  against: GoalStatsSchema,
});

const Last5Schema = z.object({
  played: z.number(),
  form: z.string(),
  att: z.string(),
  def: z.string(),
  goals: Last5GoalsSchema,
});

const PlayedStatsSchema = z.object({
  home: z.number(),
  away: z.number(),
  total: z.number(),
});

const FixturesStatsSchema = z.object({
  played: PlayedStatsSchema,
  wins: PlayedStatsSchema,
  draws: PlayedStatsSchema,
  loses: PlayedStatsSchema,
});

const MinuteStatsSchema = z.object({
  total: z.number().nullable(),
  percentage: z.string().nullable(),
});

const GoalMinutesSchema = z.object({
  "0-15": MinuteStatsSchema,
  "16-30": MinuteStatsSchema,
  "31-45": MinuteStatsSchema,
  "46-60": MinuteStatsSchema,
  "61-75": MinuteStatsSchema,
  "76-90": MinuteStatsSchema,
  "91-105": MinuteStatsSchema,
  "106-120": MinuteStatsSchema,
});

const UnderOverStatsSchema = z.object({
  over: z.number(),
  under: z.number(),
});

const UnderOverSchema = z.object({
  "0.5": UnderOverStatsSchema,
  "1.5": UnderOverStatsSchema,
  "2.5": UnderOverStatsSchema,
  "3.5": UnderOverStatsSchema,
  "4.5": UnderOverStatsSchema,
});

const GoalTotalsSchema = z.object({
  home: z.number(),
  away: z.number(),
  total: z.number(),
});

const GoalAveragesSchema = z.object({
  home: z.string(),
  away: z.string(),
  total: z.string(),
});

const GoalsForSchema = z.object({
  total: GoalTotalsSchema,
  average: GoalAveragesSchema,
  minute: GoalMinutesSchema,
  under_over: UnderOverSchema,
});

const GoalsAgainstSchema = z.object({
  total: GoalTotalsSchema,
  average: GoalAveragesSchema,
  minute: GoalMinutesSchema,
  under_over: UnderOverSchema,
});

const LeagueGoalsSchema = z.object({
  for: GoalsForSchema,
  against: GoalsAgainstSchema,
});

const StreakSchema = z.object({
  wins: z.number(),
  draws: z.number(),
  loses: z.number(),
});

const WinsLosesSchema = z.object({
  home: z.string(),
  away: z.string(),
});

const BiggestGoalsSimpleSchema = z.object({
  home: z.number(),
  away: z.number(),
});

const BiggestGoalsSchema = z.object({
  for: BiggestGoalsSimpleSchema,
  against: BiggestGoalsSimpleSchema,
});

const BiggestSchema = z.object({
  streak: StreakSchema,
  wins: WinsLosesSchema,
  loses: WinsLosesSchema,
  goals: BiggestGoalsSchema,
});

const PenaltyStatsSchema = z.object({
  total: z.number(),
  percentage: z.string(),
});

const PenaltySchema = z.object({
  scored: PenaltyStatsSchema,
  missed: PenaltyStatsSchema,
  total: z.number(),
});

const LineupFormationSchema = z.object({
  formation: z.string(),
  played: z.number(),
});

const CardMinutesSchema = z.object({
  "0-15": MinuteStatsSchema,
  "16-30": MinuteStatsSchema,
  "31-45": MinuteStatsSchema,
  "46-60": MinuteStatsSchema,
  "61-75": MinuteStatsSchema,
  "76-90": MinuteStatsSchema,
  "91-105": MinuteStatsSchema,
  "106-120": MinuteStatsSchema,
});

const CardsSchema = z.object({
  yellow: CardMinutesSchema,
  red: CardMinutesSchema,
});

const TeamLeagueStatsSchema = z.object({
  form: z.string(),
  fixtures: FixturesStatsSchema,
  goals: LeagueGoalsSchema,
  biggest: BiggestSchema,
  clean_sheet: PlayedStatsSchema,
  failed_to_score: PlayedStatsSchema,
  penalty: PenaltySchema,
  lineups: z.array(LineupFormationSchema),
  cards: CardsSchema,
});

const PredictionTeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string().url(),
  last_5: Last5Schema,
  league: TeamLeagueStatsSchema,
});

const TeamsStatsSchema = z.object({
  home: PredictionTeamSchema,
  away: PredictionTeamSchema,
});

const ComparisonStatsSchema = z.object({
  home: z.string(),
  away: z.string(),
});

const ComparisonSchema = z.object({
  form: ComparisonStatsSchema,
  att: ComparisonStatsSchema,
  def: ComparisonStatsSchema,
  poisson_distribution: ComparisonStatsSchema,
  h2h: ComparisonStatsSchema,
  goals: ComparisonStatsSchema,
  total: ComparisonStatsSchema,
});

const H2HFixturePeriodSchema = z.object({
  first: z.number().nullable(),
  second: z.number().nullable(),
});

const H2HFixtureVenueSchema = z.object({
  id: z.number().nullable(),
  name: z.string(),
  city: z.string(),
});

const H2HFixtureStatusSchema = z.object({
  long: z.string(),
  short: z.string(),
  elapsed: z.number().nullable(),
  extra: z.number().nullable(),
});

const H2HFixtureSchema = z.object({
  id: z.number(),
  referee: z.string().nullable(),
  timezone: z.string(),
  date: z.string(),
  timestamp: z.number(),
  periods: H2HFixturePeriodSchema,
  venue: H2HFixtureVenueSchema,
  status: H2HFixtureStatusSchema,
});

const H2HLeagueSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  logo: z.string().url(),
  flag: z.union([z.string().url(), z.null()]),
  season: z.number(),
  round: z.string(),
  standings: z.boolean(),
});

const H2HTeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string().url(),
  winner: z.boolean().nullable(),
});

const H2HTeamsSchema = z.object({
  home: H2HTeamSchema,
  away: H2HTeamSchema,
});

const H2HGoalsSchema = z.object({
  home: z.number(),
  away: z.number(),
});

const H2HScoreDetailSchema = z.object({
  home: z.number().nullable(),
  away: z.number().nullable(),
});

const H2HScoreSchema = z.object({
  halftime: H2HScoreDetailSchema,
  fulltime: H2HScoreDetailSchema,
  extratime: H2HScoreDetailSchema,
  penalty: H2HScoreDetailSchema,
});

const H2HMatchSchema = z.object({
  fixture: H2HFixtureSchema,
  league: H2HLeagueSchema,
  teams: H2HTeamsSchema,
  goals: H2HGoalsSchema,
  score: H2HScoreSchema,
});

const PredictionResponseSchema = z.object({
  predictions: PredictionsSchema,
  league: PredictionLeagueSchema,
  teams: TeamsStatsSchema,
  comparison: ComparisonSchema,
  h2h: z.array(H2HMatchSchema),
});

const PredictionsPagingSchema = z.object({
  current: z.number(),
  total: z.number(),
});

const PredictionsApiResponseSchema = z.object({
  get: z.string(),
  parameters: z.object({
    fixture: z.string(),
  }),
  errors: z.array(z.unknown()),
  results: z.number(),
  paging: PredictionsPagingSchema,
  response: z.array(PredictionResponseSchema),
});

export type Winner = z.infer<typeof WinnerSchema>;
export type PredictionGoals = z.infer<typeof PredictionGoalsSchema>;
export type Percent = z.infer<typeof PercentSchema>;
export type Predictions = z.infer<typeof PredictionsSchema>;
export type PredictionLeague = z.infer<typeof PredictionLeagueSchema>;
export type GoalStats = z.infer<typeof GoalStatsSchema>;
export type Last5Goals = z.infer<typeof Last5GoalsSchema>;
export type Last5 = z.infer<typeof Last5Schema>;
export type PlayedStats = z.infer<typeof PlayedStatsSchema>;
export type FixturesStats = z.infer<typeof FixturesStatsSchema>;
export type MinuteStats = z.infer<typeof MinuteStatsSchema>;
export type GoalMinutes = z.infer<typeof GoalMinutesSchema>;
export type UnderOverStats = z.infer<typeof UnderOverStatsSchema>;
export type UnderOver = z.infer<typeof UnderOverSchema>;
export type GoalTotals = z.infer<typeof GoalTotalsSchema>;
export type GoalAverages = z.infer<typeof GoalAveragesSchema>;
export type GoalsFor = z.infer<typeof GoalsForSchema>;
export type GoalsAgainst = z.infer<typeof GoalsAgainstSchema>;
export type LeagueGoals = z.infer<typeof LeagueGoalsSchema>;
export type Streak = z.infer<typeof StreakSchema>;
export type WinsLoses = z.infer<typeof WinsLosesSchema>;
export type BiggestGoalsSimple = z.infer<typeof BiggestGoalsSimpleSchema>;
export type BiggestGoals = z.infer<typeof BiggestGoalsSchema>;
export type Biggest = z.infer<typeof BiggestSchema>;
export type PenaltyStats = z.infer<typeof PenaltyStatsSchema>;
export type Penalty = z.infer<typeof PenaltySchema>;
export type LineupFormation = z.infer<typeof LineupFormationSchema>;
export type CardMinutes = z.infer<typeof CardMinutesSchema>;
export type Cards = z.infer<typeof CardsSchema>;
export type TeamLeagueStats = z.infer<typeof TeamLeagueStatsSchema>;
export type PredictionTeam = z.infer<typeof PredictionTeamSchema>;
export type TeamsStats = z.infer<typeof TeamsStatsSchema>;
export type ComparisonStats = z.infer<typeof ComparisonStatsSchema>;
export type Comparison = z.infer<typeof ComparisonSchema>;
export type H2HFixturePeriod = z.infer<typeof H2HFixturePeriodSchema>;
export type H2HFixtureVenue = z.infer<typeof H2HFixtureVenueSchema>;
export type H2HFixtureStatus = z.infer<typeof H2HFixtureStatusSchema>;
export type H2HFixture = z.infer<typeof H2HFixtureSchema>;
export type H2HLeague = z.infer<typeof H2HLeagueSchema>;
export type H2HTeam = z.infer<typeof H2HTeamSchema>;
export type H2HTeams = z.infer<typeof H2HTeamsSchema>;
export type H2HGoals = z.infer<typeof H2HGoalsSchema>;
export type H2HScoreDetail = z.infer<typeof H2HScoreDetailSchema>;
export type H2HScore = z.infer<typeof H2HScoreSchema>;
export type H2HMatch = z.infer<typeof H2HMatchSchema>;
export type PredictionsResponse = z.infer<typeof PredictionResponseSchema>;
export type PredictionsPaging = z.infer<typeof PredictionsPagingSchema>;
export type PredictionsApiResponse = z.infer<
  typeof PredictionsApiResponseSchema
>;

export { PredictionsApiResponseSchema };
