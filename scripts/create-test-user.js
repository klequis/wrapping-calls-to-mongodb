import mongodb, { ObjectID } from 'mongodb'
// import { green, red } from '../logger'
import chalk from 'chalk'

const mongoUrl = 'mongodb://localhost:27017'
const userName = 'todoTestUser'
const dbName = 'todo-test'
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

const createUser = async () => {
  try {
    const { db } = await connectDB()

    db.createRole()

    const opts = {
      roles: [
        {
          role: roleName
        }
      ]
    }
    const user = await db.addUser(userName, password, opts)
    console.log('user', user)
    
    await close()
  } catch (e) {
    console.log('createUser:', e)
  }
}



const logFailure = (message, value = '') => {
  console.log(chalk.bgRed(` ${message} `), value)
}

const logSuccess = (message, value = '') => {
  console.log(chalk.bgGreen(` ${message} `), value)
}

const execCmd = async (params={}) => {
  try {
    const { db } = await connectDB()
    const admin = db.admin()
    const cmd = {}
    const a = Object.keys(params).forEach(k => {
      cmd[k] = params[k]
    })
    console.log('execCmd: ', cmd);
    const ret = await admin.command(params)
    logSuccess(`result: `, ret)
    return ret
  }
  catch (e) {
    logFailure(`execCmd: `, e)
  }
  finally {
    await close()
  }
}

const createRole = async (roleName) => {
  await execCmd({
    createRole: roleName,
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

const dropRole = async (roleName) => {
  await execCmd({
    dropRole: roleName,
  })
}

const listUserDefinedRoles = async () => {
  return await execCmd({ rolesInfo: 1, showBuiltinRoles: 0, showPrivileges: true })
}

const dropAllUserDefinedRoles = async () => {
  const ret = await listUserDefinedRoles()
  ret.roles.forEach(async r => {
    await dropRole(r.role)
  })
}



listUserDefinedRoles()
// dropAllUserDefinedRoles()
// createRole('todoTestUser')


// dbCommand(createRole, { name: 'test4' })
// dbCommand(dropRole, { roleName: 'test4' })


// const dbCommand = async (fn, params) => {
//   try {
//     const { db } = await connectDB()
//     const admin = db.admin()
//     const ret = await fn(admin, params)
//     console.log('dbCommand: ret: ', ret)
//     return ret
    
//   }
//   catch (e) {
//     console.log('dbCommand: ', e)
//   }
//   finally {
//     await close()
//   }
// }

// dbCommand(getRoles)

// dropUserDefindRoles()
// dbCommand(ex())

// ex()
// tryIt()
// createRole()
// createUser()




// const callIt = async () => {
//   await dropRole('myClusterwideAdmin')
//   await dropRole('myClusterwideAdmin1')
// }
// callIt()

// const ex = async () => {
//   try {
//     const { db } = await connectDB()
//     const admin = db.admin()
//     const ret = await admin.command({
//       createRole: 'test6',
//       privileges: [
//         {
//           resource: { db: dbName, collection: '' },
//           actions: ['find', 'insert', 'remove', 'update']
//         }
//       ],
//       roles: [],
//       writeConcern: { w: 'majority', wtimeout: 5000 }
//     })
//     logSuccess('ex: ret', ret)
//     printRoles()
//   }
//   catch (e) {
//     logFailure('ex: ', e);
    
//   }
//   finally {
//     await close()
//   }
// }

// const tryIt = async () => {
//   const { db } = await connectDB()
//   const admin = db.admin()
//   admin.command({
//     createRole: roleName,
//     privileges: [
//       {
//         resource: { db: "", collection: "" },
//         actions: ['find', 'insert', 'remove', 'update'],
//         roles: []
//       }
//     ]
//   })
// }