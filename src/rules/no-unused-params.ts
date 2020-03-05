/**
 * @fileoverview Rule to find functions that do not return anything but has return type other then Void
 * @author Igor Alpert
 */

import { Rule, Scope } from 'eslint'

const meta: Rule.RuleMetaData = {
  docs: {
    category: 'Stylistic Issues',
    description: 'Check that `Function` with defined return type has RETURN statements',
    recommended: true,
    url: 'https://www.rokuroad.com/docs/rules/sub-to-function'
  },
  fixable: 'code',
  messages: {
    UNUSED: 'Parameter {{name}} in function {{functionName}} is not used'
  },
  schema: []
}

function findAllRefs(scope: Scope.Scope): Scope.Reference[] {
  let refs = []
  refs = refs.concat(scope.references)
  scope.childScopes.forEach(s => {
    refs = findAllRefs(s)
  })
  return refs
}

const create = (context: Rule.RuleContext) => {
  return {
    Parameter(node) {
      const scope = context.getScope()
      const ref = findAllRefs(scope).find(r => r.identifier.name === node.name.name)
      if (!ref) {
        context.report({
          data: {
            functionName: (context.getScope().block as any).id.name,
            name: node.name.name,
          },
          messageId: 'UNUSED',
          node
        })
      }
    }
  }
}

export { meta, create }
