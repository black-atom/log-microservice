import getConfig from './index'

export const getAuthConfig = getConfig({
    development: {
        bypass: true,
        secret: "realponto",
        host: 'localhost',
        port: 3000
    },

    test: {
        bypass: true,
        secret: "realponto",
        host: 'localhost',
        port: 3000
    },

    production: {
        bypass: false,
        secret: "realponto",
        host: process.env.AUTH_API_HOST || 'localhost',
        port: process.env.AUTH_API_PORT ||  3000
    }
});