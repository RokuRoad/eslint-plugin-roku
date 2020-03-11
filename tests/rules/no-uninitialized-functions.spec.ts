import { invalidFactory, runTest, validFactory } from '../helpers'

const RULE_NAME = 'no-uninitialized-functions'

const valid = validFactory(RULE_NAME, '', '')
const invalid = invalidFactory(RULE_NAME, '', '')

export const test = runTest(RULE_NAME, {
  invalid: [
    [
      `' globals sam
      function a(arg1, arg2) as Dynamic
        doAThing()
        a(arg1, arg2)
      end function`,
      [{
        message: 'Function/Sub doAThing is not declared in scope.'
      }],
    ],
  ].map(invalid),
  valid: [
    `'globals globalFunction
    function valid(arg1, arg2) as Dynamic
      globalFunction(arg1, arg2)
      doAThing()
     end function

     function doAThing()
     end function
  `,
  ].map(valid),
})
