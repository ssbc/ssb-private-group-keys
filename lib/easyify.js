const bfe = require('ssb-bfe')
const DHKeys = require('./dh-keys')

module.exports = function easyify (keyFn) {
  return function makeEasy (ssbKeys) {
    const my = {
      dh: new DHKeys(ssbKeys, { fromEd25519: true }).toBFE(),
      feedId: bfe.encode(ssbKeys.id)
    }

    return function makeKey (feedId) {
      const dotIndex = feedId.indexOf('.')
      const keys = {
        public: feedId.substring(1, dotIndex > 0 ? dotIndex : feedId.length)
        // prunes the @ + suffix
      }

      const your = {
        dh: new DHKeys(keys, { fromEd25519: true }).toBFE(),
        feedId: bfe.encode(feedId)
      }

      return keyFn(
        my.dh.secret, my.dh.public, my.feedId,
        your.dh.public, your.feedId
      )
    }
  }
}
