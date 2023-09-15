/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying it. */

export const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://venia.magento.com/graphql' // <-- for production use in codesandbox.
    : 'http://localhost:3001'; // <-- for local development server.js
