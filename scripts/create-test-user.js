import mongodb, { ObjectID } from 'mongodb'
// import { green, red } from '../logger'
import chalk from 'chalk'

const mongoUrl = 'mongodb://localhost:27017/todo-test'
const userName = 'todoTestUser'
let dbName = ''
const password = 'password@1'
const roleName = 'testUserRole'

const MongoClient = mongodb.MongoClient

let client

const connectDB = async () => {
  if (!client) {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true
    })
  }

  return { db: client.db(dbName) }
}

const close = async () => {
  if (client) {
    client.close()
  }
  client = undefined
}

const logFailure = (message, value = '') => {
  console.log(chalk.bgRed(` ${message} `), value)
}

const logSuccess = (message, value = '') => {
  console.log(chalk.bgGreen(` ${message} `), value)
}

const execCmd = async (params = {}, options = {}) => {
  const opts = {
    useAdmin: options.useAdmin || false
  }
  try {
    const { db } = await connectDB()
    const admin = db.admin()
    const cmd = {}
    const a = Object.keys(params).forEach(k => {
      cmd[k] = params[k]
    })
    console.log('execCmd: ', cmd)
    let ret
    if (opts.useAdmin) {
      ret = await admin.command(params)
    } else [(ret = await db.command(params))]
    logSuccess(`result: `, ret)
    return ret
  } catch (e) {
    logFailure(`execCmd: `, e)
  } finally {
    await close()
  }
}

const createRole = async (roleName, dbName) => {
  await execCmd({
    createRole: `${roleName}@${dbName}`,
    privileges: [
      {
        resource: { db: dbName, collection: '' },
        actions: ['find', 'insert', 'remove', 'update']
      }
    ],
    roles: [],
    writeConcern: { w: 'majority', wtimeout: 5000 }
  })
}

const createTestUser = async (userName) => {
  await execCmd({
    createUser: `${userName}@${dbName}`,
    pwd: 'password@1',
    // roles: [{ role: 'todoTest', db: dbName }],
    roles: [ 'todoTest' ],
    writeConcern: { w: 'majority', wtimeout: 5000 }
  })
}

const dropRole = async roleName => {
  await execCmd({
    dropRole: roleName
  })
}

const dropUser = async userName => {
  await execCmd({
    dropUser: userName
  })
}

const listUserDefinedRoles = async () => {
  return await execCmd({
    rolesInfo: 1,
    showBuiltinRoles: 0,
    showPrivileges: true
  })
}

const listUsers = async () => {
  const ret = await execCmd({ usersInfo: 1 })
  console.log('ret', ret)
  
}

const dropAllUserDefinedRoles = async () => {
  const ret = await listUserDefinedRoles()
  ret.roles.forEach(async r => {
    await dropRole(r.role)
  })
}

const printDbName = async () => {
  const { db } = await connectDB()
  const ret = await db.stats()
  logSuccess('dbName = ', ret.db)
}

// https://docs.mongodb.com/manual/reference/command/listDatabases/#dbcmd.listDatabases
const listDatabases = async () => {
  execCmd({
    listDatabases: 1,
    nameOnly: true
  })
}

// https://docs.mongodb.com/manual/reference/command/listCollections/#dbcmd.listCollections
const listCollections = async () => {
  const ret = await execCmd({
    listCollections: 1,
    authorizedCollections: true,
    nameOnly: true
  })
  const cols = ret.cursor.firstBatch
  console.group('Collections')
  cols.forEach(c => console.log(`- ${c.name}`))
  console.groupEnd()
  return cols
}

const main = async () => {
  console.log()
  console.log()
  console.log()

  const args = process.argv.slice(2)
  dbName = args[0]

  if (!dbName) {
    logFailure('parameter dbName is required')
    return
  }

  // await dropAllUserDefinedRoles()
  // await createRole('todoTest', 'todo-test')

  // await listUserDefinedRoles()
  // await createTestUser('todoTestUser', 'todo-test')
  // await dropUser('todoTestUser@todo-test')
  const users = await listUsers()
  
  

  // await printDbName()
  // await listDatabases()
  // await listCollections()
}

main()
