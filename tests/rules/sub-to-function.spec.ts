import { RuleTester } from 'eslint'
import { invalidFactory, validFactory } from '../helpers'

const ruleTester = new RuleTester()
import * as rule from '../../src/rules/sub-to-function'

const RULE_NAME = 'sub-to-function'

const valid = validFactory(RULE_NAME, '', '')
const invalid = invalidFactory(RULE_NAME, '', '')

export const tests = {
  invalid: [
    [
      `sub a() as Dynamic
      end sub`,

      [ { message: 'Sub a should not have a return type (dynamic). Consider replacing it with Function' } ]
    ]
  ].map(invalid),
  valid: [
    `sub a()
      print a
     end sub
  `
  ].map(valid)
}

describe(RULE_NAME, () => {
  it('Should exist', () => {
    expect(rule.meta).toBeTruthy()
    expect(rule.meta.docs).toBeTruthy()
    expect(rule.meta.docs.description).toBeTruthy()
    expect(rule.create).toBeTruthy()
  })

  ruleTester.run(RULE_NAME, rule, tests)
})
