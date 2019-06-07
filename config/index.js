import settings from './settings'

const unknowEnvName = 'ERROR: config/indes.js: unknown environment name. Must be testLocal, testRemote, dev or prod'

const mongoUri = (env) => {
  switch (env) {
    case 'testLocal':
      console.log('env: ', env);
      console.log('monguUri: ', settings.testLocal.mongoUri)
      return settings.testLocal.mongoUri
    case 'testRemote':
      console.log('env: ', env);
      console.log('monguUri: ', settings.testRemote.mongoUri)
      return settings.testRemote.mongoUri
    case 'dev':
      console.log('env: ', env);
      console.log('monguUri: ', settings.dev.mongoUri)
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
  port: 3030,
  env: process.env.NODE_ENV
};
