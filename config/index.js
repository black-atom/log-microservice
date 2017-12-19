const R = require('ramda');
const getEnv = (env) => env || process.env.NODE_ENV || 'test';
const getConfig = config => (env) => R.prop(getEnv(env), config);

module.exports =  getConfig;