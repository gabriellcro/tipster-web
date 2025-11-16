import { z } from "zod";

// Enum Zod para SHORT
const MatchStatusShortEnum = z.enum([
  "TBD",   // Time To Be Defined
  "NS",    // Not Started
  "1H",    // First Half
  "HT",    // Halftime
  "2H",    // Second Half
  "ET",    // Extra Time
  "BT",    // Break Time
  "P",     // Penalty In Progress
  "SUSP",  // Suspended
  "INT",   // Interrupted
  "LIVE",  // In Progress
  "FT",    // Match Finished
  "AET",   // After Extra Time
  "PEN",   // Finished After Penalty
  "PST",   // Postponed
  "CANC",  // Cancelled
  "ABD",   // Abandoned
  "AWD",   // Technical Loss
  "WO",    // WalkOver
]);

// Enum Zod para LONG
const MatchStatusLongEnum = z.enum([
  "Time To Be Defined",
  "Not Started",
  "First Half, Kick Off",
  "Halftime",
  "Second Half, 2nd Half Started",
  "Extra Time",
  "Break Time",
  "Penalty In Progress",
  "Match Suspended",
  "Match Interrupted",
  "In Progress",
  "Match Finished",
  "Match Finished After Extra Time",
  "Match Finished After Penalty",
  "Match Postponed",
  "Match Cancelled",
  "Match Abandoned",
  "Technical Loss",
  "WalkOver",
]);

const PeriodSchema = z.object({
  first: z.number().nullable(),
  second: z.number().nullable(),
});

const VenueSchema = z.object({
  id: z.number(),
  name: z.string(),
  city: z.string(),
});

const StatusSchema = z.object({
  long: MatchStatusLongEnum,
  short: MatchStatusShortEnum,
  elapsed: z.number().nullable(),
  extra: z.number().nullable(),
});

const FixtureSchema = z.object({
  id: z.number(),
  referee: z.string().nullable(),
  timezone: z.string(),
  date: z.string(),
  timestamp: z.number(),
  periods: PeriodSchema,
  venue: VenueSchema,
  status: StatusSchema,
});

const LeagueSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  logo: z.url(),
  flag: z.url(),
  season: z.number(),
  round: z.string(),
  standings: z.boolean(),
});

const TeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.url(),
  winner: z.boolean().nullable(),
});

const TeamsSchema = z.object({
  home: TeamSchema,
  away: TeamSchema,
});

const GoalsSchema = z.object({
  home: z.number().nullable(),
  away: z.number().nullable(),
});

const ScoreDetailSchema = z.object({
  home: z.number().nullable(),
  away: z.number().nullable(),
});

const ScoreSchema = z.object({
  halftime: ScoreDetailSchema,
  fulltime: ScoreDetailSchema,
  extratime: ScoreDetailSchema,
  penalty: ScoreDetailSchema,
});

const MatchSchema = z.object({
  fixture: FixtureSchema,
  league: LeagueSchema,
  teams: TeamsSchema,
  goals: GoalsSchema,
  score: ScoreSchema,
});

const PagingSchema = z.object({
  current: z.number(),
  total: z.number(),
});

const FixturesApiResponseSchema = z.object({
  parameters: z.object({
    league: z.string(),
    season: z.string(),
    round: z.string(),
  }),
  errors: z.array(z.unknown()),
  results: z.number(),
  paging: PagingSchema,
  response: z.array(MatchSchema),
});

export type MatchStatusShort = z.infer<typeof MatchStatusShortEnum>;
export type MatchStatusLong = z.infer<typeof MatchStatusLongEnum>;
export type Period = z.infer<typeof PeriodSchema>;
export type Venue = z.infer<typeof VenueSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type Fixture = z.infer<typeof FixtureSchema>;
export type League = z.infer<typeof LeagueSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type Teams = z.infer<typeof TeamsSchema>;
export type Goals = z.infer<typeof GoalsSchema>;
export type ScoreDetail = z.infer<typeof ScoreDetailSchema>;
export type Score = z.infer<typeof ScoreSchema>;
export type MatchResponse = z.infer<typeof MatchSchema>;
export type Paging = z.infer<typeof PagingSchema>;
export type FixtureApiResponse = z.infer<typeof FixturesApiResponseSchema>;

export { FixturesApiResponseSchema };
