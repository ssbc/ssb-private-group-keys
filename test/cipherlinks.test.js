// bfe is a superset of TFK

const test = require('tape')
const { isMsg, isFeedId } = require('ssb-ref')
const bfe = require('ssb-bfe')

test('Cipherlink/FeedId', t => {
  const feedId = '@YXkE3TikkY4GFMX3lzXUllRkNTbj5E+604AkaO1xbz8=.ed25519'

  const expected = Buffer.concat([
    Buffer.from([0]), // type = feed
    Buffer.from([0]), // format = ssb/classic
    Buffer.from('YXkE3TikkY4GFMX3lzXUllRkNTbj5E+604AkaO1xbz8=', 'base64')
  ])

  t.deepEqual(bfe.encode(feedId), expected, 'toTFK')
  t.deepEqual(bfe.decode(bfe.encode(feedId)), feedId, 'toSSB')

  t.end()
})

test('Cipherlink/MsgId', t => {
  const msgId = '%onDYxSjsIb4d3KhgHC7g5wdHLWw/7zygIBvZEx7v6KU=.sha256'

  const expected = Buffer.concat([
    Buffer.from([1]), // type = msg
    Buffer.from([0]), // format = ssb/classic
    Buffer.from('onDYxSjsIb4d3KhgHC7g5wdHLWw/7zygIBvZEx7v6KU=', 'base64')
  ])

  t.deepEqual(bfe.encode(msgId), expected, 'toTFK')
  t.deepEqual(bfe.decode(bfe.encode(msgId)), msgId, 'toSSB')

  t.end()
})
