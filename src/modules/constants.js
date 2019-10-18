import { camelCase } from 'change-case'

const numberProps = ['x_size', 'x_descenders', 'x_ascenders', 'x_wconf', 'ppageno'].map(val =>
  camelCase(val),
)

export default {
  numberProps,
}
