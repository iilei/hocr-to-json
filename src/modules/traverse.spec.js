import traverse from './traverse'

describe('traverse', () => {
  it('should manipulate an   on its leafs', async () => {
    const input = {
      c: { b: { c: 'foo' } },
      b: [{ c: 'hu' }, { x: { a: [{ h: 'hey', o: 'ho' }] } }],
    }
    const expectation = {
      b: [{ c: 'HU' }, { x: { a: [{ h: 'hey', o: 'HO' }] } }],
      c: { b: { c: 'FOO' } },
    }
    expect(traverse(input, str => str.toUpperCase(), 'o', 'c')).toEqual(expectation)
  })
})
