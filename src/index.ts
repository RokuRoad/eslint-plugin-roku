import { ast, visitorKeys } from '@roku-road/bright'

export const version = require('../package.json').version

const warnings = [
  /*  'no-print' */
]
const errors = [ 'no-stop', 'function-no-return', 'sub-to-function' ]

const allRules = [ ...warnings, ...errors ].sort()

const makeRules = () => {
  const mapped = {}

  allRules.map((name) => (mapped[name] = require(`./rules/${name}`)))

  return mapped
}

const addRule = (level = 'warn', mapped = {}) => (name) => (mapped[`@roku-road/rules/${name}`] = level)

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
    parser: '@roku-road/eslint-plugin-rules',
    plugins: [ '@roku-road/rules' ],
    rules: ruleConfig()
  }
}

export { configs, rules, parseForESLint }
