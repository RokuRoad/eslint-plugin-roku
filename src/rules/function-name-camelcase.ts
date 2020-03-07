/**
 * @fileoverview Rule to find functions that do not return anything but has return type other then Void
 * @author Igor Alpert
 */

import { Rule } from 'eslint'

const CAMLECASE_PATTERN = /^_?[a-z]+[a-zA-Z0-9]*$/

const meta: Rule.RuleMetaData = {
  docs: {
    category: 'Stylistic Issues',
    description: 'Check that function name with is camelcase, ignoring leading `_`',
    recommended: true,
  },
  fixable: 'code',
  messages: {
    invalid: `Function name: "{{name}}" should match expression ${CAMLECASE_PATTERN.source}`,
  },
  schema: [],
}

const create = (context: Rule.RuleContext) => {
  function testName(node) {
    const { id } = node
    const { name } = id

    if (!CAMLECASE_PATTERN.test(name)) {
      context.report({
        data: {
          name,
        },
        messageId: 'invalid',
        node,
      })
    }
  }

  return {
    FunctionDeclaration: testName,
    SubDeclaration: testName,
  }
}

export { meta, create }
