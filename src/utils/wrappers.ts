import { FastifyRequest, FastifyReply } from 'fastify'

type Handler = (req: FastifyRequest, res: FastifyReply, error?: Error) => Promise<void> | void

type Route = {
    url: string
    method: string
    handler: Handler | Handler[]
}

export const applyRoutes = (routes: Route[], router: unknown) => {
    for (const route of routes) {
        const { method, url, handler } = route
        ;(router as any)[method](url, handler)
    }
}
