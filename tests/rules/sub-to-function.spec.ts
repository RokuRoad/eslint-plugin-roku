import { invalidFactory, runTest, validFactory } from '../helpers'

const RULE_NAME = 'sub-to-function'

const valid = validFactory(RULE_NAME, '', '')
const invalid = invalidFactory(RULE_NAME, '', '')

runTest(RULE_NAME, {
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
})
