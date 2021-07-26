# SSB Box2

Basic helper functions implementing the [private-group] spec.

Currently supports classic & bendy butt feed types.

## API

### new SecretKey(length?)

Create a secret key that can be used for the group or message key.

### directMessageKey.easy(keys)

Create a diffie-hellman shared key for another feedId


This library was extracted from [ssb-tribes].

[private-group]: https://github.com/ssbc/private-group-spec
[ssb-tribes]: https://github.com/mixmix/ssb-tribes
