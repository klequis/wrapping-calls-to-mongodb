import { ObjectID } from 'mongodb'
import { omit } from 'ramda'
import { yellow } from 'logger'

const checkForHexString = new RegExp('^[0-9a-fA-F]{24}$');

export const getObjectId = async id => {
  if (isValid) {
    const objId = ObjectID.createFromHexString(hexId)
    return objId
  } else {
    throw new Error('this is an error')
  }
}

export const removeIdProp = obj => {
  return omit(['_id'], obj)
}

const isValid = id => {
  console.log('isValid', ObjectID.isValid(id))
}

export const ObjectIdToHexString = id => {
  if (isValid(id)) {
    return new ObjectId(id).ObjectIdToHexString()
  }
}

const tryIt = id => {
  try {
    const a = ObjectID.createFromHexString(id)
  } catch (e) {
    throw e
  }
}

// tryIt('abc')



export const isValidHexIdString = id => {
  let _id = ''
  try {
    if (!id) {
      return false
    } else {
      typeof id !== 'string' ? (_id = id.toString()) : (_id = id)
    }
    return checkForHexString.test(_id)
  } catch (e) {
    red(e)
    return false
  }
}