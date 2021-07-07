const test = require('tape')
const ssbKeys = require('ssb-keys')
const FeedKeys = require('../feed-keys')

test('FeedKeys', t => {
  const keys = ssbKeys.generate()

  const pkBuff = Buffer.from(keys.public.replace('.ed25519', ''), 'base64')
  const skBuff = Buffer.from(keys.private.replace('.ed25519', ''), 'base64')

  t.deepEqual(
    new FeedKeys(keys).toBuffer(),
    { public: pkBuff, private: skBuff, secret: skBuff }
  )

  const bendyKeys = ssbKeys.generate()
  bendyKeys.public = bendyKeys.id = bendyKeys.id.replace('ed25519', 'bbfeed-v1')

  const bendyPKBuff = Buffer.from(bendyKeys.public.replace('.ed25519', ''), 'base64')
  const bendySKBuff = Buffer.from(bendyKeys.private.replace('.ed25519', ''), 'base64')

  t.deepEqual(
    new FeedKeys(bendyKeys).toBuffer(),
    { public: bendyPKBuff, private: bendySKBuff, secret: bendySKBuff }
  )

  t.end()
})
