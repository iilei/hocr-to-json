import semver from 'semver'
import constants from '../constants'

const {
  defaultView: { engine: defaultEngine, version: defaultVersion },
} = constants

const toRange = tag => `^${semver.coerce(tag)}`

/**
 * @param {Object} views views
 * @param {String} engine e.g tesseract
 * @param {String} version e.g 4.1.0-rc1
 * @returns {Object} view View
 */
const bestMatch = (views, engine, version) => {
  // utilizes https://www.npmjs.com/package/semver to get best matching version
  //   e.g. views.tesseract['4.1.0-rc1'] based on
  //   <meta name='ocr-system' content='tesseract 4.1.0-rc1-752-g8b69' />
  //   https://jubianchi.github.io/semver-check/#/^4.1.0-rc1/4.1.0-rc1-752-g8b69

  const matchingVersion =
    semver.maxSatisfying(Object.keys(views[engine]), toRange(version)) || defaultVersion
  const useVersion = matchingVersion === null ? defaultVersion : matchingVersion

  return views[defaultEngine][useVersion]
}

export default bestMatch
