module.exports =  {
    plugins: [
      "@typescript-eslint/eslint-plugin",
      "eslint-plugin-tsdoc",
      "eslint-plugin-svelte3"
    ],
    extends:  [
      'plugin:@typescript-eslint/recommended'
    ],
    parser:  '@typescript-eslint/parser',
    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname,
      ecmaVersion: 2018,
      sourceType: "module"
    },
    rules: {
      "tsdoc/syntax": "warn"
    },
    overrides: [ // this stays the same
      {
        files: ['*.svelte'],
        processor: 'svelte3/svelte3'
      }
    ],
    settings: {
      'svelte3/typescript': true
    }
  };