const bfe = require('ssb-bfe')
const DHKeys = require('../../diffie-hellman-keys')

module.exports = function DHPOBoxKeys (keys) {
  keys = keys || new DHKeys().generate()
  const id = Buffer.concat([
    Buffer.from([7, 0]), // type: identity, format: po-box
    keys.pk
  ])

  return {
    dh: keys.toBFE(),
    id,
    stringId: bfe.decode(id)
  }
}
