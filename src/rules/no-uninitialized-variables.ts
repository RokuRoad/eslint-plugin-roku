/**
 * @fileoverview Rule to find functions that do not return anything but has return type other then Void
 * @author Igor Alpert
 */

import BaseUninitializedRule from '../shared/base-uninitialized-rule'

class NoUninitializedFunctionsRule extends BaseUninitializedRule {
  protected hasValidParent(node): boolean {
    return ![
      'Property',
      'Parameter',
      'DotMemberExpression',
      'ForEachStatement',
      'CallExpression',
      'ConditionalIfStatement'
    ].find(n => n === node.parent.type)
  }
  protected message(): string {
    return 'Variable {{name}} is not declared in scope.'
  }
  protected description(): string {
    return 'Check that all variables are declared'
  }
}
const rule = new NoUninitializedFunctionsRule()
export const meta = rule.meta()
export const create = rule.create()
