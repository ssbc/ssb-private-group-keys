const { generate } = require('ssb-keys')

const bfe = require('ssb-bfe')
const DHKeys = require('../../dh-keys')
const FeedKeys = require('../../feed-keys')

module.exports = function DHFeedKeys (keys) {
  const ssbKeys = keys || generate()

  const feedKeys = new FeedKeys(ssbKeys).toBuffer()

  return {
    dh: new DHKeys(feedKeys).toTFD(),
    feedId: bfe.encode(ssbKeys.id),
    sigilFeedId: ssbKeys.id
  }
}
