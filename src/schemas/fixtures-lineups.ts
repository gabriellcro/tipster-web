import { z } from "zod";

const PlayerPositionEnum = z.enum(["G", "D", "M", "F"]);

const PlayerColorsSchema = z.object({
  primary: z.string(),
  number: z.string(),
  border: z.string(),
});

const TeamColorsSchema = z.object({
  player: PlayerColorsSchema,
  goalkeeper: PlayerColorsSchema,
});

const LineupTeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string().url(),
  colors: TeamColorsSchema,
});

const CoachSchema = z.object({
  id: z.number(),
  name: z.string(),
  photo: z.string().url(),
});

const LineupPlayerSchema = z.object({
  id: z.number(),
  name: z.string(),
  number: z.number(),
  pos: PlayerPositionEnum,
  grid: z.string().nullable(),
});

const PlayerPositionSchema = z.object({
  player: LineupPlayerSchema,
});

const TeamLineupSchema = z.object({
  team: LineupTeamSchema,
  coach: CoachSchema,
  formation: z.string(),
  startXI: z.array(PlayerPositionSchema),
  substitutes: z.array(PlayerPositionSchema),
});

const LineupsPagingSchema = z.object({
  current: z.number(),
  total: z.number(),
});

const LineupsApiResponseSchema = z.object({
  get: z.string(),
  parameters: z.object({
    fixture: z.string(),
  }),
  errors: z.array(z.unknown()),
  results: z.number(),
  paging: LineupsPagingSchema,
  response: z.array(TeamLineupSchema),
});

export type PlayerPositionEnumType = z.infer<typeof PlayerPositionEnum>;
export type PlayerColors = z.infer<typeof PlayerColorsSchema>;
export type LineupTeam = z.infer<typeof LineupTeamSchema>;
export type LineupPlayer = z.infer<typeof LineupPlayerSchema>;
export type PlayerPosition = z.infer<typeof PlayerPositionSchema>;
export type LineupsPaging = z.infer<typeof LineupsPagingSchema>;
export type TeamColors = z.infer<typeof TeamColorsSchema>;
export type Coach = z.infer<typeof CoachSchema>;
export type TeamLineupResponse = z.infer<typeof TeamLineupSchema>;
export type LineupsApiResponse = z.infer<typeof LineupsApiResponseSchema>;

export { LineupsApiResponseSchema, PlayerPositionEnum };
