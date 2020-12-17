import { invalidFactory, runTest, validFactory } from "../helpers";

const RULE_NAME = "no-uninitialized-variables";

const valid = validFactory(RULE_NAME, "", "");
const invalid = invalidFactory(RULE_NAME, "", "");

export const test = runTest(RULE_NAME, {
  invalid: [
    [
      `' globals sam
      function a(arg1, arg2) as Dynamic
        this[a]
        for each key in arg2
          print key
        end for
        doAThing()
        o = {
          f: function(asdf)
            m.asdf = asdfasdf
          end function
        }
        return b
      end function`,
      [
        {
          message: "Variable this is not declared in scope.",
        },
        {
          message: "Variable asdfasdf is not declared in scope.",
        },
        {
          message: "Variable b is not declared in scope.",
        },
      ],
    ],
  ].map(invalid),
  valid: [
    `'globals glob, two, three
    function a(arg1, arg2) as Dynamic
      print arg2
      print arg1
      glob()
      a = "asdf"
      print a
      ' this is a comment
      o = {
        f: function(asdf)
          m.asdf = asdf
          return a
          
        end function
      }

      try 
        a = 3
      catch exp
      end try

      for i = 0 to 100
        print i
      end for
      #if isTrue
      #endif
      print glob
      return m.asdf
     end function
  `,
  ].map(valid),
});
