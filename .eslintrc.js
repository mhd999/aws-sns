module.exports = {
   
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
      "mocha": true,
      "node": true
    },
    "plugins": [
        "flowtype"
    ],
    "rules": {
      "flowtype/define-flow-type": 2,
      "flowtype/space-after-type-colon": [
        1,
        "always"
      ],
      "flowtype/space-before-type-colon": [
        2,
        "never"
      ],
      "flowtype/use-flow-type": 2,
      "flowtype/valid-syntax": 2,

      "max-len": 0,
      "no-param-reassign": 0,
      // doesn't support flow type imports, airbnb config has eslint-plugin-import
      // enabled anyway, which has a smarter version of this duplicate check
      "no-duplicate-imports": 0,
      "no-nested-ternary": 0,
      "no-underscore-dangle": 0,
      "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.test.js"]}]
    },
    "settings": {
      "flowtype": {
        "onlyFilesWithFlowAnnotation": true
      }
    }
};