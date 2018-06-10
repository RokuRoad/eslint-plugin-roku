import { Rule } from 'eslint'

const meta: Rule.RuleMetaData = {
  docs: {
    category: 'Possible Errors',
    description: 'disallow the use of `print` and `?`',
    recommended: true,
    url: 'https://www.rokuroad.com/docs/rules/no-print'
  },
  fixable: 'code',
  messages: { unexpected: 'Unexpected {{statement}} statement.' },
  schema: []
}

const create = (context: Rule.RuleContext) => {
  return {
    PrintStatement(node) {
      context.report({
        data: { statement: 'print' },
        loc: node.loc,
        messageId: 'unexpected',
        node
      })
    }
  }
}

export { meta, create }
