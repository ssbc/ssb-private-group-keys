const crypto = require('crypto')
const DHKeys = require('./dh-keys')
const easyify = require('./easyify')

module.exports = {
  DHKeys,
  SHA256 (input) {
    const hash = crypto.createHash('sha256')

    hash.update(input)
    return hash.digest()
  },
  easyify
}
