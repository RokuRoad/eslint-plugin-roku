const path = require('path')

module.exports = {
  testMatch: undefined,
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.tsx?$',
  verbose: true,
  bail: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  globals: {
    'ts-jest': {
      tsConfig: path.resolve(__dirname, './tsconfig.jest.json'),
    },
  },
  preset: 'ts-jest',
}
