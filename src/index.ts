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
  return {
    ast: ast(code),
    code,
    scopeManager: null,
    services: {},
    visitorKeys
  }
}

const configs = {
  recommended: {
    parser: name,
    plugins: ['roku'],
    rules: ruleConfig()
  }
}

export { configs, rules, parseForESLint, version }
