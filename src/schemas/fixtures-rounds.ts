import { z } from "zod";

const ParametersSchema = z.object({
  league: z.string(),
  season: z.string(),
});

const PagingSchema = z.object({
  current: z.number(),
  total: z.number(),
});

const RoundsApiResponseSchema = z.object({
  get: z.string(),
  parameters: ParametersSchema,
  errors: z.array(z.unknown()),
  results: z.number(),
  paging: PagingSchema,
  response: z.array(z.string()),
});

export type RoundsResponse = z.infer<typeof RoundsApiResponseSchema>;
export type Parameters = z.infer<typeof ParametersSchema>;
export type Paging = z.infer<typeof PagingSchema>;

export { RoundsApiResponseSchema };
