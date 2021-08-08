# ssb-private-group-keys

Basic helper functions implementing the [private-group] spec.

Currently supports classic & bendy butt feed types.

## API

### `new SecretKey(length?) => secretKey`

Create a secret key that can be used for the group or message key.

methods:
- `secretKey.toBuffer() => buffer` return raw buffer with the key data in it
- `secretKey.toString() => string` returns a `base64` encoded string of the key


### `directMessageKey(x_dh_secret, x_dh_public, x_feed, y_dh_public, y_feed) => dmKey`

Create a shared key that can be used between _two different feeds_.

Assuming a direct message is being sent between feed "x" and feed "y", a shared DM key is derived where:
- `x_dh_secret`, `x_dh_public` are feed x's diffie-hellman keys
- `x_feed` is the feedId of x in BFE format
- `y_dh_public` is feed y's diffie-hellman public key
- `y_feed` is the feedId of y in BFE format

All inputs are BFE encoded buffers.
The output `dmKey` is a plain buffer.

### `directMessageKey.easy(myKeys) => sharedKey(feedId) => dmKey`

Convenience function which wraps `directMessageKey`
Creates a diffie-hellman shared key between you and another feedId.


## History

This library was extracted from [ssb-tribes].

[private-group]: https://github.com/ssbc/private-group-spec
[ssb-tribes]: https://github.com/mixmix/ssb-tribes
