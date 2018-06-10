import { invalidFactory, runTest, validFactory } from '../helpers'

const RULE_NAME = 'function-no-return'

const valid = validFactory(RULE_NAME, '', '')
const invalid = invalidFactory(RULE_NAME, '', '')

export const test = runTest(RULE_NAME, {
  invalid: [
    [
      `function a() as Dynamic
      end function`,

      [ { message: 'Function a should return (dynamic) but it is EMPTY' } ]
    ],
    [
      `function a() as Dynamic
        a = 5+5
      end function`,

      [ { message: 'Function a should return (dynamic) but it has no RETURN' } ]
    ]
  ].map(invalid),
  valid: [
    `function a() as Dynamic
      return a
     end function
  `,

    `function functionWIthReturn() as Dynamic
      return a
    end function`,

    `function voidFunction() as Void
    end function`
  ].map(valid)
})
