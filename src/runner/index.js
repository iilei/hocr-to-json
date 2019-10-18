import fs from 'fs'

import { transform } from 'camaro'
import { camelCase } from 'change-case'

const xml = fs.readFileSync('stub/phototest.hocr', 'utf-8')
const seperator = /\s+/
const firstSpaceSeperated = /(?<=^\s?\S+)\s/
const quotationMarks = [/^"|'/, /"|'$/]

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

const traverseBBoxes = obj => {
  const castables = ['bbox']
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      traverseBBoxes(val)
    } else if (castables.includes(key)) {
      Object.assign(obj, { [key]: castBBox(val) })
    }
  })
}

const traverseBaseLines = obj => {
  const castables = ['baseline']
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      traverseBaseLines(val)
    } else if (castables.includes(key)) {
      Object.assign(obj, { [key]: castToArrayOfNumbers(val) })
    }
  })
}

const traverseImages = obj => {
  const castables = ['image']
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      traverseImages(val)
    } else if (castables.includes(key)) {
      Object.assign(obj, {
        [key]: val.replace(quotationMarks[0], '').replace(quotationMarks[1], ''),
      })
    }
  })
}

const traverseNumbers = obj => {
  const castables = ['x_size', 'x_descenders', 'x_ascenders', 'x_wconf', 'ppageno'].map(val =>
    camelCase(val),
  )
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      traverseNumbers(val)
    } else if (castables.includes(key)) {
      Object.assign(obj, { [key]: parseFloat(val) || 0 })
    }
  })
}

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

const traverseTitles = obj => {
  const castables = ['title']
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      traverseTitles(val)
    } else if (castables.includes(key)) {
      Object.assign(obj, toProps(val))
    }
  })
}

const runner = async () => {
  const result = await transform(xml, template)
  traverseTitles(result)
  traverseBBoxes(result)
  traverseBaseLines(result)
  traverseImages(result)
  traverseNumbers(result)

  // TODO getAllCAreas / paras / lines -- and then format markdownish => assign to result.@raw

  return result
}

export default runner
