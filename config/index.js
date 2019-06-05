import settings from './settings'

const unknowEnvName = 'ERROR: config/indes.js: unknown environment name. Must be testLocal, testRemote, dev or prod'

const mongoUri = (env) => {
  switch (env) {
    case 'testLocal':
      return settings.testLocal.mongoUri
    case 'testRemote':
      return settings.testRemote.mongoUri
    case 'dev':
      return settings.dev.mongoUri
    case 'prod':
      return settings.prod.mongoUri
    default:
      throw new Error(unknowEnvName)
  }
}

const dbName = (env) => {
  switch (env) {
    case 'testLocal':
      return settings.testLocal.dbName
    case 'testRemote':
      return settings.testRemote.dbName      
    case 'dev':
      return settings.dev.dbName
    case 'prod':
      return settings.prod.dbName
    default:
      throw new Error(unknowEnvName)
  }
}

const apiRoot = (env)  => {
  switch (env) {
    case 'testLocal':
    case 'dev':
      return settings.apiRootLocal
    case 'testRemote':
    case 'prod':
      return settings.apiRootRemote
    default:
      throw new Error(unknowEnvName)
  }
}

export default {
  mongoUri: mongoUri(process.env.NODE_ENV),
  dbName: dbName(process.env.NODE_ENV),
  apiRoot: apiRoot(process.env.NODE_ENV),
  port: 3030
};