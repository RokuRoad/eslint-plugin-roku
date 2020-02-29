import { RuleTester } from 'eslint'
import { join, resolve } from 'path'

// mock out the config validator because we want to test with inlineDisable option
jest.mock('../node_modules/eslint/lib/config/config-validator', () => {
  return {
    // copied from source
    getRuleOptionsSchema: rule => {
      if (!rule) {
        return null
      }
      const schema = rule.schema || (rule.meta && rule.meta.schema)
      if (Array.isArray(schema)) {
        if (schema.length) {
          return {
            type: 'array',
            items: schema,
            minItems: 0,
            maxItems: schema.length,
          }
        }
        return {
          type: 'array',
          minItems: 0,
          maxItems: 0,
        }
      }
      return schema || null
    },
    // noop
    validate: () => undefined,
  }
})
const ruleTester = new RuleTester({
  allowInlineConfig: true,
})

const parser = resolve(join(__dirname, '../src'))

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

export const validFactory = (
  name: string,
  head = `function validFactory()`,
  tail = `end function`
) => source => ({
  code: `${head}\n${source}\n${tail}`,
  filename: `${name}.brs`,
  options: [],
  parser,
})

export const invalidFactory = (
  name: string,
  head = `function invalidFactory()`,
  tail = `end function`
) => ([source, errors]) => ({
  code: `${head}\n${source}\n${tail}`,
  errors,
  filename: `${name}.brs`,
  options: [],
  parser,
})
