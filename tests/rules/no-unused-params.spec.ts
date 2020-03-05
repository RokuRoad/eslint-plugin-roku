import { invalidFactory, runTest, validFactory } from '../helpers'

const RULE_NAME = 'no-unused-params'

const valid = validFactory(RULE_NAME, '', '')
const invalid = invalidFactory(RULE_NAME, '', '')

export const test = runTest(RULE_NAME, {
  invalid: [
    [
      `function a(arg1, arg2) as Dynamic
      end function`,

      [{ message: 'Parameter arg1 in function a is not used' },
      { message: 'Parameter arg2 in function a is not used' }]
    ],
    [
      `function a(value as string) as Dynamic
        a = { value: "value" }
      end function`,

      [{ message: 'Parameter value in function a is not used' }]
    ]
  ].map(invalid),
  valid: [
    `function a(arg1, arg2) as Dynamic
      print arg2
      arg1 = "asdf"
      return a
     end function
  `,

    `function functionWIthReturn(a = "a") as Dynamic
      return a
    end function`,

    `function voidFunction(a) as Void
      obj = {
        f: function() 
          return a
        end function
      }
    end function`
  ].map(valid)
})
