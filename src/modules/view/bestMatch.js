import semver from 'semver'
import { sortBy as _sortBy } from 'lodash'
import { constants } from '..'

const {
  defaultView: { engine: defaultEngine, version: defaultVersion },
} = constants

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
  const matching = Object.entries(views[engine] || {}).filter(([key]) =>
    semver.satisfies(version, key),
  )
  if (matching.length) {
    // TODO add tests for the following line, ensuring
    //    that for version '1.2.3' on a collection of views including
    //    {'1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3': <mock>}, <mock> is returned
    return Object.values(_sortBy(matching, [arr => arr[0]]).pop())[0]
  }
  return views[defaultEngine][defaultVersion]
}

export default bestMatch
