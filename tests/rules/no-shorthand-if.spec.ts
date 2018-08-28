import { invalidFactory, runTest, validFactory } from '../helpers'

const RULE_NAME = 'no-shorthand-if'

const valid = validFactory(RULE_NAME)
const invalid = invalidFactory(RULE_NAME)

export const test = runTest(RULE_NAME, {
  invalid: [
    [
      `if a = c and not (b > 40) print "success"`,
      [{ message: 'Missing "then" in "if" statement.' }]
    ],

    [`if false or func()=0 print "ok"`,
      [{ message: 'Missing "then" in "if" statement.' }]],

    [`if (a=5)
      a = 10
    end if`,
      [{ message: 'Missing "then" in "if" statement.' }]


    ]].map(invalid),
  valid: [
    `if a = c and not (b > 40) then print "success"`,

    `if false or func()=0 then print "ok"`,

    `if (a=5) then
      a = 10
    end if`
  ].map(valid)
})
