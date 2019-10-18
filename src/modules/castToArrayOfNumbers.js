import parseFloatOrNull from './parseFloatOrNull'

const seperator = /\s+/

const castToArrayOfNumbers = str =>
  str
    .trim()
    .split(seperator)
    .map(parseFloatOrNull)

export default castToArrayOfNumbers
