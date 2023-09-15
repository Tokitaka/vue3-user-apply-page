module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: ['plugin:vue/essential', 'plugin:vue/recommended'],
    rules: {
        'vue/no-v-for-template-key': 'off', // vue2는 안되지만 vue3는 가능
        'no-console': 'off',
        'no-debugger': 'off',
        // 'no-unused-vars': 1,
        'vue/max-attributes-per-line': 'off',
        'vue/html-self-closing': 'off',
        'vue/no-v-html': 'off',
        'vue/no-v-text': 'off',
        'vue/no-v-text-v-html-on-component': 'off',
        'vue/require-default-prop': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/html-indent': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/attribute-hyphenation': 'off', // vue attribute 하이픈 경고 off
        'no-unused-vars': 'off',
        'vue/no-unused-vars': 'off',
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@babel/eslint-parser',
        sourceType: 'module',
        rules: {},
    },
};
