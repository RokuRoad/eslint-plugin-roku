import { CLIEngine } from 'eslint'
import { join, resolve } from 'path'

import * as PLUGIN from '../src/index'

const parser = resolve(join(__dirname, '../src'))

const settings = {
  extensions: [ '.brs' ],
  parser,
  plugins: PLUGIN.configs.recommended.plugins,
  rules: PLUGIN.configs.recommended.rules,
  // rules: ,
  useEslintrc: false
}

const cli = new CLIEngine(settings)
const formatter = cli.getFormatter('stylish')

describe('Plugin', () => {
  it(`Should be able to use plugin v${PLUGIN.version}`, () => {
    const output = cli.executeOnFiles([ resolve(__dirname, 'assets') + '/*.brs' ])

    // console.log(formatter(output.results))

    expect(output).toBeTruthy()
  })

  it('Should be able to build a tree', () => {
    const parsed = PLUGIN.parseForESLint('Library "lib1"')

    expect(parsed.ast).toBeTruthy()
    expect(parsed.visitorKeys).toBeTruthy()
  })

  it('Should be able to run multiple source files', () => {
    const output = cli.executeOnFiles([ resolve(__dirname, 'assets') + '/**/*.brs' ])

    //  console.log(output.results[0])
    // console.log(formatter(output.results))

    expect(output).toBeTruthy()
  })
})
