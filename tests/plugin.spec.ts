import { CLIEngine } from 'eslint'
import { resolve } from 'path'

import { parseForESLint, rules, version } from '../src/index'

const cli = new CLIEngine({
  cwd: resolve(__dirname, 'assets'),
  extensions: [ '.brs' ],
  parser: '../src',
  rules,
  useEslintrc: false
})

describe('Plugin', () => {
  it(`Should be able to use plugin v${version}`, () => {
    const output = cli.executeOnFiles([ resolve(__dirname, 'assets') + '/*.brs' ])

    expect(output).toBeTruthy()
  })

  it('Should be able to build a tree', () => {
    const parsed = parseForESLint('Library "lib1"')

    expect(parsed.ast).toMatchSnapshot('test1-ast')
    expect(parsed.visitorKeys).toMatchSnapshot('test1-keys')
  })

  it('Should be able to run multiple source files', () => {
    const output = cli.executeOnFiles([ '**/*.brs' ])

    // console.log(output.results)

    expect(output).toBeTruthy()
  })
})
