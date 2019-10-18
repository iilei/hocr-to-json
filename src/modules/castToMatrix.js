import castToArrayOfNumbers from './castToArrayOfNumbers'

const castToMatrix = str => {
  const [x0, y0, x1, y1] = castToArrayOfNumbers(str)
  // height = y1-y0
  // width = x1-x0
  return [[x0, y0], [x1, y1]]
}

export default castToMatrix
