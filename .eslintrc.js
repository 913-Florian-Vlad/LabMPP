module.exports = {
    "env": {
        "node": true,
        "es2021": true,
        "jest": true
    },
    "extends": 
    [
        "standard-with-typescript",
        "plugin:@typescript-eslint/recommended",
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    parser:"@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    plugins:['@typescript-eslint','import','prettier'],
    "rules": {
        'prettier/prettier': 'error',
        'import/extensions': 'off',
        'no-console': 'off',
    },
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
             typescript: {
                 alwaysTryTypes: true,

                 project: './tsconfig.json',
            }
        }
    }
}
