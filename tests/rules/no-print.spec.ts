import { RuleTester } from 'eslint'
import { invalidFactory, validFactory } from '../helpers'

const ruleTester = new RuleTester()
import * as rule from '../../src/rules/no-print'

const RULE_NAME = 'no-print'

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
    invalid: [
      [ '? "message1"', [ { messageId: 'unexpected', data: { statement: 'print' } } ] ],
      [ 'print "message1"', [ { messageId: 'unexpected', data: { statement: 'print' } } ] ],
      [ '? 1, 2, 3', [ { messageId: 'unexpected', data: { statement: 'print' } } ] ],
      [ '? []', [ { messageId: 'unexpected', data: { statement: 'print' } } ] ]
    ].map(invalid),
    valid: [ 'stop', 'next', 'return 1' ].map(valid)
  }

  ruleTester.run(RULE_NAME, rule, tests)
})
