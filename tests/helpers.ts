import { RuleTester } from 'eslint'

RuleTester.it = (text, method) => test('Valid/Invalid test', method)

const ruleTester = new RuleTester()

export const runTest = (ruleName: string, tests) => {
  const rule = require(`../src/rules/${ruleName}`)

  describe(ruleName, () => {
    it('Should exist', () => {
      expect(rule.meta).toBeTruthy()
      expect(rule.meta.docs).toBeTruthy()
      expect(rule.meta.docs.description).toBeTruthy()
      expect(rule.create).toBeTruthy()
    })

    ruleTester.run(ruleName, rule, tests)
  })
}

export const validFactory = (name: string, head = `function validFactory()`, tail = `end function`) => (source) => ({
  code: `${head}\n${source}\n${tail}`,
  filename: `${name}.brs`,
  options: [],
  parser: '@roku-road/eslint-plugin-rules'
})

export const invalidFactory = (name: string, head = `function invalidFactory()`, tail = `end function`) => (
  [ source, errors ]
) => ({
  code: `${head}\n${source}\n${tail}`,
  errors,
  filename: `${name}.brs`,
  options: [],
  parser: '@roku-road/eslint-plugin-rules'
})

describe('Helpers', () => {
  it('Should provide factories', () => {
    expect(validFactory).toBeTruthy()
    expect(invalidFactory).toBeTruthy()

    expect(validFactory('helpers')('')).toEqual({
      code: 'function validFactory()\n\nend function',
      filename: 'helpers.brs',
      options: [],
      parser: '@roku-road/eslint-plugin-rules'
    })

    expect(invalidFactory('helpers')([ '', [] ])).toEqual({
      code: 'function invalidFactory()\n\nend function',
      errors: [],
      filename: 'helpers.brs',
      options: [],
      parser: '@roku-road/eslint-plugin-rules'
    })
  })
})
