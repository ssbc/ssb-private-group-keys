const { isFeedType } = require('ssb-ref')
const bfe = require('ssb-bfe')

const DHKeys = require('./dh-keys')
const isPOBox = require('./is-po-box')

module.exports = function easyify (keyFn) {
  return function makeEasy (ssbKeys) {
    // TODO modify to be able to take POBox keys? (not just ssbKeys)
    const x = {
      dh: new DHKeys(ssbKeys, { fromEd25519: true }).toBFE(),
      id: bfe.encode(ssbKeys.id)
    }

    return function makeKey (id) {
      let y
      if (isFeedType(id)) {
        const dotIndex = id.indexOf('.')
        const keys = {
          public: id.substring(1, dotIndex > 0 ? dotIndex : id.length)
          // prunes the @ + suffix
        }
        y = {
          dh: new DHKeys(keys, { fromEd25519: true }).toBFE(),
          id: bfe.encode(id)
        }
      } else if (isPOBox(id)) {
        const poBox = bfe.encode(id)
        y = {
          dh: {
            public: Buffer.concat([
              Buffer.from([3, 0]), // TODO change to 3,1 ?
              poBox.slice(2)
            ])
          },
          id: poBox
        }
      } else throw new Error('unknown key type: ' + id)

      return keyFn(
        x.dh.secret, x.dh.public, x.id,
        y.dh.public, y.id
      )
    }
  }
}
