import { Rule } from 'eslint'

const meta: Rule.RuleMetaData = {
  docs: {
    category: 'Possible Errors',
    description: 'disallow the use of `stop`',
    recommended: true,
    url: 'https://www.rokuroad.com/docs/rules/no-stop'
  },
  fixable: 'code',
  messages: { unexpected: 'Unexpected {{statement}} statement.' },
  schema: []
}

const create = (context: Rule.RuleContext) => {
  return {
    StopStatement(node) {
      context.report({
        data: { statement: 'stop' },
        messageId: 'unexpected',
        node
      })
    }
  }
}

export { meta, create }
