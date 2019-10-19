import { camelCase } from 'change-case'
import seperator from './seperator'

const numberProps = ['x_size', 'x_descenders', 'x_ascenders', 'x_wconf', 'ppageno'].map(val =>
  camelCase(val),
)

// TODO make this configurable
const defaultView = 'tesseract/4.1.0-rc1'

const [engine, version] = defaultView.split('/')

export default {
  numberProps,
  seperator,
  defaultView: { engine, version },
}
