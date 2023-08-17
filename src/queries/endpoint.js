export const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://venia.magento.com/graphql'
    : 'http://localhost:3001';
