/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const proxyServer = express();
proxyServer.use(cors());

proxyServer.use(
  '/',
  createProxyMiddleware({
    target: 'https://venia.magento.com/graphql',
    changeOrigin: true,
  })
);

proxyServer.listen(3001, () => {
  console.log('Server listening on port 3001');
});
