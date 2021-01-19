import * as fastify from 'fastify'
import Logger from './loaders/logger'
import fastifyCors from 'fastify-cors'
import swagger from 'fastify-swagger'
import fastifyBlipp from 'fastify-blipp'
import { config } from './config/default'
import { Options } from './config/swagger'
import { applyRoutes } from './utils/wrappers'
import contractRoutes from './api/routes'

/**
 * Configurations
 */
const port = config.nodeServer.port

/**
 * Configure HTTP server
 */
const app = fastify.default({ logger: true })

/**
 * Registers
 */
app.register(swagger, Options)
app.register(fastifyBlipp)
app.register(fastifyCors, {
    credentials: true,
    origin: '*'
})

/**
 * Apply Middlewares
 */
applyRoutes(contractRoutes, app)

const start = async (): Promise<void> => {
    try {
        await app.listen(port)
        Logger.info(`🛡️  Server listening on port: ${port} 🛡️`)
        app.swagger()
        app.blipp()
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}
start()

export default app
