import R from 'ramda'

const getEnv = (env) => env || process.env.NODE_ENV || 'test';
const getConfig = config => (env) => R.prop(getEnv(env), config);

export default getConfig;