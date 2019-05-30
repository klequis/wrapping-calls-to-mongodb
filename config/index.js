/* istanbul ignore file */
const mongoUrl = env => {
  if (env === 'test') {
    // good: return 'mongodb://localhost:27017'
    // mongodb://superadmin:thepianohasbeendrinking@<host>:<port>
    return 'mongodb://localadmin:a9vChJeSqk&uUG@localhost:27017'
  } else {
    return 'mongodb+srv://todo-db-admin:D92dARWONO0t16uF@todo-cluster0-ilc7v.mongodb.net/test?retryWrites=true'
  }
}

const dbName = env => {
  if (env === 'test') {
    return 'todo-test'
  } else if (env === 'dev') {
    return 'todo-dev'
  }
  return 'todo-prod'
}

const apiRoot = env => {
  if (env === 'prod') {
    return ''
  }
  return 'https://api.klequis-todo.tk'
}

export default {
  mongoUrl: mongoUrl(process.env.NODE_ENV),
  dbName: dbName(process.env.NODE_ENV),
  apiRoot: apiRoot(process.env.NODE_ENV),
  port: 3030
}
