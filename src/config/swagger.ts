export const Options = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'Home API',
            description: 'Home API using Fastify and Swagger',
            version: '1.0.0'
        },
        host: '127.0.0.1:4000/',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    }
}
