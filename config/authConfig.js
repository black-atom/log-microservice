import R from 'ramda'
import getConfig from './index'

const getAuthConfig = getConfig({
    development: {
        bypass: true,
        secret: 'realponto'
    },

    test: {
        bypass: true,
        secret: 'realponto'
    },

    production: {
        bypass: false,
        secret: 'realponto'
    }

})

export { getAuthConfig } 