import { invalidFactory, runTest, validFactory } from '../helpers'

const RULE_NAME = 'no-unused-params'

const valid = validFactory(RULE_NAME, '', '')
const invalid = invalidFactory(RULE_NAME, '', '')

export const test = runTest(RULE_NAME, {
  invalid: [
    [
      `function a(arg1, arg2) as Dynamic
      end function`,

      [
        {
          message:
            'Parameter arg1 in function a is not used. Consider removing it if it is not needed.',
        },
        {
          message:
            'Parameter arg2 in function a is not used. Consider removing it if it is not needed.',
        },
      ],
    ],
    [
      `function a(value as string) as Dynamic
        a = { value: "value" }
      end function`,

      [
        {
          message:
            'Parameter value in function a is not used. Consider removing it if it is not needed.',
        },
      ],
    ],
    [
      `function a(value as string) as Dynamic
        a.value()
      end function`,

      [
        {
          message:
            'Parameter value in function a is not used. Consider removing it if it is not needed.',
        },
      ],
    ],
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

    `function voidFunction(a, b, n) as Void
      if b = 1 and true then

      end if
      obj = {
        f: function(section, fuck, d) as string
          if a = 123 and d = m then
           return m.get(section, fuck).cafd(n)
          end if
        end function
      }
    end function`,
    `
    function onHideScores(v, x)
        a().b().c(v)
        a()[x]
    end function`
  ].map(valid),
})
