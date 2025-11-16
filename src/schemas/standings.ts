import { z } from "zod";

const StandingTeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string().url(),
});

const RecordGoalsSchema = z.object({
  for: z.number(),
  against: z.number(),
});

const RecordSchema = z.object({
  played: z.number(),
  win: z.number(),
  draw: z.number(),
  lose: z.number(),
  goals: RecordGoalsSchema,
});

const StandingSchema = z.object({
  rank: z.number(),
  team: StandingTeamSchema,
  points: z.number(),
  goalsDiff: z.number(),
  group: z.string(),
  form: z.string(),
  status: z.string(),
  description: z.string().nullable(),
  all: RecordSchema,
  home: RecordSchema,
  away: RecordSchema,
  update: z.string(),
});

const StandingsLeagueSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  logo: z.string().url(),
  flag: z.string().url(),
  season: z.number(),
  standings: z.array(z.array(StandingSchema)),
});

const StandingsResponseSchema = z.object({
  league: StandingsLeagueSchema,
});

const StandingsPagingSchema = z.object({
  current: z.number(),
  total: z.number(),
});

const StandingsApiResponseSchema = z.object({
  get: z.string(),
  parameters: z.object({
    league: z.string(),
    season: z.string(),
  }),
  errors: z.array(z.unknown()),
  results: z.number(),
  paging: StandingsPagingSchema,
  response: z.array(StandingsResponseSchema),
});

export type StandingTeam = z.infer<typeof StandingTeamSchema>;
export type RecordGoals = z.infer<typeof RecordGoalsSchema>;
export type Record = z.infer<typeof RecordSchema>;
export type Standing = z.infer<typeof StandingSchema>;
export type StandingsLeague = z.infer<typeof StandingsLeagueSchema>;
export type StandingsResponse = z.infer<typeof StandingsResponseSchema>;
export type StandingsApiResponse = z.infer<typeof StandingsApiResponseSchema>;

export { StandingsApiResponseSchema };
