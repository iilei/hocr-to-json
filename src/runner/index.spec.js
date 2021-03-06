import fs from 'fs'

import runner from './index'

const defautArgs = ['hocr-json', '*.hocr']

describe('runner', () => {
  it('should invoke the desired task with defaults', async () => {
    await runner(...defautArgs)
    expect(fs.readFileSync('stub/phototest.json', 'utf-8')).toMatchSnapshot()

    // const taskMock = require('../tasks').myTask
    // const { appendBasePath, setAuthToken } = require('../modules/axiosInstance')
    // const runner = require('./index').default
    //
    // await runner('myTask', '/foo')
    //
    // expect(setAuthToken.mock.calls[0][0]).toBe('JWT')
    // expect(appendBasePath.mock.calls[0][0]).toBe('/projects/xyz/')
    // expect(taskMock.mock.calls[0][0]).toEqual(
    //   expect.objectContaining({
    //     'client-id': 'test',
    //     'pull-to': '/abs-path/foo/intl/pull/<locale>.<hash:6>.json',
    //   }),
    // )
  })
})
