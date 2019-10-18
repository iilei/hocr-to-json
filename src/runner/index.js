import fs from 'fs'
import JSONstringify from 'json-stable-stringify';

import { transform } from 'camaro'
import {
  castToArrayOfNumbers,
  castToMatrix,
  constants,
  dropProp,
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
  traverseFactory(result, dropProp, 'title')
  traverse(result, castToMatrix, 'bbox')
  traverse(result, castToArrayOfNumbers, 'baseline')
  traverse(result, unQuote, 'image')
  traverse(result, parseFloatOrNull, ...numberProps)

  fs.writeFileSync('stub/phototest.json', JSONstringify(result, { space: '  ' }), {encoding: 'utf-8'})

  return result
}

export default runner
