import { ast, visitorKeys } from '@roku-road/bright'

// tslint:disable-next-line:no-var-requires
const { name, version } = require('../package.json')

const warnings = ['no-print', 'function-no-return', 'sub-to-function', 'no-shorthand-if']
const errors = ['no-stop']

const allRules = [...warnings, ...errors].sort()

const makeRules = () => {
  const mapped = {}

  allRules.map(rule => (mapped[rule] = require(`./rules/${rule}`)))

  return mapped
}

const addRule = (level = 'warn', mapped = {}) => rule => (mapped[`roku/${rule}`] = level)

const ruleConfig = () => {
  const mapped = {}

  warnings.map(addRule('warn', mapped))
  errors.map(addRule('error', mapped))

  return mapped
}

const rules = makeRules()

const parseForESLint = (code: string) => {
  const result = ast(code)

  return {
    ast: {
      ...result,
      comments: result.tokens
        .filter(t => t.type.startsWith('COMMENT'))
        .map(comment => {
          return {
            ...comment,
            type: 'Line',
            value: comment.value.replace(/'|REM/i, ''),
          }
        }),
      tokens: result.tokens.filter(t => !t.type.startsWith('COMMENT') && t.type !== 'NEWLINE'),
    },
    code,
    scopeManager: null,
    services: {},
    visitorKeys,
  }
}

const configs = {
  recommended: {
    parser: name,
    plugins: ['roku'],
    rules: ruleConfig(),
  },
}

export { configs, rules, parseForESLint, version }
