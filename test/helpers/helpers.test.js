import { expect } from 'chai'
import { isValidHexId } from 'db/helpers'

const validHexString = '5ce819935e539c343f141ece'

describe('db/helpers.js', function() {
  describe('test getObjectId', function() {
    it('valid hex id should return true', function() {
      expect(isValidHexId(validHexString)).to.equal(true)
    })
    it('number should return false', function() {
      expect(isValidHexId(123)).to.equal(false)
    })
    it('string should return false', function() {
      expect(isValidHexId('astringof12c')).to.equal(false)
      expect(isValidHexId('astringof24castringof24c')).to.equal(false)
    })
  })

})