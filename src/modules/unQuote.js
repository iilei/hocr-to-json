const quotationMarks = [/^"|'/, /"|'$/]

const unQuote = val => val.replace(quotationMarks[0], '').replace(quotationMarks[1], '')

export default unQuote
