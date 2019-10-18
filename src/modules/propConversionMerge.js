import toProps from './toProps'

const propConversionMerge = (_obj, [, /* key */ val]) => Object.assign(_obj, { ...toProps(val) })

export default propConversionMerge
