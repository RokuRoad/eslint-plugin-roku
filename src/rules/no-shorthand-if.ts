/**
 * @fileoverview Rule to disallow `if` statements without `then` keyword
 * @author Igor Alpert
 */


import { Rule } from 'eslint'

const meta: Rule.RuleMetaData = {
  docs: {
    category: 'Stylistic Issues',
    description: 'disallow the use `if` without `then`',
    recommended: true,
    url: 'https://www.rokuroad.com/docs/rules/no-shorthand-if'
  },
  fixable: 'code',
  messages: { missing: 'Missing "{{part}}" in "{{statement}}" statement.' },
  schema: []
}

const create = (context: Rule.RuleContext) => {
  return {
    IfStatement(node) {

      // We grab 2 tokens before If body to check if one of them is THEN
      const tokens = context.getTokensBefore(node.consequent, 2)

      // usually THEN will be either last token or the one before NEWLINE hence we want to check both
      const maybeThen = tokens.find((t) => t.type === 'THEN')

      if (!maybeThen) {
        context.report({
          data: { statement: 'if', part: 'then' },
          messageId: 'missing',
          node
        })
      }
    }
  }
}

export { meta, create }
