import { invalidFactory, runTest, validFactory } from '../helpers'

const RULE_NAME = 'no-print'

const valid = validFactory(RULE_NAME)
const invalid = invalidFactory(RULE_NAME)

export const test = runTest(RULE_NAME, {
  invalid: [
    [ '? "message1"', [ { messageId: 'unexpected', data: { statement: 'print' } } ] ],
    [ 'print "message1"', [ { messageId: 'unexpected', data: { statement: 'print' } } ] ],
    [ '? 1, 2, 3', [ { messageId: 'unexpected', data: { statement: 'print' } } ] ],
    [ '? []', [ { messageId: 'unexpected', data: { statement: 'print' } } ] ]
  ].map(invalid),
  valid: [ 'stop', 'next', 'return 1' ].map(valid)
})
