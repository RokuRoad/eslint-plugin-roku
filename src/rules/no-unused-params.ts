/**
 * @fileoverview Rule to find functions that do not return anything but has return type other then Void
 * @author Igor Alpert
 */

import { Rule, Scope } from 'eslint'

const meta: Rule.RuleMetaData = {
  docs: {
    category: 'Possible Errors',
    description: 'Check that all function parameters are referenced',
    recommended: true,
  },
  fixable: 'code',
  messages: {
    UNUSED:
      'Parameter {{name}} in function {{functionName}} is not used. Consider removing it if it is not needed.',
  },
  schema: [],
}

function findAllRefs(scope: Scope.Scope): Scope.Reference[] {
  let refs = []
  refs = refs.concat(scope.references)
  scope.childScopes.forEach(s => {
    refs = refs.concat(findAllRefs(s))
  })
  return refs
}

const create = (context: Rule.RuleContext) => {
  return {
    Identifier(node) {
      if (node.parent && !['Property', 'Parameter', 'DotMemberExpression'].find(n => n === node.parent.type)) {
        if (!context.getScope().references
          .find(s => s.identifier.name === node.name && s.identifier.range[0] === node.range[0] && s.identifier.range[1] === node.range[1])) {
          context.getScope().references.push({
            from: context.getScope(),
            identifier: node,
          } as any)
        }
      }
    },
    'FunctionDeclaration:exit'(fn) {
      if (fn.params && fn.params.args.length > 0) {
        fn.params.args.forEach(node => {
          const scope = context.getScope()
          const ref = findAllRefs(scope).find(r => r.identifier.name === node.name.name)
          const block = (context.getScope().block as { id?: { name: string } })
          const functionName = block.id ? block.id.name : 'anonymous'
          if (!ref) {
            context.report({
              data: {
                functionName,
                name: node.name.name,
              },
              messageId: 'UNUSED',
              node,
            })
          }
        })
      }
    },
  }
}

export { meta, create }
