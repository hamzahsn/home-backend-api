export const config = {
    nodeServer: {
        host: '0.0.0.0',
        port: 4000
    },
    logs: {
        level: process.env.LOG_LEVEL || 'silly'
    }
}
