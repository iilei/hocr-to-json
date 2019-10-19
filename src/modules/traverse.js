const traverseFactory = (obj, operation, ...cast) => {
  const result = { ...obj }

  const traverseFunc = _obj => {
    Object.entries(_obj).forEach(([key, val]) => {
      if (val && typeof val === 'object') {
        traverseFunc(val)
      } else if (cast.includes(key)) {
        operation(_obj, [key, val])
      }
    })
  }
  traverseFunc(result)

  Object.assign(obj, result)

  return result
}

export { traverseFactory }

const traverse = (obj, lambda, ...cast) => {
  const operation = (_obj, [_key, _val]) => Object.assign(_obj, { [_key]: lambda(_val) })

  return traverseFactory(obj, operation, ...cast)
}

export default traverse
