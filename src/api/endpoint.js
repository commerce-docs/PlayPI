export const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://venia.magento.com/graphql' // <-- for production use in codesandbox.
    : 'http://localhost:3001'; // <-- for local development using server.js
