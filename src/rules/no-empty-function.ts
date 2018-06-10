/**
 * @fileoverview Rule to find functions without any statements inside
 * @author Igor Alpert
 */

import { Rule } from 'eslint'

const meta: Rule.RuleMetaData = {
  docs: {
    category: 'Stylistic Issues',
    description: 'Check that `Function` with defined return type has RETURN statements',
    recommended: false,
    url: 'https://www.rokuroad.com/docs/rules/no-empty-function'
  },
  messages: {},
  schema: []
}

const create = (/* context: Rule.RuleContext */) => {
  return {
    // FunctionDeclaration: () => {},
    // FunctionExpression: () => {},
    // SubDeclaration: () => {},
    // SubExpression: () => {}
  }
}

export { meta, create }
