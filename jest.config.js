const path = require("path");

module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  verbose: true,
  bail: true,
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
  globals: {
    "ts-jest": {
      tsConfigFile: path.resolve(path.join(__dirname, "tsconfig.jest.json")),
      skipBabel: true
    }
  }
};
