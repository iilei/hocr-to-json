import fs from 'fs'

import { transform } from 'camaro'
import { camelCase } from 'change-case'
import traverse, { traverseFactory } from '../modules/traverse'

const xml = fs.readFileSync('stub/phototest.hocr', 'utf-8')
const seperator = /\s+/
const firstSpaceSeperated = /(?<=^\s?\S+)\s/
const quotationMarks = [/^"|'/, /"|'$/]
const numberProps = ['x_size', 'x_descenders', 'x_ascenders', 'x_wconf', 'ppageno'].map(val =>
  camelCase(val),
)

const template = {
  ocrSystem: '/html/head/meta[@name="ocr-system"]/@content',
  pages: [
    '//div[@class="ocr_page"]',
    {
      id: './@id',
      title: './@title',
      careas: [
        './div[@class="ocr_carea"]',
        {
          id: './@id',
          title: './@title',
          pars: [
            './p[@class="ocr_par"]',
            {
              id: './@id',
              lang: './attribute::lang',
              lines: [
                './span[@class="ocr_line"]',
                {
                  id: './@id',
                  title: './@title',
                  words: [
                    './span[@class="ocrx_word"]',
                    {
                      id: './@id',
                      title: './@title',
                      content: './text()',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const castToArrayOfNumbers = str =>
  str
    .trim()
    .split(seperator)
    .map(val => parseFloat(val) || 0)

const castBBox = str => {
  const [x0, y0, x1, y1] = castToArrayOfNumbers(str)
  // height = y1-y0
  // width = x1-x0
  return [[x0, y0], [x1, y1]]
}

const parseFloatOrNull = val => parseFloat(val) || 0
const flatten = (acc, cur) => ({ ...cur, ...acc })

const toProps = raw => {
  return raw
    .split(';')
    .map(attr => {
      const [key, val] = attr.split(firstSpaceSeperated)
      return { [camelCase(key.trim())]: val }
    })
    .reduce(flatten, {})
}

const propConversionMerge = (_obj, [, val]) => Object.assign(_obj, { ...toProps(val) })

const unQuote = val => val.replace(quotationMarks[0], '').replace(quotationMarks[1], '')

const runner = async () => {
  const result = await transform(xml, template)
  traverseFactory(result, propConversionMerge, 'title')
  traverse(result, castBBox, 'bbox')
  traverse(result, castToArrayOfNumbers, 'baseline')
  traverse(result, unQuote, 'image')
  traverse(result, parseFloatOrNull, ...numberProps)
  return result
}

export default runner
