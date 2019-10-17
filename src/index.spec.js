const origArgv = [...process.argv]

describe('index', () => {
  jest.doMock('./runner', jest.fn(() => jest.fn()))

  beforeEach(() => {
    jest.resetModules()
  })

  afterEach(() => {
    global.process.argv = origArgv
  })

  describe('index', () => {
    it('should initialize yargs with appropriate default arguments', () => {
      const runner = require('./runner')
      require('./index')
      expect(runner.mock.calls[0]).toEqual(['hocr-json', '*.hocr'])
    })
  })
})
