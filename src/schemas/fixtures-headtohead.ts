import { z } from 'zod';

const H2HPeriodSchema = z.object({
  first: z.number().nullable(),
  second: z.number().nullable(),
});

const H2HVenueSchema = z.object({
  id: z.number().nullable(),
  name: z.string(),
  city: z.string(),
});

const H2HStatusSchema = z.object({
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
  periods: H2HPeriodSchema,
  venue: H2HVenueSchema,
  status: H2HStatusSchema,
});

const H2HLeagueSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  logo: z.string().url(),
  flag: z.string().url().nullable(),
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
  home: z.number().nullable(),
  away: z.number().nullable(),
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

const H2HPagingSchema = z.object({
  current: z.number(),
  total: z.number(),
});

const H2HApiResponseSchema = z.object({
  get: z.string(),
  parameters: z.object({
    h2h: z.string(),
    from: z.string(),
    to: z.string(),
  }),
  errors: z.array(z.unknown()),
  results: z.number(),
  paging: H2HPagingSchema,
  response: z.array(H2HMatchSchema),
});

export type H2HPeriod = z.infer<typeof H2HPeriodSchema>;
export type H2HVenue = z.infer<typeof H2HVenueSchema>;
export type H2HStatus = z.infer<typeof H2HStatusSchema>;
export type H2HFixture = z.infer<typeof H2HFixtureSchema>;
export type H2HLeague = z.infer<typeof H2HLeagueSchema>;
export type H2HTeam = z.infer<typeof H2HTeamSchema>;
export type H2HTeams = z.infer<typeof H2HTeamsSchema>;
export type H2HGoals = z.infer<typeof H2HGoalsSchema>;
export type H2HScoreDetail = z.infer<typeof H2HScoreDetailSchema>;
export type H2HScore = z.infer<typeof H2HScoreSchema>;
export type H2HMatchResponse = z.infer<typeof H2HMatchSchema>;
export type H2HApiResponse = z.infer<typeof H2HApiResponseSchema>;

export { H2HApiResponseSchema };