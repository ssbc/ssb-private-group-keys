const { isFeed: isClassicFeed } = require('ssb-ref')
const { toFeedSigil } = require('ssb-uri2')
const bfe = require('ssb-bfe')

const DHKeys = require('../diffie-hellman-keys')
const isPOBox = require('./is-po-box')

module.exports = function easyify (keyFn) {
  return function makeEasy (ssbKeys) {
    const x = {
      dh: new DHKeys(ssbKeys, { fromEd25519: true }).toBFE(),
      id: bfe.encode(ssbKeys.id)
    }

    return function makeKey (id) {
      let y
      if (isFeed(id)) {
        // HACK 2022-07-14 (mix)
        //
        // PROBLEM bfe.encode(id) fails when id = ssb:feed/ed25519/...
        //
        // REASON bfe.encode relies on `ssb-uri2` to decompose the string into
        // { type, format, data } but *unforunately* `ssb-uri2` then ALSO validates
        // the type, format according to definitons which conflict with ssb-bfe-spec
        //
        // SOLUTION (hack) side-step into sigil form, which works fine...
        if (id.startsWith('ssb:feed/ed25519')) id = toFeedSigil(id)

        const bfeId = bfe.encode(id)
        const keys = {
          public: bfeId.slice(2).toString('base64')
          // secret: undefined
        }
        y = {
          dh: new DHKeys(keys, { fromEd25519: true }).toBFE(),
          id: bfeId
        }
      } else if (isPOBox(id)) {
        const poBox = bfe.encode(id)
        y = {
          dh: {
            public: Buffer.concat([
              Buffer.from([3, 1]),
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

function isFeed (id) {
  return isClassicFeed(id) || id.startsWith('ssb:feed/')
}
