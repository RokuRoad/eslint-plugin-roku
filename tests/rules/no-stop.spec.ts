import { RuleTester } from 'eslint'
import { invalidFactory, validFactory } from '../helpers'

const ruleTester = new RuleTester()
import * as rule from '../../src/rules/no-stop'

const RULE_NAME = 'no-stop'

const valid = validFactory(RULE_NAME)
const invalid = invalidFactory(RULE_NAME)

describe(RULE_NAME, () => {
  it('Should exist', () => {
    expect(rule.meta).toBeTruthy()
    expect(rule.meta.docs).toBeTruthy()
    expect(rule.meta.docs.description).toBeTruthy()
    expect(rule.create).toBeTruthy()
  })

  const tests = {
    invalid: [ [ 'stop', [] ] ].map(invalid),
    valid: [ 'next', 'return 1' ].map(valid)
  }

  ruleTester.run(RULE_NAME, rule, tests)
})
