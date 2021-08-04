const bfe = require('ssb-bfe')

// TODO find a good home for this
module.exports = function isPOBox (id) {
  // NOTE ssb-uri cannot use is-canonical-base64 because of substitutions!
  try {
    return bfe.encode(id)
      .slice(0, 2)
      .equals(POBOX_TF)
  } catch (err) {
    return false
  }
}

const toTF = (type, format) => Buffer.from([
  bfe.bfeNamedTypes[type].code,
  bfe.bfeNamedTypes[type].formats[format].code
])
const POBOX_TF = toTF('identity', 'po-box')
