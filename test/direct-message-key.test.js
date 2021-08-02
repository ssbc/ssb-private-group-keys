/* eslint-disable camelcase */

const test = require('tape')
const ssbKeys = require('ssb-keys')
const bbKeys = {
  generate () {
    const keys = ssbKeys.generate()
    keys.id = keys.id.replace('ed25519', 'bbfeed-v1')
    return keys
  }
}

const vectors = [
  require('private-group-spec/vectors/direct-message-key1.json')
]

const { decodeLeaves, DHFeedKeys } = require('./helpers')
const directMessageKey = require('../direct-message-key')

test('direct-message-key', t => {
  /* local tests */
  const mySSBKeys = ssbKeys.generate()
  const my = DHFeedKeys(mySSBKeys)

  const yourSSBKeys = ssbKeys.generate()
  const your = DHFeedKeys(yourSSBKeys)
  // directMessageKey (my_dh_secret, my_dh_public, your_dh_public, my_feed_id, your_feed_id) {

  /* general checks */
  t.deepEqual(
    directMessageKey(my.dh.secret, my.dh.public, my.feedId, your.dh.public, your.feedId),
    directMessageKey(your.dh.secret, your.dh.public, your.feedId, my.dh.public, my.feedId),
    'the key is shared!'
  )

  t.isNotDeepEqual(
    directMessageKey(my.dh.secret, my.dh.public, my.feedId, your.dh.public, your.feedId),
    Buffer.alloc(32),
    'is not empty'
  )

  t.deepEqual(
    directMessageKey.easy(mySSBKeys)(yourSSBKeys.id),
    directMessageKey(my.dh.secret, my.dh.public, my.feedId, your.dh.public, your.feedId),
    'DirectMessageKey.easy produces same result (classic)'
  )

  const bendyKeys = bbKeys.generate()
  const bendy = DHFeedKeys(bendyKeys)

  t.deepEqual(
    directMessageKey.easy(mySSBKeys)(bendyKeys.id),
    directMessageKey(my.dh.secret, my.dh.public, my.feedId, bendy.dh.public, bendy.feedId),
    'DirectMessageKey.easy produces same result (bendy butt)'
  )

  /* test vectors we've imported */
  vectors.forEach(vector => {
    decodeLeaves(vector)

    const { my_dh_secret, my_dh_public, my_feed_id, your_dh_public, your_feed_id } = vector.input

    const sharedKey = directMessageKey(
      my_dh_secret, my_dh_public, my_feed_id,
      your_dh_public, your_feed_id
    )

    t.deepEqual(
      sharedKey,
      vector.output.shared_key,
      vector.description
    )
  })

  t.end()
})
