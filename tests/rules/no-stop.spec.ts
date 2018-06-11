import { invalidFactory, runTest, validFactory } from '../helpers'

const RULE_NAME = 'no-stop'

const valid = validFactory(RULE_NAME)
const invalid = invalidFactory(RULE_NAME)

runTest(RULE_NAME, {
  invalid: [ [ 'stop', [] ] ].map(invalid),
  valid: [ 'next', 'return 1' ].map(valid)
})