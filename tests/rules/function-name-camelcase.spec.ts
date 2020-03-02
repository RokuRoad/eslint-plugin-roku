import { invalidFactory, runTest, validFactory } from '../helpers'

const RULE_NAME = 'function-name-camelcase'

const valid = validFactory(RULE_NAME, '', '')
const invalid = invalidFactory(RULE_NAME, '', '')

export const test = runTest(RULE_NAME, {
  invalid: [
    [
      `function AFunction() as Dynamic
      end function`,
      [{ messageId: 'invalid' }],
    ],
    [
      `function _AFunction() as Dynamic
      end function`,
      [{ messageId: 'invalid' }],
    ],
    [
      `function snake_case() as Dynamic
      end function`,
      [{ messageId: 'invalid' }],
    ],
    [
      `sub snake_case() as Dynamic
      end sub`,
      [{ messageId: 'invalid' }],
    ],
  ].map(invalid),
  valid: [
    `function asdfj098() as Dynamic
      return a
     end function
    `,
    `function _a() as Dynamic
        return a
      end function
    `,
    `function _aCAPITAL() as Dynamic
      return a
    end function
    `,
    `function _aPrivateFunction() as Dynamic
      return a
    end function
    `,
    `function aNormalFunction() as Dynamic
      return a
    end function
    `,
    `sub aNormalFunction() as Dynamic
      return a
    end sub
    `,
  ].map(valid),
})
