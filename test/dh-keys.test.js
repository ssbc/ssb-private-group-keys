const test = require('tape')
const na = require('sodium-native')
const ssbKeys = require('ssb-keys')

const Keys = require('../dh-keys')

function scalarMult (a, b) {
  const result = Buffer.alloc(na.crypto_scalarmult_BYTES)
  na.crypto_scalarmult(result, a.secret, b.public)
  return result
}

test('dh-keys', t => {
  /* can make dh-keys */
  const a = new Keys().toBuffer()
  const b = new Keys().toBuffer()
  t.deepEqual(scalarMult(a, b), scalarMult(b, a), 'can generate random DH keys')

  /* can map classic ed25519 > dh-keys */
  const classicKeys = ssbKeys.generate()
  const x = new Keys(classicKeys, { fromEd25519: true }).toBuffer()
  t.deepEqual(scalarMult(a, x), scalarMult(x, a), 'can generate DH keys from classic ed25519 keys')

  const publicOnly = { public: classicKeys.public }
  const y = new Keys(publicOnly, { fromEd25519: true })

  t.deepEqual(Keys.scalarMult(a, y), scalarMult(x, a), 'DHKeys.scalarMult works')

  t.end()
})
