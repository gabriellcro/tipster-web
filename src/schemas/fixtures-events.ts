import { z } from "zod";

const EventTypeSchema = z.enum(["Card", "Goal", "subst", "Var"]);

const EventDetailSchema = z.enum([
  "Goal cancelled",
  "Goal confirmed",
  "Injury",
  "Missed Penalty",
  "Normal Goal",
  "Own Goal",
  "Penalty",
  "Penalty confirmed",
  "Red Card",
  "Substitution 1",
  "Substitution 2",
  "Substitution 3",
  "Substitution 4",
  "Substitution 5",
  "Yellow Card",
]);

const TimeSchema = z.object({
  elapsed: z.number(),
  extra: z.number().nullable(),
});

const EventTeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string().url(),
});

const PlayerSchema = z.object({
  id: z.number().nullable(),
  name: z.string().nullable(),
});

const EventSchema = z.object({
  time: TimeSchema,
  team: EventTeamSchema,
  player: PlayerSchema,
  assist: PlayerSchema,
  type: EventTypeSchema,
  detail: EventDetailSchema,
  comments: z.string().nullable(),
});

const EventsPagingSchema = z.object({
  current: z.number(),
  total: z.number(),
});

const EventsApiResponseSchema = z.object({
  get: z.string(),
  parameters: z.object({
    fixture: z.string(),
  }),
  errors: z.array(z.unknown()),
  results: z.number(),
  paging: EventsPagingSchema,
  response: z.array(EventSchema),
});

export type Time = z.infer<typeof TimeSchema>;
export type EventTeam = z.infer<typeof EventTeamSchema>;
export type Player = z.infer<typeof PlayerSchema>;
export type EventType = z.infer<typeof EventTypeSchema>;
export type EventDetailEnum = z.infer<typeof EventDetailSchema>;
export type EventsResponse = z.infer<typeof EventSchema>;
export type EventsApiResponse = z.infer<typeof EventsApiResponseSchema>;

export { EventsApiResponseSchema };
