import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  eslint.configs.recommended,
  eslintConfigPrettier,
  // prettier integration
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'none'
        }
      ]
    }
  },

  // custom
  {
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'error'
    }
  }
]
