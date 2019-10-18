const dropProp = (_obj = {}, [key]) => {
  if (Object.prototype.hasOwnProperty.call(_obj, key)) {
    delete _obj[key]
  }
}

export default dropProp
