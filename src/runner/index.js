import fs from 'fs'

import { transform } from 'camaro'

const xml = fs.readFileSync('stub/phototest.hocr', 'utf-8')
const seperator = /\s+/

const template = {
  ocrSystem: '/html/head/meta[@name="ocr-system"]/@content',
  pages: [
    '//div[@class="ocr_page"]',
    {
      id: './@id',
      image: `substring-before(substring-after(./@title, 'image "'), '"; bbox ')`,
      bbox: 'substring-before(substring-after(./@title, "; bbox "), "; ppageno ")',
      ppageno: 'number(substring-after(./@title, "; ppageno " ))',
      careas: [
        './div[@class="ocr_carea"]',
        {
          id: './@id',
          bbox: 'substring-after(./@title, "bbox ")',
          pars: [
            './p[@class="ocr_par"]',
            {
              id: './@id',
              lang: './attribute::lang',
              lines: [
                './span[@class="ocr_line"]',
                {
                  id: './@id',
                  bbox: 'substring-before(substring-after(./@title, "bbox "), "; baseline ")',
                  // bbox 36 92 580 122; baseline 0 -6; x_size 30; x_descenders 6; x_ascenders 6
                  baseline: 'substring-before(substring-after(./@title, "baseline "), "; x_size ")',
                  xSize:
                    'number(substring-before(substring-after(./@title, "x_size "), "; x_descenders "))',
                  xDescenders:
                    'number(substring-before(substring-after(./@title, "x_descenders "), "; x_ascenders "))',
                  xAscenders: 'number(substring-after(./@title, "; x_ascenders " ))',
                  words: [
                    './span[@class="ocrx_word"]',
                    {
                      id: './@id',
                      bbox: 'substring-before(substring-after(./@title, "bbox "), "; x_wconf ")',
                      confidence: 'number(substring-after(./@title, "; x_wconf " ))',
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

const castToIntArray = str =>
  str
    .trim()
    .split(seperator)
    .map(val => parseInt(val, 10) || 0)
const castBBox = str => {
  const [x0, y0, x1, y1] = castToIntArray(str)
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
      // eslint-disable-next-line no-param-reassign
      obj[key] = castBBox(val)
    }
  })
}

const traverseBaseLines = obj => {
  const castables = ['baseline']
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      traverseBaseLines(val)
    } else if (castables.includes(key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = castToIntArray(val)
    }
  })
}

const runner = async () => {
  const result = await transform(xml, template)
  traverseBBoxes(result)
  traverseBaseLines(result)

  return result
}

export default runner
