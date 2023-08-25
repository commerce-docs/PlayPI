/** @type {import("prettier").Config} */
const config = {
  arrowParens: 'always',
  printWidth: 100,
  trailingComma: 'es5',
  tabWidth: 2,
  jsxSingleQuote: true,
  useTabs: false,
  semi: true,
  singleQuote: true,
  bracketSameLine: true,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'strict',
  overrides: [
    {
      files: ['*.json'],
      options: {
        printWidth: 200,
      },
    },
  ],
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
