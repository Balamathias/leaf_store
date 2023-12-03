import { z } from "zod";
import { authRouter } from "./authRouter";
import { publicProcedure, router } from "./trpc";
import { QueryValidator } from "../utils/validators/query-validator";
import { getPayloadClient } from "../get-payloads";
import { PaymentRouter } from "./payment-router";

export const appRouter = router({
    auth: authRouter,
    payment: PaymentRouter,

    getInfiniteProducts: publicProcedure.input(z.object({
        limit: z.number().min(1).max(200),
        cursor: z.number().nullish(),
        query: QueryValidator
    })).query( async ({input}) => {
        const { query, cursor } = input
        const { sort, limit, ...queryOpts} = query
        const payload = await getPayloadClient()

        const parsedQueryOpts: Record<string, {equals: string}> = {}
        
        Object.entries(queryOpts).forEach(([key, value]) => {
            parsedQueryOpts[key] = {
                equals: value
            }
        })
        const page = cursor || 1
        const {docs: products, nextPage, hasNextPage} = await payload.find({
            collection: "products",
            where: {
                approvedForSale: {
                    equals: "approved",
                },
            },
            ...queryOpts,
            sort,
            limit,
            page,
        })

        return {
            products,
            nextPage: hasNextPage ? nextPage : null
        }
    })
})

export type AppRouter = typeof appRouter

