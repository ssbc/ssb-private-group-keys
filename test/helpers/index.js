const ssbKeys = require('ssb-keys')
const DHFeedKeys = require('./dh-feed-keys')
const encodeLeaves = require('./encode-leaves')
const decodeLeaves = require('./decode-leaves')
const print = require('./print')

module.exports = {
  ssbKeys,
  bbKeys: {
    generate () {
      const keys = ssbKeys.generate()
      keys.id = keys.id.replace('ed25519', 'bbfeed-v1')
      return keys
    }
  },
  DHFeedKeys,
  encodeLeaves,
  decodeLeaves,
  print
}
