import { z } from "zod";

export const QueryValidator = z.object({
    category: z.string().optional(),
    limit: z.number().optional(),
    sort: z.enum(['asc', 'desc']).optional()
})

export type TQueryValidator = z.infer<typeof QueryValidator>