import parseFloatOrNull from './parseFloatOrNull'
import seperator from './seperator'

const castToArrayOfNumbers = str =>
  str
    .trim()
    .split(seperator)
    .map(parseFloatOrNull)

export default castToArrayOfNumbers
