# ssb-private-group-keys

Basic helper functions implementing the [private-group] spec.

Currently supports classic & bendy butt feed types.

## API

### `new SecretKey(length?) => secretKey`

Create a secret key that can be used for the group or message key.

methods:
- `secretKey.toBuffer() => buffer` return raw buffer with the key data in it
- `secretKey.toString() => string` returns a `base64` encoded string of the key


### `directMessageKey(x_dh_secret, x_dh_public, x_feed_id, y_dh_public, y_feed_id) => { key, scheme }`

Create a shared key for communication between your feed and _another_ feed.

If you are _encrypting_ a DM, `x` is your feed, and `y` is the person you are DM'ing.
If you are _decrypting_ a DM, `x` is your feed, and `y` is the message author's.
  - NOTE: this is only for the case that the author is someone else, if you're the author, use your `own_key`

- `x_dh_secret`, `x_dh_public` are feed x's diffie-hellman keys
- `x_feed_id` is the feedId of `x`
- `y_dh_public` is feed y's diffie-hellman public key
- `y_feed_id` is the feedId of `y`

All inputs are [BFE] style buffers.

The output is a `key` (buffer) and associated `scheme` (string) which can be passed into an envelope `key_slot`

### `directMessageKey.easy(myKeys) => makeKey(feedId) => { key, scheme }`

Convenience function which wraps `directMessageKey`


## History

This library was originally extracted from [ssb-tribes].

[private-group]: https://github.com/ssbc/private-group-spec
[ssb-tribes]: https://github.com/mixmix/ssb-tribes
[BFE]: https://github.com/ssb-ngi-pointer/ssb-binary-field-encodings-spec

