export const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://pwa-n3sumvi-7e6vfh6pz64wy.eu-4.magentosite.cloud/graphql' // <-- for production use in codesandbox.
    : 'http://localhost:3001'; // <-- for local development server.js
