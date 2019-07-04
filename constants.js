// If __PROD__ is not defined, then it is Node environment without Babel
const isProd = (typeof __PROD__ === 'boolean' && __PROD__) || process.env.NODE_ENV === 'production'

const CONSTANTS_MAP = {
  DEV_ROOT_URL: 'http://localhost:3000/',
  PROD_ROOT_URL: 'https://hanzluo.com/',
  get ROOT_URL() {
    return isProd ? this.PROD_ROOT_URL : this.DEV_ROOT_URL
  },
  DEV_MONGO_URL: 'mongodb://localhost:27017/hanzluo',
  PROD_MONGO_URL: 'mongodb://localhost:27017/hanzluo',
  get MONGO_URL() {
    return isProd ? this.PROD_MONGO_URL : this.DEV_MONGO_URL
  },
}

module.exports = CONSTANTS_MAP
