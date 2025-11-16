import { z } from 'zod';

const StatisticsTeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.url(),
});

const StatisticSchema = z.object({
  type: z.string(),
  value: z.union([z.number(), z.string(), z.null()]),
});

const TeamStatisticsSchema = z.object({
  team: StatisticsTeamSchema,
  statistics: z.array(StatisticSchema),
});

const StatisticsPagingSchema = z.object({
  current: z.number(),
  total: z.number(),
});

const StatisticsApiResponseSchema = z.object({
  get: z.string(),
  parameters: z.object({
    fixture: z.string(),
  }),
  errors: z.array(z.unknown()),
  results: z.number(),
  paging: StatisticsPagingSchema,
  response: z.array(TeamStatisticsSchema),
});

export type StatisticsTeam = z.infer<typeof StatisticsTeamSchema>;
export type Statistic = z.infer<typeof StatisticSchema>;
export type TeamStatistics = z.infer<typeof TeamStatisticsSchema>;
export type StatisticsPaging = z.infer<typeof StatisticsPagingSchema>;
export type StatisticsApiResponse = z.infer<typeof StatisticsApiResponseSchema>;

export { StatisticsApiResponseSchema };