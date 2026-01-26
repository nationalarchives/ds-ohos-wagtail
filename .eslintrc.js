module.exports = {
    env: {
        browser: true,
        es2021: true,
        jquery: true,
        jest: true,
    },
    extends: ["eslint:recommended"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,jsx,mjs,ts,tsx,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {},
    ignorePatterns: ["**/*.js"],
};
