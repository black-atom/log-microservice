import R from 'ramda'
import getConfig from './index'

const config = getConfig({
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

export { config } 