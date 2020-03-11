import { Rule, Scope } from "eslint"

export const globals = [
  'invalid',
  'm',
  'lcase',
  'ucase',
  'getInterface',
  'createObject',
  'eval',
  'run',
  'getLastRunCompileError',
  'getLastRuntimeError',
  'type',
  'getGlobalAA',
  'box',
  "Sleep",
  "Wait",
  "GetInterface",
  "FindMemberFunction",
  "UpTime",
  "RebootSystem",
  "ListDir",
  "ReadAsciiFile",
  "WriteAsciiFile",
  "CopyFile",
  "MoveFile",
  "MatchFiles",
  "DeleteFile",
  "DeleteDirectory",
  "CreateDirectory",
  "FormatDrive",
  "StrToI",
  "RunGarbageCollector",
  "ParseJson",
  "FormatJson",
  "Tr",
  "UCase",
  "LCase",
  "Asc",
  "Chr",
  "Instr",
  "Left",
  "Len",
  "Mid",
  "Right",
  "Str",
  "StrI",
  "StrI",
  "String",
  "StringI",
  "Val",
  "Val",
  "Substitute",
  "Abs",
  "Atn",
  "Cdbl",
  "Cint",
  "Cos",
  "Csng",
  "Exp",
  "Fix",
  "Int",
  "Log",
  "Rnd",
  "Rnd",
  "Sgn",
  "Sgn",
  "Sin",
  "Sqr",
  "Tan",
  "tab"
]

export function isInForEach(node, key): boolean {
  while (node.parent) {
    if (node.parent.type === 'ForEachStatement' && node.parent.counter.name === key) {
      return true
    } else {
      return isInForEach(node.parent, key)
    }
  }
  return false
}

export function isInForLoop(node, key): boolean {
  while (node.parent) {
    if (node.parent.type === 'ForStatement') {
      if (node.parent.counter && node.parent.counter.name === key) {
        return true
      }
      return false
    } else {
      return isInForLoop(node.parent, key)
    }
  }
  return false
}

export function findAllDeclaredVariables(scope: Scope.Scope): string[] {
  let refs = []
  refs = refs.concat((scope as any).declaredVariables ? (scope as any).declaredVariables : [])
  if (scope.upper) {
    refs = refs.concat(findAllDeclaredVariables(scope.upper))
  }
  return refs
}

export function addDeclaredVariable(name: string, context: Rule.RuleContext) {
  const scope = context.getScope()
  if (!(scope as any).declaredVariables) {
    (scope as any).declaredVariables = []
  }
  (scope as any).declaredVariables.push(name)
}

export function addParamsToScope(node, context) {
  const { params } = node
  if (params && params.args) {
    const { args } = params
    args.forEach(a => {
      addDeclaredVariable(a.name.name, context)
    })
  }
}

export function getFileGlobals(context: Rule.RuleContext): string[] {
  const globalVars = {}
  getProgramGlobalComments(context).forEach(c => {
    getGlobalsFromComment(c).forEach(g => {
      globalVars[g] = true
    })
  })
  return Object.keys(globalVars)
}

export function getGlobalsFromComment(comment: { value: string }): string[] {
  const result = /^globals ((?:\S*|,| )*)$/gi.exec(comment.value)
  if (result && result.length === 2) {
    return result[1].split(',').map(r => r.trim())
  }
  return []
}

export function getProgramGlobalComments(context: Rule.RuleContext): any[] {
  const program = context.getAncestors()[0]
  const comments = (program as any).body.filter(b => b.type === 'Comment')
  comments.filter(c => {
    const result = /^globals ((?:\S*|,| )*)$/gi.exec(c.value)
    return (result && result.length === 2)
  })
  return comments
}