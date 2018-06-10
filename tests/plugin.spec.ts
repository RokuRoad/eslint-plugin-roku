import { CLIEngine } from 'eslint'
import { resolve } from 'path'

import { configs, parseForESLint, version } from '../src/index'

const conf = configs.recommended

const cli = new CLIEngine({
  extensions: [ '.brs' ],
  ...conf,
  useEslintrc: false
})

describe.only('Plugin', () => {
  it(`Should be able to use plugin v${version}`, () => {
    const output = cli.executeOnFiles([ resolve(__dirname, 'assets') + '/*.brs' ])

    expect(output).toBeTruthy()
  })

  it('Should be able to build a tree', () => {
    const parsed = parseForESLint('Library "lib1"')

    expect(parsed.ast).toMatchSnapshot('test1-ast')
    expect(parsed.visitorKeys).toMatchSnapshot('test1-keys')
  })

  it.skip('Should be able to run multiple source files', () => {
    const output = cli.executeOnFiles([ resolve(__dirname, 'assets') + '/**/*.brs' ])

    // console.log(output);

    expect(output).toBeTruthy()
  })
})
