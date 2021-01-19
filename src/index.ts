import * as fastify from 'fastify'
import { config } from './config/default'

/**
 * Configurations
 */
const port = config.nodeServer.port

/**
 * Configure HTTP server
 */
const app = fastify.default()

const start = async (): Promise<void> => {
    try {
        await app.listen(port)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}
start()

export default app
