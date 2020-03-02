[![npm version](https://img.shields.io/npm/v/eslint-plugin-roku.svg)](https://www.npmjs.com/package/eslint-plugin-roku)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-plugin-roku.svg)](http://www.npmtrends.com/eslint-plugin-roku)
[![Build Status](https://travis-ci.com/RokuRoad/eslint-plugin-roku.svg?branch=master)](https://travis-ci.com/RokuRoad/eslint-plugin-roku)
[![CircleCI](https://img.shields.io/circleci/project/github/RokuRoad/eslint-plugin-roku.svg?style=for-the-badge)](https://circleci.com/gh/RokuRoad/eslint-plugin-roku)
[![Coverage Status](https://codecov.io/gh/RokuRoad/eslint-plugin-roku/branch/master/graph/badge.svg)](https://codecov.io/gh/RokuRoad/eslint-plugin-roku)
[![Dependency Status](https://david-dm.org/RokuRoad/eslint-plugin-roku.svg)](https://david-dm.org/RokuRoad/eslint-plugin-roku) [![Greenkeeper badge](https://badges.greenkeeper.io/RokuRoad/eslint-plugin-roku.svg)](https://greenkeeper.io/)
[![CodeFactor](https://www.codefactor.io/repository/github/rokuroad/eslint-plugin-roku/badge)](https://www.codefactor.io/repository/github/rokuroad/eslint-plugin-roku)

The ESLint custom plugin with rules and parser for `.brs` files.


### ESLint plugin for BrightScript

We going to skip the part why linting is important so you can read more about it at [ESLint](https://eslint.org/docs/about) site. Primary motivation for this development is absence of reliable tools for Roku development (at least at the time this work started) and performance criteria.

![Demo](https://github.com/RokuRoad/eslint-plugin-roku/blob/master/docs/demo.gif)

*Latest tests gave measurement of about 14 seconds for a 1000 files of BrightScript*

This plugin provides parsing and linting tool for your Roku project. While ESLint rules for Javascript are not 1 to 1 replaceable you are able to quickly develop or translate any other rules to work with brightscript. It's written in typescript but could use any JS- technology you like


### VSCode Integration

``` json
    "eslint.validate": [   {
        "language": "brightscript",
        "autoFix": false
    } ],
```

##### Linter Warnings
![Warnings](https://github.com/RokuRoad/eslint-plugin-roku/blob/master/docs/eslint3.png)

#### Syntax Errors

![Syntax](https://github.com/RokuRoad/eslint-plugin-roku/blob/master/docs/vscode_eslint2.png)

### Disable rules with comments
```
? "this is a valid log" ' eslint-disable-line
```
or 
```
' eslint-disable-next-line [rule]
? "this is a valid log"
```
note: whole file `eslint-disable` does not work as there is no block quote in brightscript

### Installation

You'll first need to install [ESLint](http://eslint.org):

**With Yarn**

```bash
yarn add --dev eslint
```

**With npm**

```bash
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-roku`:

**With Yarn**
```bash
yarn add --dev eslint-plugin-roku
```

**With npm**
```bash
$ npm install eslint-plugin-roku --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-roku` globally.


## Configuration

``` json
{
  "extends": "plugin:roku/recommended",
  "rules": {
    "roku/no-print": "warn",
    "roku/no-stop": "warn",
    "roku/sub-to-function": "off",
    "roku/function-no-return": "off"
  }
}
```


## Plugin-Provided Rules

*Just as any other project this one requires more feedback and linting rules ideas*


### Parsing and AST

This documentation will be available at https://github.com/RokuRoad/bright


### Writing rules

https://eslint.org/docs/developer-guide/working-with-rules


### Testing rules

Typical test for a rule will look like

Test runner and valid / invalid factories to wrap your test code into testable solution
``` typescript
import { invalidFactory, runTest, validFactory } from '../helpers'
```

Define name of your rule, it will be used to require it and run tests
``` typescript
const RULE_NAME = 'sub-to-function'
```

Provide prefix and suffix, so you can test function body or root element like library import of the function itself
``` typescript
const valid = validFactory(RULE_NAME, '', '')
const invalid = invalidFactory(RULE_NAME, '', '')
```

Define cases to match against. Invalid cases will provide error messages
``` typescript
runTest(RULE_NAME, {
  invalid: [
    [
      `sub a() as Dynamic
      end sub`,

      [ { message: 'Sub a should not have a return type (dynamic). Consider replacing it with Function' } ]
    ]
  ].map(invalid),
  valid: [
    `sub a()
      print a
     end sub
  `
  ].map(valid)
})
```



### SceneGraph
Currently in development, check back soon. Rule will be aware of components tree structure so for instance if function is going to be overwritten or just mistakenly left empty.
