/**
 * @fileoverview Rule to find functions that do not return anything but has return type other then Void
 * @author Igor Alpert
 */

import { Rule } from 'eslint'
import { EOL } from 'os'
import { addDeclaredVariable, addParamsToScope, findAllDeclaredVariables, getFileGlobals, getGlobalsFromComment, getProgramGlobalComments, globals, isInForEach, isInForLoop } from './context-globals'

export default abstract class BaseUninitializedRule {

  public meta(): Rule.RuleMetaData {
    return {
      docs: {
        category: 'Possible Errors',
        description: this.description(),
        recommended: true,
      },
      messages: {
        NOT_DECLARED:
          this.message(),
      },
      schema: [
      ],
    }
  }
  public create(): (ctx: Rule.RuleContext) => any {
    const hasValidParent = this.hasValidParent
    return (context: Rule.RuleContext) => {
      return {
        'Identifier:exit'(node) {
          if (!globals.find(g => g.toLowerCase() === node.name.toLowerCase()) &&
            node.parent
            && hasValidParent(node)
          ) {
            if (!findAllDeclaredVariables(context.getScope()).find(v => v === node.name)
              && !isInForEach(node, node.name)
              && !isInForLoop(node, node.name)
              && !getFileGlobals(context).find(c => c.toLowerCase() === node.name.toLowerCase())) {

              context.report({
                data: {
                  name: node.name
                },
                loc: node.loc,
                messageId: 'NOT_DECLARED',
                node,
                suggest: [{
                  desc: 'Add to globals comment if this is a sub/function from a dependency.',
                  fix: (fixer: Rule.RuleFixer): Rule.Fix => {
                    const existingComments = getProgramGlobalComments(context)
                    if (existingComments.length > 0) {
                      if (getGlobalsFromComment(existingComments[0]).length > 0) {
                        return fixer.insertTextAfter(existingComments[0], ', ' + node.name)
                      } else {
                        return fixer.insertTextAfter(existingComments[0], ' ' + node.name)
                      }
                    } else {
                      return fixer.insertTextBefore(context.getAncestors()[0], `' globals ${node.name}${EOL}`)
                    }
                  }
                }]

              } as any)
            }
          }
        },
        AssignmentExpression(node) {
          if (node.operator.type === 'EQUAL' && node.left.type === 'Identifier') {
            addDeclaredVariable(node.left.name, context)
          }
        },
        Parameter(node) {
          addDeclaredVariable(node.name.name, context)
        },
        Program(node) {
          node.body
            .filter(b => b.type === 'FunctionDeclaration' || b.type === 'SubDeclaration')
            .map(f => f.id.name)
            .forEach(f => {
              addDeclaredVariable(f, context)
            })
        },
        FunctionExpression(node) {
          addParamsToScope(node, context)
        },
        SubExpression(node) {
          addParamsToScope(node, context)
        },
      }
    }
  }
  protected abstract hasValidParent(node): boolean
  protected abstract message(): string
  protected abstract description(): string
}
