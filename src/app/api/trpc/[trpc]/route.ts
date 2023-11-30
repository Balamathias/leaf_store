import { appRouter } from '@/trpc'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (req: Request) => {
    fetchRequestHandler({
        req,
        router: appRouter,
        endpoint: '/api/trpc',
        // @ts-expect-error Context already passed from express
        createContext: () => ({}),
    })
}

export { handler as GET, handler as POST}