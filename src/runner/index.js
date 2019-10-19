import fs from 'fs'
import JSONstringify from 'json-stable-stringify'
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
} from '../modules'
import { bestMatch } from '../modules/view'

import * as views from '../views'

const xml = fs.readFileSync('stub/phototest.hocr', 'utf-8')

const { numberProps, seperator } = constants

const runner = async () => {
  // 2-Step process; first metadata, then decide which _meta to apply
  const meta = await transform(xml, views._meta)

  const [engine, version] = meta.ocrSystem.split(seperator)

  const view = bestMatch(views, engine, version)

  const body = await transform(xml, view)

  const result = { ...meta, ...body }
  traverseFactory(result, propConversionMerge, 'title')
  traverseFactory(result, dropProp, 'title')
  traverse(result, castToMatrix, 'bbox')
  traverse(result, castToArrayOfNumbers, 'baseline')
  traverse(result, unQuote, 'image')
  traverse(result, parseFloatOrNull, ...numberProps)

  fs.writeFileSync('stub/phototest.json', JSONstringify(result, { space: '  ' }), {
    encoding: 'utf-8',
  })

  return result
}

export default runner
