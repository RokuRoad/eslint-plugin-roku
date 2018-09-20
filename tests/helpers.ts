import { RuleTester } from "eslint";
import { join, resolve } from "path";

// RuleTester.run = (text, method) => test(text.replace(/\n+/g, ' '), method)

const ruleTester = new RuleTester();

const parser = resolve(join(__dirname, "../src"));

export const runTest = (ruleName: string, tests) => {
  const rule = require(`../src/rules/${ruleName}`);

  describe(ruleName, () => {
    it("Should exist", () => {
      expect(rule.meta).toBeTruthy();
      expect(rule.meta.docs).toBeTruthy();
      expect(rule.meta.docs.description).toBeTruthy();
      expect(rule.create).toBeTruthy();
    });

    ruleTester.run(ruleName, rule, tests);
  });
};

export const validFactory = (
  name: string,
  head = `function validFactory()`,
  tail = `end function`
) => source => ({
  code: `${head}\n${source}\n${tail}`,
  filename: `${name}.brs`,
  options: [],
  parser
});

export const invalidFactory = (
  name: string,
  head = `function invalidFactory()`,
  tail = `end function`
) => ([source, errors]) => ({
  code: `${head}\n${source}\n${tail}`,
  errors,
  filename: `${name}.brs`,
  options: [],
  parser
});
