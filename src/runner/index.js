import fs from 'fs'

import { transform } from 'camaro'
import {
  castToArrayOfNumbers,
  castToMatrix,
  constants,
  parseFloatOrNull,
  propConversionMerge,
  traverse,
  traverseFactory,
  unQuote,
  xpathView,
} from '../modules'

const xml = fs.readFileSync('stub/phototest.hocr', 'utf-8')

const { numberProps } = constants

const runner = async () => {
  const result = await transform(xml, xpathView)
  traverseFactory(result, propConversionMerge, 'title')
  traverse(result, castToMatrix, 'bbox')
  traverse(result, castToArrayOfNumbers, 'baseline')
  traverse(result, unQuote, 'image')
  traverse(result, parseFloatOrNull, ...numberProps)
  return result
}

export default runner
