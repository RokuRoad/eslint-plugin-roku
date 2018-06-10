import { invalidFactory, runTest, validFactory } from '../helpers'

const RULE_NAME = 'no-empty-function'

const valid = validFactory(RULE_NAME, '', '')
const invalid = invalidFactory(RULE_NAME, '', '')

export const test = runTest(RULE_NAME, {
  invalid: [].map(invalid),
  valid: [].map(valid)
})
