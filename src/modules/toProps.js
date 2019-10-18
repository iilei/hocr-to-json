import { camelCase } from 'change-case'

import flatten from './flatten'

const firstSpaceSeperated = /(?<=^\s?\S+)\s/

const toProps = raw => {
  return raw
    .split(';')
    .map(attr => {
      const [key, val] = attr.split(firstSpaceSeperated)
      return { [camelCase(key.trim())]: val }
    })
    .reduce(flatten, {})
}

export default toProps
