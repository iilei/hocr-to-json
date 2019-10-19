// only double quotes - see https://github.com/kba/hocr-spec/blob/master/1.2/spec.md - delimited-string

const quotationMarks = [/^"/, /"$/]

const unQuote = val => val.replace(quotationMarks[0], '').replace(quotationMarks[1], '')

export default unQuote
