/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

export const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://venia.magento.com/graphql' // <-- for production use in codesandbox.
    : 'http://localhost:3001'; // <-- for local development server.js
