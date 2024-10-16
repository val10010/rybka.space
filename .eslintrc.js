module.exports = {
    root: true,
    parser: '@babel/eslint-parser',
    plugins: ['@babel'],
    extends: [
        'eslint:recommended'
    ],
    rules: {
        'indent': ['error', 2],
        'quotes': ['error', 'single'],
        'no-unused-vars': 'warn',
        'keyword-spacing': ['error', { 'before': true, 'after': true }],
        'space-before-function-paren': ['error', 'always'],
        'eqeqeq': ['error', 'always'],
        'comma-spacing': ['error', { 'before': false, 'after': true }],
        'semi': ['error', 'always'],
        'no-console': 'warn',
        'curly': ['error', 'all'],
        'brace-style': ['error', '1tbs'],
        'no-multiple-empty-lines': ['error', { 'max': 1 }],
        'no-trailing-spaces': 'error',
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            presets: ['@babel/preset-react']
        }
    }
};
