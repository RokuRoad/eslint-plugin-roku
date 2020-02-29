import { invalidFactory, runTest, validFactory } from '../helpers'

const RULE_NAME = 'no-print'

const valid = validFactory(RULE_NAME)
const invalid = invalidFactory(RULE_NAME)

export const test = runTest(RULE_NAME, {
  invalid: [
    [
      '\'eslint-disable-next-line no-stop\n? "message1"',
      [{ messageId: 'unexpected', data: { statement: 'print' } }],
    ],
  ].map(invalid),
  valid: [
    '\' eslint-disable-next-line\n? "log"',
    'print "message" \' eslint-disable-line',
    '\' eslint-disable-next-line no-print\n? "log"',
    'print "message" \' eslint-disable-line',
  ].map(valid),
})
