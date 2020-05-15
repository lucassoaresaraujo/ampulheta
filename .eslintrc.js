module.exports = {  
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    // 'standard',    
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',    
  ],
  rules: {
    "no-useless-constructor": "off",
    "camelcase": "off",
    "@typescript-eslint/camelcase": ["error", { "properties": "never" }]
  }
}
