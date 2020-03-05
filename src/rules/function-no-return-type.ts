/**
 * @fileoverview Rule to find functions that do not return anything but has return type other then Void
 * @author Igor Alpert
 */

import { Rule } from 'eslint'


const meta: Rule.RuleMetaData = {
  docs: {
    category: 'Stylistic Issues',
    description: 'Check that `Function` with defined return type has RETURN statements',
    recommended: true,
    url: 'https://www.rokuroad.com/docs/rules/sub-to-function'
  },
  fixable: 'code',
  messages: {
    NO_RETURN_TYPE: 'Function {{name}} needs a return type specified'
  },
  schema: []
}

const create = (context: Rule.RuleContext) => {
  return {
    FunctionDeclaration(node) {
      const { ReturnType } = node
      if (!ReturnType) {
        context.report({
          data: {
            name: node.id.name,
          },
          messageId: 'NO_RETURN_TYPE',
          node
        })
      }
    }
  }
}

export { meta, create }
