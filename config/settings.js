const dbNameTest = 'todo-test'
const dbNameDev = 'todo-dev'
const dbNameProd = 'todo-prod'
const localPwd = 'karl'

const settings = {
  dbName: {
    test: dbNameTest,
    dev: dbNameDev,
    prod: dbNameProd
  },
  pwd: {
    local:  'karl',
  }, 
  apiRoot: {
    local: 'https://api.klequis-todo.tk',
    remote: ''
  },
  testLocal: {
    mongoUri: `mongodb://testUser:${localPwd}@localhost:27017/${dbNameTest}`,
    dbName: dbNameTest,
  },
  dev: {
    mongoUri: `mongodb://devUser:${localPwd}@localhost:27017/${dbNameDev}`,
    dbName: dbNameDev,
  },
  testRemote: {
    mongoUri: `mongodb+srv://todo-test:Tly24XUsCBdRwYwr@todo-cluster0-ilc7v.mongodb.net/${dbNameTest}?retryWrites=true`,
    dbName: dbNameTest,
  },
  prod: {
    // TODO: create this user
    mongoUri: `mongodb+srv://todo-prod:?password?@todo-cluster0-ilc7v.mongodb.net/${dbNameProd}?retryWrites=true`,
    dbName: dbNameProd,
  }
}

export default settings
